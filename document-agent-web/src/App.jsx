import React, { useState } from 'react';
import ControlPanel from './components/ControlPanel';
import OutputViewer from './components/OutputViewer';
import { STEPS, getStepByIndex, isWorkflowComplete } from './utils/steps';
import { generateStep } from './services/api';
import { FileText } from 'lucide-react';

const DEFAULT_PROMPT = `Create a comprehensive market analysis report for expanding our cloud services into the European market, targeting enterprise customers. Include competitive analysis, market sizing, financial projections, and strategic recommendations for the executive team.`;

function App() {
  // State management
  const [initialPrompt, setInitialPrompt] = useState(DEFAULT_PROMPT);
  const [results, setResults] = useState({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentStep = getStepByIndex(currentStepIndex);
  const workflowComplete = isWorkflowComplete(currentStepIndex);

  /**
   * Generate the current step
   */
  const handleGenerateStep = async () => {
    if (!currentStep || workflowComplete) return;

    setIsLoading(true);
    setError(null);

    try {
      // Prepare inputs for this step
      const inputs = {
        initialPrompt,
        ...currentStep.inputKeys.reduce((acc, key) => {
          if (key === 'initialPrompt') {
            acc[key] = initialPrompt;
          } else if (results[key]) {
            acc[key] = results[key].output;
          }
          return acc;
        }, {})
      };

      console.log(`Generating ${currentStep.id} with inputs:`, inputs);

      // Call API
      const response = await generateStep(currentStep.id, inputs);

      if (response.success) {
        // Update results with output
        setResults(prev => ({
          ...prev,
          [currentStep.outputKey]: response.data
        }));

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary-600 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Business Document Agent
              </h1>
              <p className="text-sm text-gray-600">
                Powered by Prompt Spark AI
              </p>
            </div>
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
              />
            </div>
          </div>

          {/* Right Column - Output Viewer */}
          <div className="lg:col-span-2">
            <OutputViewer
              currentStepIndex={currentStepIndex}
              results={results}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">
              Business Document Agent v1.0.0
            </p>
            <p>
              {import.meta.env.DEV ? (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded">
                  <span className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></span>
                  Running in MOCK mode - No real API calls
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
