"""
Health and version endpoints
"""
from fastapi import APIRouter
from datetime import datetime
from app.models import HealthResponse, VersionResponse
from app.config import get_settings


router = APIRouter(tags=["Health"])


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint

    Returns the current status and basic information about the API.
    """
    settings = get_settings()

    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "version": settings.APP_VERSION
    }


@router.get("/version", response_model=VersionResponse)
async def get_version():
    """
    Version information endpoint

    Returns detailed version information and enabled features.
    """
    settings = get_settings()

    features = [
        "5-step-workflow",
        "jwt-auth",
        "openai-integration" if settings.OPENAI_API_KEY else None,
        "claude-integration" if settings.ANTHROPIC_API_KEY else None,
        "prompt-management",
        "rate-limiting",
    ]

    # Filter out None values
    features = [f for f in features if f is not None]

    return {
        "version": settings.APP_VERSION,
        "buildDate": settings.BUILD_DATE,
        "features": features
    }
