import React from 'react';
import StepCard from './StepCard';
import { STEPS, getStepStatus } from '../utils/steps';

function OutputViewer({
  currentStepIndex,
  results,
  editedResults,
  editingStep,
  savedSteps,
  onStartEdit,
  onEditContent,
  onSaveEdit,
  onCancelEdit,
  getActiveOutput,
  critiqueAccepted
}) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Agent Workflow Outputs
        </h2>
        <p className="text-gray-600">
          Follow the 5-step process from specification to final document. Edit outputs as needed.
        </p>
      </div>

      {/* All Steps */}
      <div className="space-y-4">
        {STEPS.map((step) => {
          const status = getStepStatus(step.index, currentStepIndex);
          const output = getActiveOutput(step.outputKey);
          const isEditing = editingStep === step.outputKey;
          const isSaved = savedSteps.has(step.outputKey);
          const isEdited = editedResults[step.outputKey] !== undefined;

          return (
            <StepCard
              key={step.id}
              step={step}
              status={status}
              output={output}
              isEditing={isEditing}
              onStartEdit={onStartEdit}
              onEditContent={onEditContent}
              onSaveEdit={onSaveEdit}
              onCancelEdit={onCancelEdit}
              isSaved={isSaved}
              isEdited={isEdited}
            />
          );
        })}
      </div>

      {/* Critique Decision Indicator */}
      {critiqueAccepted !== null && (
        <div className={`card ${critiqueAccepted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{critiqueAccepted ? '✅' : '⏭️'}</span>
            <div>
              <h3 className="font-semibold text-gray-900">
                {critiqueAccepted ? 'Critique Feedback Accepted' : 'Critique Feedback Rejected'}
              </h3>
              <p className="text-sm text-gray-600">
                {critiqueAccepted
                  ? 'The finalization step will incorporate all critique improvements.'
                  : 'The finalization step will proceed without applying critique changes.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Workflow Information */}
      <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-3">
          About the 5-Step Editable Workflow
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex gap-3">
            <span className="text-2xl flex-shrink-0">📋</span>
            <div>
              <span className="font-semibold">Specify:</span> The Requirements Analyst clarifies what document you need.
              <span className="text-amber-700 font-medium"> (Editable after generation)</span>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl flex-shrink-0">📐</span>
            <div>
              <span className="font-semibold">Plan:</span> The Strategic Planner creates a detailed outline and breaks down the work.
              <span className="text-amber-700 font-medium"> (Editable after generation)</span>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl flex-shrink-0">✍️</span>
            <div>
              <span className="font-semibold">Draft:</span> The Content Writer generates the initial document following your spec and plan.
              <span className="text-amber-700 font-medium"> (Editable after generation)</span>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl flex-shrink-0">🔍</span>
            <div>
              <span className="font-semibold">Critique:</span> The Quality Reviewer analyzes the draft and provides improvement feedback.
              <span className="text-blue-700 font-medium"> (Accept or Reject via modal)</span>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl flex-shrink-0">✅</span>
            <div>
              <span className="font-semibold">Finalize:</span> The Document Finalizer applies improvements and delivers the polished final document.
              <span className="text-green-700 font-medium"> (Uses your edited versions)</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-blue-300">
          <p className="text-sm text-blue-800 font-medium">
            💡 Tip: Click the "Edit" button on any step to refine the AI output. Your edits will be used in subsequent steps.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OutputViewer;
