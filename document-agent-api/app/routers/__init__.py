"""
API routers for the Document Agent API
"""
from .health import router as health_router
from .auth import router as auth_router
from .document import router as document_router

__all__ = [
    "health_router",
    "auth_router",
    "document_router",
]
