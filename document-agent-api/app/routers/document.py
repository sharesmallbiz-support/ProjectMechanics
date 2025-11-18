"""
Document generation endpoints
"""
from fastapi import APIRouter, Depends
from typing import Dict
from app.models import GenerateStepRequest, SuccessResponse, StepData, StepMetadata, StepId
from app.services import get_prompt_service, get_ai_service
from app.middleware import get_current_user
from app.utils import raise_ai_service_error, raise_server_error


router = APIRouter(prefix="/document", tags=["Document Generation"])


def calculate_word_count(text: str) -> int:
    """Calculate approximate word count"""
    return len(text.split())


def calculate_page_count(text: str) -> int:
    """Calculate approximate page count (assuming ~500 words per page)"""
    words = calculate_word_count(text)
    return max(1, round(words / 500))


@router.post("/generate-step", response_model=SuccessResponse)
async def generate_step(
    request: GenerateStepRequest,
    current_user: Dict = Depends(get_current_user)
):
    """
    Generate a specific step in the document workflow

    This is the main endpoint for executing the 5-step document generation workflow.
    Each step takes inputs from previous steps and produces output for the next step.

    **Workflow Steps:**
    - **SPECIFY**: Analyze requirements and create document specification
    - **PLAN**: Create implementation plan with task breakdown
    - **DRAFT**: Write the complete document draft
    - **CRITIQUE**: Review and provide quality feedback
    - **FINALIZE**: Polish and produce final document

    Args:
        request: GenerateStepRequest with stepId, inputs, and options
        current_user: Authenticated user information (from JWT token)

    Returns:
        SuccessResponse with generated content and metadata
    """
    prompt_service = get_prompt_service()
    ai_service = get_ai_service()

    # Check if AI service is configured
    if not ai_service.is_configured():
        raise_ai_service_error("AI service not configured. Please set OPENAI_API_KEY or ANTHROPIC_API_KEY")

    try:
        # Get the step-specific handler
        step_handlers = {
            StepId.SPECIFY: handle_specify_step,
            StepId.PLAN: handle_plan_step,
            StepId.DRAFT: handle_draft_step,
            StepId.CRITIQUE: handle_critique_step,
            StepId.FINALIZE: handle_finalize_step,
        }

        handler = step_handlers.get(request.stepId)
        if not handler:
            raise_server_error(f"No handler found for step: {request.stepId}")

        # Execute the step
        result = await handler(request, prompt_service, ai_service)

        return {
            "success": True,
            "data": result
        }

    except Exception as e:
        if hasattr(e, 'detail'):
            raise e
        raise_server_error(str(e))


async def handle_specify_step(
    request: GenerateStepRequest,
    prompt_service,
    ai_service
) -> StepData:
    """Handle the SPECIFY step"""
    # Format prompt with user's initial request
    prompt = prompt_service.format_prompt(
        "SPECIFY",
        initialPrompt=request.inputs.initialPrompt
    )

    # Generate response
    result = ai_service.generate(
        prompt=prompt,
        model=request.options.model,
        temperature=request.options.temperature,
        max_tokens=request.options.maxTokens
    )

    if 'error' in result:
        raise_ai_service_error(result['error'])

    # Calculate metadata
    sections_count = result['content'].count('\n## ')
    confidence = 0.85 + (0.1 if sections_count >= 5 else 0.0)

    metadata = StepMetadata(
        agentPersona="Requirements Analyst",
        processingTime=result['processing_time'],
        tokensUsed=result.get('tokens_used'),
        model=result['model'],
        confidence=confidence,
        sectionsIdentified=sections_count
    )

    return StepData(
        stepId="SPECIFY",
        output=result['content'],
        metadata=metadata
    )


async def handle_plan_step(
    request: GenerateStepRequest,
    prompt_service,
    ai_service
) -> StepData:
    """Handle the PLAN step"""
    # Format prompt with specification
    prompt = prompt_service.format_prompt(
        "PLAN",
        specDraft=request.inputs.specDraft
    )

    # Generate response
    result = ai_service.generate(
        prompt=prompt,
        model=request.options.model,
        temperature=request.options.temperature,
        max_tokens=request.options.maxTokens
    )

    if 'error' in result:
        raise_ai_service_error(result['error'])

    # Calculate metadata - count tasks (lines starting with "Task")
    task_count = result['content'].count('**Task ')
    estimated_hours = task_count * 1.5  # Rough estimate

    metadata = StepMetadata(
        agentPersona="Strategic Planner",
        processingTime=result['processing_time'],
        tokensUsed=result.get('tokens_used'),
        model=result['model'],
        estimatedTasks=task_count,
        estimatedHours=round(estimated_hours, 1)
    )

    return StepData(
        stepId="PLAN",
        output=result['content'],
        metadata=metadata
    )


