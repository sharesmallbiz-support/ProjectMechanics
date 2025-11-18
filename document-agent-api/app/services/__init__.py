"""
Service layer for the Document Agent API
"""
from .prompt_service import PromptService, get_prompt_service
from .auth_service import AuthService, get_auth_service
from .ai_service import AIService, get_ai_service

__all__ = [
    "PromptService",
    "get_prompt_service",
    "AuthService",
    "get_auth_service",
    "AIService",
    "get_ai_service",
]
