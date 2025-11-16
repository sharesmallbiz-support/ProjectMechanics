import React, { useState } from 'react';
import ControlPanel from './components/ControlPanel';
import OutputViewer from './components/OutputViewer';
import CritiqueModal from './components/CritiqueModal';
import { STEPS, getStepByIndex, isWorkflowComplete } from './utils/steps';
import { generateStep } from './services/api';
import { FileText } from 'lucide-react';

const DEFAULT_PROMPT = `Create a comprehensive market analysis report for expanding our cloud services into the European market, targeting enterprise customers. Include competitive analysis, market sizing, financial projections, and strategic recommendations for the executive team.`;

function App() {
  // Core state management
  const [initialPrompt, setInitialPrompt] = useState(DEFAULT_PROMPT);
  const [results, setResults] = useState({}); // Original AI outputs
  const [editedResults, setEditedResults] = useState({}); // User-edited versions
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Edit mode state
  const [editingStep, setEditingStep] = useState(null); // Which step is being edited
  const [savedSteps, setSavedSteps] = useState(new Set()); // Which steps have been saved

  // Critique special handling
  const [showCritiqueModal, setShowCritiqueModal] = useState(false);
  const [critiqueAccepted, setCritiqueAccepted] = useState(null); // true/false/null

  // Version history for evolution tracking
  const [versionHistory, setVersionHistory] = useState([]); // Track all changes

  const currentStep = getStepByIndex(currentStepIndex);
  const workflowComplete = isWorkflowComplete(currentStepIndex);

  /**
   * Get the active version of a step's output (edited if exists, otherwise original)
   */
  const getActiveOutput = (outputKey) => {
    return editedResults[outputKey] || results[outputKey];
  };

  /**
   * Check if current step has unsaved edits
   */
  const hasUnsavedEdits = () => {
    if (!currentStep || currentStepIndex === 0) return false;

    const previousStep = getStepByIndex(currentStepIndex - 1);
    if (!previousStep) return false;

    // Check if the previous step has been edited but not saved
    const outputKey = previousStep.outputKey;
    const hasEdits = editedResults[outputKey] !== undefined;
    const isSaved = savedSteps.has(outputKey);

    return hasEdits && !isSaved;
  };

  /**
   * Check if we can proceed to next step
   */
  const canProceedToNextStep = () => {
    if (currentStepIndex === 0) {
      return initialPrompt.trim().length > 0;
    }

    const previousStep = getStepByIndex(currentStepIndex - 1);
    if (!previousStep) return false;

    // Previous step must be saved (either has no edits, or edits are saved)
    const outputKey = previousStep.outputKey;
    const hasOutput = results[outputKey] !== undefined;
    const hasEdits = editedResults[outputKey] !== undefined;
    const isSaved = savedSteps.has(outputKey);

    return hasOutput && (!hasEdits || isSaved);
  };

  /**
   * Handle editing a step's output
   */
  const handleEditStep = (outputKey, newContent) => {
    setEditedResults(prev => ({
      ...prev,
      [outputKey]: {
        ...getActiveOutput(outputKey),
        output: newContent
      }
    }));

    // Remove from saved set since it's been modified
    setSavedSteps(prev => {
      const newSet = new Set(prev);
      newSet.delete(outputKey);
      return newSet;
    });
  };

  /**
   * Handle saving edits for a step
   */
  const handleSaveEdit = (outputKey) => {
    setSavedSteps(prev => new Set(prev).add(outputKey));
    setEditingStep(null);

    // Add to version history
    const step = STEPS.find(s => s.outputKey === outputKey);
    if (step) {
      setVersionHistory(prev => [...prev, {
        timestamp: new Date().toISOString(),
        stepId: step.id,
        stepTitle: step.title,
        action: 'edited',
        content: editedResults[outputKey]?.output || ''
      }]);
    }
  };

  /**
   * Handle canceling edit
   */
  const handleCancelEdit = (outputKey) => {
    // Revert to last saved version (either edited or original)
    if (!savedSteps.has(outputKey)) {
      // Remove unsaved edits
      setEditedResults(prev => {
        const newEdited = { ...prev };
        delete newEdited[outputKey];
        return newEdited;
      });
    }
    setEditingStep(null);
  };

  /**
   * Generate the current step
   */
  const handleGenerateStep = async () => {
    if (!currentStep || workflowComplete) return;

    // Special handling for CRITIQUE step
    if (currentStep.id === 'CRITIQUE') {
      await handleCritiqueStep();
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Prepare inputs for this step using edited versions where available
      const inputs = {
        initialPrompt,
        ...currentStep.inputKeys.reduce((acc, key) => {
          if (key === 'initialPrompt') {
            acc[key] = initialPrompt;
          } else {
            const activeOutput = getActiveOutput(key);
            if (activeOutput) {
              acc[key] = activeOutput.output;
            }
          }
          return acc;
        }, {})
      };

      console.log(`Generating ${currentStep.id} with inputs:`, inputs);

      // Call API
      const response = await generateStep(currentStep.id, inputs);

      if (response.success) {
        // Store original AI output
        setResults(prev => ({
          ...prev,
          [currentStep.outputKey]: response.data
        }));

        // Mark as automatically saved (since it's fresh from AI)
        setSavedSteps(prev => new Set(prev).add(currentStep.outputKey));

        // Add to version history
        setVersionHistory(prev => [...prev, {
          timestamp: new Date().toISOString(),
          stepId: currentStep.id,
          stepTitle: currentStep.title,
          action: 'generated',
          content: response.data.output
        }]);

        // Move to next step
        setCurrentStepIndex(prev => prev + 1);
      } else {
        throw new Error(response.error || 'Failed to generate step');
      }
    } catch (err) {
      console.error('Error generating step:', err);
      setError(err.message || 'An error occurred while generating the step. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Special handling for CRITIQUE step
   */
  const handleCritiqueStep = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const inputs = {
        initialPrompt,
        specDraft: getActiveOutput('specDraft')?.output,
        planTasks: getActiveOutput('planTasks')?.output,
        documentDraft: getActiveOutput('documentDraft')?.output
      };

      const response = await generateStep('CRITIQUE', inputs);

      if (response.success) {
        // Store critique (not editable, just reviewable)
        setResults(prev => ({
          ...prev,
          criticReport: response.data
        }));

        // Show critique modal for accept/reject
        setShowCritiqueModal(true);

        // Add to version history
        setVersionHistory(prev => [...prev, {
          timestamp: new Date().toISOString(),
          stepId: 'CRITIQUE',
          stepTitle: 'Step 4: Critique',
          action: 'generated',
          content: response.data.output
        }]);
      } else {
        throw new Error(response.error || 'Failed to generate critique');
      }
    } catch (err) {
      console.error('Error generating critique:', err);
      setError(err.message || 'An error occurred while generating the critique. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle accepting critique
   */
  const handleAcceptCritique = () => {
    setCritiqueAccepted(true);
    setShowCritiqueModal(false);
    setSavedSteps(prev => new Set(prev).add('criticReport'));

    // Add to version history
    setVersionHistory(prev => [...prev, {
      timestamp: new Date().toISOString(),
      stepId: 'CRITIQUE',
      stepTitle: 'Step 4: Critique',
      action: 'accepted',
      content: 'Critique feedback accepted - will be applied in finalization'
    }]);

    // Move to next step (FINALIZE)
    setCurrentStepIndex(prev => prev + 1);
  };

  /**
   * Handle rejecting critique
   */
  const handleRejectCritique = () => {
    setCritiqueAccepted(false);
    setShowCritiqueModal(false);

    // Add to version history
    setVersionHistory(prev => [...prev, {
      timestamp: new Date().toISOString(),
      stepId: 'CRITIQUE',
      stepTitle: 'Step 4: Critique',
      action: 'rejected',
      content: 'Critique feedback rejected - proceeding without changes'
    }]);

    // Skip critique in results for finalization
    // Move to next step (FINALIZE)
    setCurrentStepIndex(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary-600 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Business Document Agent
                </h1>
                <p className="text-sm text-gray-600">
                  Collaborative AI Document Creation
                </p>
              </div>
            </div>

            {/* Version History Count */}
            {versionHistory.length > 0 && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">{versionHistory.length}</span> edits tracked
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Control Panel */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <ControlPanel
                initialPrompt={initialPrompt}
                setInitialPrompt={setInitialPrompt}
                currentStep={currentStep}
                isLoading={isLoading}
                error={error}
                onRunStep={handleGenerateStep}
                isWorkflowComplete={workflowComplete}
                canProceed={canProceedToNextStep()}
                hasUnsavedEdits={hasUnsavedEdits()}
              />
            </div>
          </div>

          {/* Right Column - Output Viewer */}
          <div className="lg:col-span-2">
            <OutputViewer
              currentStepIndex={currentStepIndex}
              results={results}
              editedResults={editedResults}
              editingStep={editingStep}
              savedSteps={savedSteps}
              onStartEdit={setEditingStep}
              onEditContent={handleEditStep}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
              getActiveOutput={getActiveOutput}
              critiqueAccepted={critiqueAccepted}
            />
          </div>
        </div>
      </main>

      {/* Critique Modal */}
      {showCritiqueModal && (
        <CritiqueModal
          critique={results.criticReport}
          onAccept={handleAcceptCritique}
          onReject={handleRejectCritique}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">
              Business Document Agent v2.0.0 - Editable Workflow
            </p>
            <p>
              {import.meta.env.DEV ? (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded">
                  <span className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></span>
                  Running in MOCK mode - Edit and refine AI outputs
                </span>
              ) : (
                <span className="text-gray-500">
                  Connected to Prompt Spark API
                </span>
              )}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
