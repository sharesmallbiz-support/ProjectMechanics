/**
 * Step Configuration for Business Document Agent
 *
 * Defines the 5-step workflow and metadata for each step
 */

export const STEPS = [
  {
    id: 'SPECIFY',
    index: 0,
    title: 'Step 1: Specify',
    agentPersona: 'Requirements Analyst',
    description: 'Define document requirements and scope',
    inputKeys: ['initialPrompt'],
    outputKey: 'specDraft',
    buttonLabel: 'Run Step 1: Specify Requirements',
    icon: '📋',
    color: 'blue'
  },
  {
    id: 'PLAN',
    index: 1,
    title: 'Step 2: Plan',
    agentPersona: 'Strategic Planner',
    description: 'Create detailed outline and task breakdown',
    inputKeys: ['specDraft'],
    outputKey: 'planTasks',
    buttonLabel: 'Run Step 2: Plan & Tasks',
    icon: '📐',
    color: 'purple'
  },
  {
    id: 'DRAFT',
    index: 2,
    title: 'Step 3: Draft',
    agentPersona: 'Content Writer',
    description: 'Generate initial document draft',
    inputKeys: ['specDraft', 'planTasks'],
    outputKey: 'documentDraft',
    buttonLabel: 'Run Step 3: Draft Document',
    icon: '✍️',
    color: 'green'
  },
  {
    id: 'CRITIQUE',
    index: 3,
    title: 'Step 4: Critique',
    agentPersona: 'Quality Reviewer',
    description: 'Analyze and provide improvement feedback',
    inputKeys: ['specDraft', 'planTasks', 'documentDraft'],
    outputKey: 'criticReport',
    buttonLabel: 'Run Step 4: Critique & Review',
    icon: '🔍',
    color: 'yellow'
  },
  {
    id: 'FINALIZE',
    index: 4,
    title: 'Step 5: Finalize',
    agentPersona: 'Document Finalizer',
    description: 'Apply improvements and produce final document',
    inputKeys: ['specDraft', 'planTasks', 'documentDraft', 'criticReport'],
    outputKey: 'finalDocument',
    buttonLabel: 'Run Step 5: Finalize Document',
    icon: '✅',
    color: 'emerald'
  }
];

/**
 * Get step by ID
 */
export function getStepById(stepId) {
  return STEPS.find(s => s.id === stepId);
}

/**
 * Get step by index
 */
export function getStepByIndex(index) {
  return STEPS[index];
}

/**
 * Get step status based on current index
 */
export function getStepStatus(stepIndex, currentStepIndex) {
  if (stepIndex < currentStepIndex) return 'complete';
  if (stepIndex === currentStepIndex) return 'active';
  return 'pending';
}

/**
 * Check if all steps are complete
 */
export function isWorkflowComplete(currentStepIndex) {
  return currentStepIndex >= STEPS.length;
}

export default STEPS;
