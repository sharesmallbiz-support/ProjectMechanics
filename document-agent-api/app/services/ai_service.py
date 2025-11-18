"""
AI integration service for OpenAI and Anthropic Claude
"""
import time
from typing import Optional, Dict, Any
import openai
from anthropic import Anthropic


class AIService:
    """Service for AI model integration"""

    def __init__(self, openai_api_key: Optional[str] = None,
                 anthropic_api_key: Optional[str] = None,
                 default_model: str = "gpt-4"):
        """
        Initialize AI service

        Args:
            openai_api_key: OpenAI API key
            anthropic_api_key: Anthropic API key
            default_model: Default model to use
        """
        self.openai_api_key = openai_api_key
        self.anthropic_api_key = anthropic_api_key
        self.default_model = default_model

        # Initialize clients
        if openai_api_key:
            openai.api_key = openai_api_key

        if anthropic_api_key:
            self.anthropic_client = Anthropic(api_key=anthropic_api_key)
        else:
            self.anthropic_client = None

    def generate(self, prompt: str, model: Optional[str] = None,
                 temperature: float = 0.7, max_tokens: int = 4000) -> Dict[str, Any]:
        """
        Generate text using the specified AI model

        Args:
            prompt: The prompt to send to the AI
            model: Model to use (or default_model if None)
            temperature: Temperature for generation
            max_tokens: Maximum tokens to generate

        Returns:
            Dict with 'content', 'tokens_used', 'model', and 'processing_time'
        """
        model = model or self.default_model
        start_time = time.time()

        try:
            # Route to appropriate provider
            if model.startswith("gpt-") or model.startswith("text-"):
                result = self._generate_openai(prompt, model, temperature, max_tokens)
            elif model.startswith("claude-"):
                result = self._generate_anthropic(prompt, model, temperature, max_tokens)
            else:
                # Default to OpenAI
                result = self._generate_openai(prompt, model, temperature, max_tokens)

            processing_time = time.time() - start_time
            result['processing_time'] = f"{processing_time:.1f}s"

            return result

        except Exception as e:
            # Return error information
            processing_time = time.time() - start_time
            return {
                'content': f"Error generating content: {str(e)}",
                'tokens_used': 0,
                'model': model,
                'processing_time': f"{processing_time:.1f}s",
                'error': str(e)
            }

    def _generate_openai(self, prompt: str, model: str,
                         temperature: float, max_tokens: int) -> Dict[str, Any]:
        """Generate using OpenAI API"""
        if not self.openai_api_key:
            raise ValueError("OpenAI API key not configured")

        response = openai.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are a helpful AI assistant specialized in document generation."},
                {"role": "user", "content": prompt}
            ],
            temperature=temperature,
            max_tokens=max_tokens
        )

        content = response.choices[0].message.content
        tokens_used = response.usage.total_tokens

        return {
            'content': content,
            'tokens_used': tokens_used,
            'model': model
        }

    def _generate_anthropic(self, prompt: str, model: str,
                           temperature: float, max_tokens: int) -> Dict[str, Any]:
        """Generate using Anthropic Claude API"""
        if not self.anthropic_client:
            raise ValueError("Anthropic API key not configured")

        message = self.anthropic_client.messages.create(
            model=model,
            max_tokens=max_tokens,
            temperature=temperature,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        content = message.content[0].text
        tokens_used = message.usage.input_tokens + message.usage.output_tokens

        return {
            'content': content,
            'tokens_used': tokens_used,
            'model': model
        }

    def is_configured(self) -> bool:
        """Check if at least one AI provider is configured"""
        return bool(self.openai_api_key or self.anthropic_api_key)


# Global instance
_ai_service_instance: Optional[AIService] = None


def get_ai_service(openai_api_key: Optional[str] = None,
                   anthropic_api_key: Optional[str] = None,
                   default_model: str = "gpt-4") -> AIService:
    """
    Get the global AI service instance

    Args:
        openai_api_key: OpenAI API key
        anthropic_api_key: Anthropic API key
        default_model: Default model to use

    Returns:
        AIService instance
    """
    global _ai_service_instance
    if _ai_service_instance is None:
        _ai_service_instance = AIService(
            openai_api_key=openai_api_key,
            anthropic_api_key=anthropic_api_key,
            default_model=default_model
        )
    return _ai_service_instance