async def handle_draft_step(
    request: GenerateStepRequest,
    prompt_service,
    ai_service
) -> StepData:
    """Handle the DRAFT step"""
    # Format prompt with specification and plan
    prompt = prompt_service.format_prompt(
        "DRAFT",
        specDraft=request.inputs.specDraft,
        planTasks=request.inputs.planTasks
    )

    # Generate response
    result = ai_service.generate(
        prompt=prompt,
        model=request.options.model,
        temperature=request.options.temperature,
        max_tokens=request.options.maxTokens
    )

    if 'error' in result:
        raise_ai_service_error(result['error'])

    # Calculate metadata
    word_count = calculate_word_count(result['content'])
    sections_complete = result['content'].count('\n## ')
    confidence = min(0.95, 0.7 + (sections_complete * 0.05))

    metadata = StepMetadata(
        agentPersona="Content Writer",
        processingTime=result['processing_time'],
        tokensUsed=result.get('tokens_used'),
        model=result['model'],
        wordCount=word_count,
        sectionsComplete=sections_complete,
        confidence=confidence
    )

    return StepData(
        stepId="DRAFT",
        output=result['content'],
        metadata=metadata
    )


async def handle_critique_step(
    request: GenerateStepRequest,
    prompt_service,
    ai_service
) -> StepData:
    """Handle the CRITIQUE step"""
    # Format prompt with all context
    prompt = prompt_service.format_prompt(
        "CRITIQUE",
        specDraft=request.inputs.specDraft,
        planTasks=request.inputs.planTasks,
        documentDraft=request.inputs.documentDraft
    )

    # Generate response
    result = ai_service.generate(
        prompt=prompt,
        model=request.options.model,
        temperature=request.options.temperature,
        max_tokens=request.options.maxTokens
    )

    if 'error' in result:
        raise_ai_service_error(result['error'])

    # Parse critique to extract issue counts
    content = result['content']
    critical_issues = content.count('**Priority**: Critical')
    important_issues = content.count('**Priority**: Important')
    minor_issues = content.count('**Priority**: Minor')

    # Calculate overall score (higher is better, fewer issues = higher score)
    total_issues = critical_issues + important_issues + minor_issues
    overall_score = max(50, min(95, 90 - (critical_issues * 10) - (important_issues * 3) - minor_issues))

    metadata = StepMetadata(
        agentPersona="Quality Reviewer",
        processingTime=result['processing_time'],
        tokensUsed=result.get('tokens_used'),
        model=result['model'],
        overallScore=overall_score,
        criticalIssues=critical_issues,
        importantIssues=important_issues,
        minorIssues=minor_issues
    )

    return StepData(
        stepId="CRITIQUE",
        output=result['content'],
        metadata=metadata
    )


async def handle_finalize_step(
    request: GenerateStepRequest,
    prompt_service,
    ai_service
) -> StepData:
    """Handle the FINALIZE step"""
    # Format prompt with draft and optional critique
    prompt_kwargs = {
        "documentDraft": request.inputs.documentDraft,
    }

    # Add critique information if available
    if request.inputs.critiqueReport:
        prompt_kwargs["critiqueReport"] = request.inputs.critiqueReport
        prompt_kwargs["critiqueAccepted"] = request.inputs.critiqueAccepted

    prompt = prompt_service.format_prompt("FINALIZE", **prompt_kwargs)

    # Generate response
    result = ai_service.generate(
        prompt=prompt,
        model=request.options.model,
        temperature=request.options.temperature,
        max_tokens=request.options.maxTokens
    )

    if 'error' in result:
        raise_ai_service_error(result['error'])

    # Calculate metadata
    word_count = calculate_word_count(result['content'])
    page_count = calculate_page_count(result['content'])

    # Final score is high since this is the polished version
    final_score = 92 if request.inputs.critiqueAccepted else 88

    metadata = StepMetadata(
        agentPersona="Document Finalizer",
        processingTime=result['processing_time'],
        tokensUsed=result.get('tokens_used'),
        model=result['model'],
        finalScore=final_score,
        wordCount=word_count,
        pageCount=page_count
    )

    return StepData(
        stepId="FINALIZE",
        output=result['content'],
        metadata=metadata
    )
