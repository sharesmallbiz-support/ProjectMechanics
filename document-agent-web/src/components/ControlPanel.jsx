import React from 'react';
import { Play, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

function ControlPanel({
  initialPrompt,
  setInitialPrompt,
  currentStep,
  isLoading,
  error,
  onRunStep,
  isWorkflowComplete
}) {
  const canEditPrompt = currentStep.index === 0;

  return (
    <div className="card space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Business Document Agent
        </h2>
        <p className="text-gray-600">
          AI-powered 5-step workflow for creating professional business documents
        </p>
      </div>

      {/* Initial Prompt Input */}
      <div>
        <label htmlFor="initial-prompt" className="block text-sm font-semibold text-gray-700 mb-2">
          Initial Prompt
          {!canEditPrompt && (
            <span className="ml-2 text-xs font-normal text-gray-500">(locked after Step 1)</span>
          )}
        </label>
        <textarea
          id="initial-prompt"
          value={initialPrompt}
          onChange={(e) => setInitialPrompt(e.target.value)}
          disabled={!canEditPrompt}
          placeholder="Describe the business document you want to create...

Example: Create a comprehensive market analysis report for expanding our cloud services into the European market, targeting enterprise customers. Include competitive analysis, market sizing, financial projections, and strategic recommendations."
          className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none font-sans text-gray-900 disabled:bg-gray-50 disabled:text-gray-600"
          rows={6}
        />
        <p className="mt-2 text-sm text-gray-500">
          {initialPrompt.length} characters
        </p>
      </div>

      {/* Run Button */}
      {!isWorkflowComplete && (
        <div>
          <button
            onClick={onRunStep}
            disabled={isLoading || !initialPrompt.trim()}
            className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing {currentStep.title}...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>{currentStep.buttonLabel}</span>
              </>
            )}
          </button>

          {!initialPrompt.trim() && (
            <p className="mt-2 text-sm text-amber-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Please enter an initial prompt to begin
            </p>
          )}
        </div>
      )}

      {/* Workflow Complete Message */}
      {isWorkflowComplete && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900 mb-1">
                Workflow Complete!
              </h3>
              <p className="text-sm text-green-700">
                Your business document has been successfully generated through all 5 steps.
                Review the final document in Step 5 below.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">
                Error
              </h3>
              <p className="text-sm text-red-700">
                {error}
              </p>
              <button
                onClick={onRunStep}
                className="mt-2 text-sm font-medium text-red-700 hover:text-red-800 underline"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Workflow Progress
          </span>
          <span className="text-sm text-gray-600">
            {isWorkflowComplete ? '5/5 Complete' : `${currentStep.index}/5 Steps`}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep.index / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2 text-sm">
          How it works:
        </h3>
        <ol className="text-sm text-blue-800 space-y-1.5 list-decimal list-inside">
          <li>Enter your document idea in the prompt above</li>
          <li>Click the button to run each step sequentially</li>
          <li>Review outputs as each step completes</li>
          <li>All steps build on previous results automatically</li>
          <li>Download or copy your final document when complete</li>
        </ol>
      </div>
    </div>
  );
}

export default ControlPanel;
