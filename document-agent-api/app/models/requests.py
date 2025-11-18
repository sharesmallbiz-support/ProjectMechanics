"""
Pydantic request models for the Document Agent API
"""
from typing import Dict, Optional, Any
from pydantic import BaseModel, Field, validator
from enum import Enum


class StepId(str, Enum):
    """Valid step IDs for the document generation workflow"""
    SPECIFY = "SPECIFY"
    PLAN = "PLAN"
    DRAFT = "DRAFT"
    CRITIQUE = "CRITIQUE"
    FINALIZE = "FINALIZE"


class GenerationOptions(BaseModel):
    """Options for AI generation"""
    temperature: Optional[float] = Field(default=0.7, ge=0.0, le=2.0)
    maxTokens: Optional[int] = Field(default=4000, ge=100, le=32000)
    model: Optional[str] = Field(default="gpt-4", description="AI model to use")

    class Config:
        json_schema_extra = {
            "example": {
                "temperature": 0.7,
                "maxTokens": 4000,
                "model": "gpt-4"
            }
        }


class StepInputs(BaseModel):
    """Input data for a specific step"""
    initialPrompt: Optional[str] = None
    specDraft: Optional[str] = None
    planTasks: Optional[str] = None
    documentDraft: Optional[str] = None
    critiqueReport: Optional[str] = None
    critiqueAccepted: Optional[bool] = None

    class Config:
        json_schema_extra = {
            "example": {
                "initialPrompt": "Create a market analysis report for expanding cloud services into the European market"
            }
        }


class GenerateStepRequest(BaseModel):
    """Request model for generate-step endpoint"""
    stepId: StepId = Field(..., description="The workflow step to execute")
    inputs: StepInputs = Field(..., description="Input data for the step")
    options: Optional[GenerationOptions] = Field(default_factory=GenerationOptions)

    @validator('inputs')
    def validate_inputs(cls, inputs, values):
        """Validate that required inputs are present for each step"""
        if 'stepId' not in values:
            return inputs

        step_id = values['stepId']

        if step_id == StepId.SPECIFY:
            if not inputs.initialPrompt:
                raise ValueError("initialPrompt is required for SPECIFY step")

        elif step_id == StepId.PLAN:
            if not inputs.specDraft:
                raise ValueError("specDraft is required for PLAN step")

        elif step_id == StepId.DRAFT:
            if not inputs.specDraft or not inputs.planTasks:
                raise ValueError("specDraft and planTasks are required for DRAFT step")

        elif step_id == StepId.CRITIQUE:
            if not inputs.specDraft or not inputs.planTasks or not inputs.documentDraft:
                raise ValueError("specDraft, planTasks, and documentDraft are required for CRITIQUE step")

        elif step_id == StepId.FINALIZE:
            if not inputs.documentDraft:
                raise ValueError("documentDraft is required for FINALIZE step")

        return inputs

    class Config:
        json_schema_extra = {
            "example": {
                "stepId": "SPECIFY",
                "inputs": {
                    "initialPrompt": "Create a market analysis report for expanding cloud services into the European market"
                },
                "options": {
                    "temperature": 0.7,
                    "maxTokens": 4000,
                    "model": "gpt-4"
                }
            }
        }


class AuthTokenRequest(BaseModel):
    """Request model for authentication token"""
    apiKey: str = Field(..., description="API key for authentication")

    class Config:
        json_schema_extra = {
            "example": {
                "apiKey": "your-api-key-here"
            }
        }


class RefreshTokenRequest(BaseModel):
    """Request model for token refresh"""
    refreshToken: str = Field(..., description="Refresh token")

    class Config:
        json_schema_extra = {
            "example": {
                "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            }
        }
