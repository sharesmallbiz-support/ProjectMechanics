"""
Prompt management service for loading and processing prompts from the /data folder
"""
import os
from typing import Dict, Optional
from pathlib import Path


class PromptService:
    """Service for managing and loading prompts from the /data/prompts folder"""

    def __init__(self, prompts_dir: Optional[str] = None):
        """
        Initialize the prompt service

        Args:
            prompts_dir: Path to the prompts directory. If None, uses default location.
        """
        if prompts_dir is None:
            # Default to data/prompts relative to project root
            project_root = Path(__file__).parent.parent.parent
            self.prompts_dir = project_root / "data" / "prompts"
        else:
            self.prompts_dir = Path(prompts_dir)

        self._prompt_cache: Dict[str, str] = {}
        self._load_all_prompts()

    def _load_all_prompts(self):
        """Load all prompt files into cache"""
        prompt_files = {
            "SPECIFY": "specify.md",
            "PLAN": "plan.md",
            "DRAFT": "draft.md",
            "CRITIQUE": "critique.md",
            "FINALIZE": "finalize.md"
        }

        for step_id, filename in prompt_files.items():
            file_path = self.prompts_dir / filename
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    self._prompt_cache[step_id] = f.read()
                print(f"✓ Loaded prompt for {step_id} from {filename}")
            except FileNotFoundError:
                print(f"✗ Warning: Prompt file not found: {file_path}")
                self._prompt_cache[step_id] = self._get_default_prompt(step_id)
            except Exception as e:
                print(f"✗ Error loading prompt {filename}: {e}")
                self._prompt_cache[step_id] = self._get_default_prompt(step_id)

    def _get_default_prompt(self, step_id: str) -> str:
        """Return a default prompt if file is not found"""
        return f"You are an AI assistant helping with the {step_id} step of document generation."

    def get_prompt(self, step_id: str) -> str:
        """
        Get the prompt template for a specific step

        Args:
            step_id: The step ID (SPECIFY, PLAN, DRAFT, CRITIQUE, FINALIZE)

        Returns:
            The prompt template as a string
        """
        return self._prompt_cache.get(step_id, self._get_default_prompt(step_id))

    def format_prompt(self, step_id: str, **kwargs) -> str:
        """
        Format a prompt template with provided variables

        Args:
            step_id: The step ID
            **kwargs: Variables to substitute in the prompt template

        Returns:
            The formatted prompt
        """
        template = self.get_prompt(step_id)

        # Handle FINALIZE step with optional critique
        if step_id == "FINALIZE":
            if kwargs.get('critiqueReport') and kwargs.get('critiqueAccepted'):
                kwargs['critiqueSection'] = f"""**Critique Report:**
{kwargs['critiqueReport']}
"""
                kwargs['critiqueFeedbackInstructions'] = """If the critique was ACCEPTED:
- Carefully implement all critical and important recommendations
- Address issues in order of priority
- Maintain the document's core message while making improvements
- Ensure all critique feedback is properly addressed"""
            else:
                kwargs['critiqueSection'] = "**Note**: No critique report was provided or critique was rejected. Focus on general polishing and refinement."
                kwargs['critiqueFeedbackInstructions'] = "Since no critique feedback is available, focus on:\n- General polishing and editing\n- Grammar and style improvements\n- Formatting consistency\n- Professional presentation"

        # Format the template with provided variables
        try:
            formatted = template.format(**kwargs)
            return formatted
        except KeyError as e:
            print(f"Warning: Missing variable {e} for prompt {step_id}")
            # Return template with unfilled variables rather than failing
            return template

    def reload_prompts(self):
        """Reload all prompts from disk (useful for development)"""
        self._prompt_cache.clear()
        self._load_all_prompts()

    def list_available_prompts(self) -> list:
        """Return a list of available prompt step IDs"""
        return list(self._prompt_cache.keys())


# Global instance
_prompt_service_instance: Optional[PromptService] = None


def get_prompt_service() -> PromptService:
    """Get the global prompt service instance"""
    global _prompt_service_instance
    if _prompt_service_instance is None:
        _prompt_service_instance = PromptService()
    return _prompt_service_instance
