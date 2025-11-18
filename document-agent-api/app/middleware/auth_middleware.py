"""
Authentication middleware for JWT token validation
"""
from fastapi import Request, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Dict, Optional
from app.services import get_auth_service
from app.utils import raise_invalid_token_error, raise_unauthorized_error


security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> Dict:
    """
    Dependency to get the current authenticated user from JWT token

    Args:
        credentials: HTTP Bearer credentials from request

    Returns:
        User information dict

    Raises:
        HTTPException: If token is invalid or missing
    """
    if not credentials:
        raise_unauthorized_error()

    token = credentials.credentials
    auth_service = get_auth_service()

    # Verify the token
    payload = auth_service.verify_token(token, token_type="access")

    if not payload:
        raise_invalid_token_error()

    return payload


async def get_optional_user(
    request: Request
) -> Optional[Dict]:
    """
    Optional authentication - returns user if authenticated, None otherwise

    Args:
        request: FastAPI request

    Returns:
        User information dict or None
    """
    try:
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return None

        token = auth_header.replace("Bearer ", "")
        auth_service = get_auth_service()
        payload = auth_service.verify_token(token, token_type="access")

        return payload
    except Exception:
        return None
