"""
Main FastAPI application for the Document Agent API
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.config import get_settings
from app.routers import health_router, auth_router, document_router
from app.services import get_prompt_service, get_auth_service, get_ai_service


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events
    """
    # Startup
    settings = get_settings()
    print("=" * 60)
    print(f"🚀 Starting {settings.APP_NAME} v{settings.APP_VERSION}")
    print("=" * 60)

    # Initialize services
    print("\n📦 Initializing services...")

    # Prompt service
    prompt_service = get_prompt_service()
    available_prompts = prompt_service.list_available_prompts()
    print(f"✓ Prompt service: {len(available_prompts)} prompts loaded")

    # Auth service
    auth_service = get_auth_service(secret_key=settings.JWT_SECRET_KEY)
    print(f"✓ Auth service: JWT configured (expires in {settings.ACCESS_TOKEN_EXPIRE_MINUTES}m)")

    # AI service
    ai_service = get_ai_service(
        openai_api_key=settings.OPENAI_API_KEY,
        anthropic_api_key=settings.ANTHROPIC_API_KEY,
        default_model=settings.DEFAULT_AI_MODEL
    )
    if ai_service.is_configured():
        print(f"✓ AI service: Configured with default model '{settings.DEFAULT_AI_MODEL}'")
    else:
        print("⚠️  AI service: Not configured (set OPENAI_API_KEY or ANTHROPIC_API_KEY)")

    print("\n✅ All services initialized successfully!")
    print(f"\n🌐 Server running on http://{settings.HOST}:{settings.PORT}")
    print(f"📚 API docs available at http://{settings.HOST}:{settings.PORT}/docs")
    print("=" * 60 + "\n")

    yield

    # Shutdown
    print("\n" + "=" * 60)
    print("🛑 Shutting down Document Agent API")
    print("=" * 60)


# Create FastAPI application
settings = get_settings()

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="""
    # Document Agent API

    A powerful API for automated document generation using AI agents.

    ## Features

    - **5-Step Workflow**: SPECIFY → PLAN → DRAFT → CRITIQUE → FINALIZE
    - **AI-Powered**: Supports OpenAI GPT and Anthropic Claude models
    - **Prompt Management**: Sophisticated prompt system stored in /data folder
    - **JWT Authentication**: Secure token-based authentication
    - **Professional Output**: High-quality Markdown documents

    ## Workflow Steps

    1. **SPECIFY** - Requirements Analyst creates document specification
    2. **PLAN** - Strategic Planner breaks down implementation tasks
    3. **DRAFT** - Content Writer produces complete draft
    4. **CRITIQUE** - Quality Reviewer provides detailed feedback
    5. **FINALIZE** - Document Finalizer polishes the final version

    ## Authentication

    All endpoints (except `/health` and `/version`) require JWT authentication:

    1. Get token: `POST /auth/token` with your API key
    2. Use token: Add `Authorization: Bearer <token>` header to requests
    3. Refresh token: `POST /auth/refresh` when access token expires

    ## Quick Start

    ```bash
    # Get authentication token
    curl -X POST http://localhost:8000/auth/token \\
      -H "Content-Type: application/json" \\
      -d '{"apiKey": "demo-api-key"}'

    # Generate SPECIFY step
    curl -X POST http://localhost:8000/api/v1/document/generate-step \\
      -H "Authorization: Bearer <your-token>" \\
      -H "Content-Type: application/json" \\
      -d '{
        "stepId": "SPECIFY",
        "inputs": {
          "initialPrompt": "Create a market analysis report"
        }
      }'
    ```
    """,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include routers
app.include_router(health_router, prefix=settings.API_PREFIX)
app.include_router(auth_router, prefix=settings.API_PREFIX)
app.include_router(document_router, prefix=settings.API_PREFIX)


# Root endpoint
@app.get("/", include_in_schema=False)
async def root():
    """Root endpoint - redirects to API docs"""
    return {
        "message": "Welcome to Document Agent API",
        "version": settings.APP_VERSION,
        "docs": "/docs",
        "health": f"{settings.API_PREFIX}/health"
    }


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler for unhandled errors"""
    print(f"Unhandled error: {exc}")

    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": {
                "code": "SERVER_ERROR",
                "message": "An unexpected error occurred",
                "details": {"error": str(exc)} if settings.DEBUG else {}
            }
        }
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level="info"
    )
