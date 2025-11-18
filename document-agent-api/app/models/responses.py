"""
Pydantic response models for the Document Agent API
"""
from typing import Dict, Optional, Any, List
from pydantic import BaseModel, Field
from datetime import datetime


class StepMetadata(BaseModel):
    """Metadata for a generated step"""
    agentPersona: str = Field(..., description="The AI agent persona used")
    processingTime: str = Field(..., description="Processing time in seconds")
    tokensUsed: Optional[int] = Field(None, description="Number of tokens used")
    model: Optional[str] = Field(None, description="AI model used")

    # Step-specific metadata
    confidence: Optional[float] = Field(None, description="Confidence score (0-1)")
    sectionsIdentified: Optional[int] = Field(None, description="Number of sections identified")
    estimatedTasks: Optional[int] = Field(None, description="Estimated number of tasks")
    estimatedHours: Optional[float] = Field(None, description="Estimated hours")
    wordCount: Optional[int] = Field(None, description="Word count of output")
    sectionsComplete: Optional[int] = Field(None, description="Number of completed sections")
    overallScore: Optional[int] = Field(None, description="Overall quality score (0-100)")
    criticalIssues: Optional[int] = Field(None, description="Number of critical issues")
    importantIssues: Optional[int] = Field(None, description="Number of important issues")
    minorIssues: Optional[int] = Field(None, description="Number of minor issues")
    finalScore: Optional[int] = Field(None, description="Final quality score (0-100)")
    pageCount: Optional[int] = Field(None, description="Number of pages")

    class Config:
        json_schema_extra = {
            "example": {
                "agentPersona": "Requirements Analyst",
                "processingTime": "1.2s",
                "tokensUsed": 1500,
                "model": "gpt-4",
                "confidence": 0.95,
                "sectionsIdentified": 5
            }
        }


class StepData(BaseModel):
    """Data returned from a step execution"""
    stepId: str = Field(..., description="The step that was executed")
    output: str = Field(..., description="The generated output in Markdown format")
    metadata: StepMetadata = Field(..., description="Metadata about the generation")

    class Config:
        json_schema_extra = {
            "example": {
                "stepId": "SPECIFY",
                "output": "# Document Specification\n\n## Overview\n...",
                "metadata": {
                    "agentPersona": "Requirements Analyst",
                    "processingTime": "1.2s",
                    "confidence": 0.95
                }
            }
        }


class SuccessResponse(BaseModel):
    """Success response wrapper"""
    success: bool = Field(True, description="Indicates successful operation")
    data: StepData = Field(..., description="The generated step data")

    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "data": {
                    "stepId": "SPECIFY",
                    "output": "# Document Specification\n\n## Overview\n...",
                    "metadata": {
                        "agentPersona": "Requirements Analyst",
                        "processingTime": "1.2s"
                    }
                }
            }
        }


class ErrorDetail(BaseModel):
    """Error detail information"""
    code: str = Field(..., description="Error code")
    message: str = Field(..., description="Human-readable error message")
    details: Optional[Dict[str, Any]] = Field(None, description="Additional error details")

    class Config:
        json_schema_extra = {
            "example": {
                "code": "INVALID_STEP",
                "message": "The provided stepId is not valid",
                "details": {"validSteps": ["SPECIFY", "PLAN", "DRAFT", "CRITIQUE", "FINALIZE"]}
            }
        }


class ErrorResponse(BaseModel):
    """Error response wrapper"""
    success: bool = Field(False, description="Indicates failed operation")
    error: ErrorDetail = Field(..., description="Error information")

    class Config:
        json_schema_extra = {
            "example": {
                "success": False,
                "error": {
                    "code": "INVALID_STEP",
                    "message": "The provided stepId is not valid"
                }
            }
        }


class HealthResponse(BaseModel):
    """Health check response"""
    status: str = Field(..., description="Service status")
    timestamp: str = Field(..., description="Current timestamp")
    version: str = Field(..., description="API version")

    class Config:
        json_schema_extra = {
            "example": {
                "status": "healthy",
                "timestamp": "2025-11-18T10:30:00Z",
                "version": "1.0.0"
            }
        }


class VersionResponse(BaseModel):
    """Version information response"""
    version: str = Field(..., description="API version")
    buildDate: str = Field(..., description="Build date")
    features: List[str] = Field(..., description="Enabled features")

    class Config:
        json_schema_extra = {
            "example": {
                "version": "1.0.0",
                "buildDate": "2025-11-18",
                "features": ["5-step-workflow", "jwt-auth", "rate-limiting"]
            }
        }


class TokenResponse(BaseModel):
    """Authentication token response"""
    accessToken: str = Field(..., description="JWT access token")
    refreshToken: str = Field(..., description="Refresh token")
    expiresIn: int = Field(..., description="Token expiration time in seconds")
    tokenType: str = Field(default="Bearer", description="Token type")

    class Config:
        json_schema_extra = {
            "example": {
                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "expiresIn": 3600,
                "tokenType": "Bearer"
            }
        }
