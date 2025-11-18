"""
Error handling utilities
"""
from typing import Optional, Dict, Any
from fastapi import HTTPException, status


class DocumentAgentException(Exception):
    """Base exception for Document Agent API"""
    def __init__(self, code: str, message: str, details: Optional[Dict[str, Any]] = None):
        self.code = code
        self.message = message
        self.details = details or {}
        super().__init__(message)


# Error codes from API specification
ERROR_CODES = {
    "INVALID_STEP": "The provided stepId is not valid",
    "MISSING_INPUT": "Required input parameters are missing for the specified step",
    "INVALID_INPUT": "The provided input parameters are malformed or invalid",
    "AI_SERVICE_ERROR": "Error communicating with AI service",
    "RATE_LIMIT_EXCEEDED": "Rate limit exceeded for your tier",
    "INVALID_TOKEN": "The provided authentication token is invalid or expired",
    "UNAUTHORIZED": "Authentication is required to access this resource",
    "SERVER_ERROR": "An unexpected server error occurred",
    "TIMEOUT": "Request processing exceeded the maximum allowed time"
}


def create_error_response(code: str, message: Optional[str] = None,
                         details: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """
    Create a standardized error response

    Args:
        code: Error code
        message: Custom error message (uses default if None)
        details: Additional error details

    Returns:
        Error response dict
    """
    return {
        "success": False,
        "error": {
            "code": code,
            "message": message or ERROR_CODES.get(code, "An error occurred"),
            "details": details or {}
        }
    }


def raise_invalid_step_error(valid_steps: list):
    """Raise an invalid step error"""
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail=create_error_response(
            "INVALID_STEP",
            details={"validSteps": valid_steps}
        )
    )


def raise_missing_input_error(missing_fields: list):
    """Raise a missing input error"""
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail=create_error_response(
            "MISSING_INPUT",
            details={"missingFields": missing_fields}
        )
    )


def raise_invalid_input_error(field: str, reason: str):
    """Raise an invalid input error"""
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail=create_error_response(
            "INVALID_INPUT",
            details={"field": field, "reason": reason}
        )
    )


def raise_ai_service_error(error_message: str):
    """Raise an AI service error"""
    raise HTTPException(
        status_code=status.HTTP_502_BAD_GATEWAY,
        detail=create_error_response(
            "AI_SERVICE_ERROR",
            details={"error": error_message}
        )
    )


def raise_rate_limit_error(tier: str, limit: int):
    """Raise a rate limit error"""
    raise HTTPException(
        status_code=status.HTTP_429_TOO_MANY_REQUESTS,
        detail=create_error_response(
            "RATE_LIMIT_EXCEEDED",
            details={"tier": tier, "limit": limit}
        )
    )


def raise_invalid_token_error():
    """Raise an invalid token error"""
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=create_error_response("INVALID_TOKEN"),
        headers={"WWW-Authenticate": "Bearer"}
    )


def raise_unauthorized_error():
    """Raise an unauthorized error"""
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=create_error_response("UNAUTHORIZED"),
        headers={"WWW-Authenticate": "Bearer"}
    )


def raise_server_error(error_message: str):
    """Raise a server error"""
    raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail=create_error_response(
            "SERVER_ERROR",
            details={"error": error_message}
        )
    )


def raise_timeout_error():
    """Raise a timeout error"""
    raise HTTPException(
        status_code=status.HTTP_504_GATEWAY_TIMEOUT,
        detail=create_error_response("TIMEOUT")
    )
