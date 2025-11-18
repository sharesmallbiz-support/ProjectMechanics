"""
Authentication endpoints
"""
from fastapi import APIRouter, HTTPException, status
from app.models import AuthTokenRequest, RefreshTokenRequest, TokenResponse
from app.services import get_auth_service
from app.utils import raise_unauthorized_error, raise_invalid_token_error


router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/token", response_model=TokenResponse)
async def get_token(request: AuthTokenRequest):
    """
    Authenticate with API key and receive JWT tokens

    Exchange an API key for access and refresh tokens.

    Args:
        request: AuthTokenRequest with apiKey

    Returns:
        TokenResponse with access token, refresh token, and expiration info
    """
    auth_service = get_auth_service()

    # Verify API key
    user_info = auth_service.verify_api_key(request.apiKey)

    if not user_info:
        raise_unauthorized_error()

    # Create tokens
    token_data = {
        "user_id": user_info["user_id"],
        "tier": user_info.get("tier", "free"),
        "name": user_info.get("name", "User")
    }

    access_token = auth_service.create_access_token(token_data)
    refresh_token = auth_service.create_refresh_token(token_data)

    return {
        "accessToken": access_token,
        "refreshToken": refresh_token,
        "expiresIn": auth_service.access_token_expire_minutes * 60,
        "tokenType": "Bearer"
    }


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(request: RefreshTokenRequest):
    """
    Refresh an expired access token

    Exchange a valid refresh token for a new access token.

    Args:
        request: RefreshTokenRequest with refreshToken

    Returns:
        TokenResponse with new access token and refresh token
    """
    auth_service = get_auth_service()

    # Verify refresh token
    payload = auth_service.verify_token(request.refreshToken, token_type="refresh")

    if not payload:
        raise_invalid_token_error()

    # Create new tokens
    token_data = {
        "user_id": payload["user_id"],
        "tier": payload.get("tier", "free"),
        "name": payload.get("name", "User")
    }

    access_token = auth_service.create_access_token(token_data)
    refresh_token = auth_service.create_refresh_token(token_data)

    return {
        "accessToken": access_token,
        "refreshToken": refresh_token,
        "expiresIn": auth_service.access_token_expire_minutes * 60,
        "tokenType": "Bearer"
    }
