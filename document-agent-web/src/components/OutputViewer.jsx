import React from 'react';
import StepCard from './StepCard';
import { STEPS, getStepStatus } from '../utils/steps';

function OutputViewer({ currentStepIndex, results }) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Agent Workflow Outputs
        </h2>
        <p className="text-gray-600">
          Follow the 5-step process from specification to final document
        </p>
      </div>

      {/* All Steps */}
      <div className="space-y-4">
        {STEPS.map((step) => {
          const status = getStepStatus(step.index, currentStepIndex);
          const output = results[step.outputKey];

          return (
            <StepCard
              key={step.id}
              step={step}
              status={status}
              output={output}
            />
          );
        })}
      </div>

      {/* Workflow Information */}
      <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-3">
          About the 5-Step Workflow
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex gap-3">
            <span className="text-2xl flex-shrink-0">📋</span>
            <div>
              <span className="font-semibold">Specify:</span> The Requirements Analyst clarifies what document you need, who it's for, and what success looks like.
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl flex-shrink-0">📐</span>
            <div>
              <span className="font-semibold">Plan:</span> The Strategic Planner creates a detailed outline, identifies required research, and breaks down the work.
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl flex-shrink-0">✍️</span>
            <div>
              <span className="font-semibold">Draft:</span> The Content Writer generates the initial document following the spec and plan.
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl flex-shrink-0">🔍</span>
            <div>
              <span className="font-semibold">Critique:</span> The Quality Reviewer analyzes the draft and provides detailed improvement feedback.
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl flex-shrink-0">✅</span>
            <div>
              <span className="font-semibold">Finalize:</span> The Document Finalizer applies all improvements and delivers the polished final document.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutputViewer;
