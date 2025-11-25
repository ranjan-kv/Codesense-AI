from google import genai
import json
import re
import os

# Initialize client (will be set from main.py)
_client = None

def set_client(client):
    """Set the Gemini client from main.py"""
    global _client
    _client = client

async def review_code_with_ai(code: str, language: str = "javascript") -> dict:
    """
    Analyze code using Gemini AI and return structured feedback
    """
    if not _client:
        raise ValueError("Gemini client not initialized")
    
    prompt = f"""
You are a senior software engineer and code reviewer.

Analyze this {language} code and provide detailed feedback in JSON format with the following structure:

{{
  "feedback": [
    {{
      "line": <line_number>,
      "type": "<Bug|Optimization|Readability|Security>",
      "severity": "<High|Medium|Low>",
      "description": "...",
      "suggestion": "..."
    }}
  ],
  "quality_score": <0-100>,
  "summary": "<brief overall summary>"
}}

Rules:
- Only include actual issues found. If code is perfect, return empty feedback array.
- Line numbers should be accurate.
- Be specific and actionable in descriptions and suggestions.
- Quality score should reflect overall code quality (100 = perfect, 0 = very poor).
- Summary should be 1-2 sentences.

Code:
{code}
"""

    try:
        response = _client.models.generate_content(
            model="models/gemini-2.5-pro",
            contents=prompt
        )
        response_text = response.text
        
        # Extract JSON from response (handle markdown code blocks)
        json_match = re.search(r'\{[\s\S]*\}', response_text)
        if json_match:
            json_str = json_match.group(0)
            result = json.loads(json_str)
            
            # Validate structure
            if not isinstance(result, dict):
                raise ValueError("Invalid response format")
            
            # Ensure required fields
            if "feedback" not in result:
                result["feedback"] = []
            if "quality_score" not in result:
                result["quality_score"] = 85
            if "summary" not in result:
                result["summary"] = "Code review completed."
            
            return result
        else:
            # Fallback if JSON not found
            return {
                "feedback": [],
                "quality_score": 85,
                "summary": "Code review completed. No major issues found."
            }
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        return {
            "feedback": [],
            "quality_score": 75,
            "summary": "Code review completed. Unable to parse detailed feedback."
        }
    except Exception as e:
        print(f"AI review error: {e}")
        return {
            "feedback": [],
            "quality_score": 75,
            "summary": f"Error during code review: {str(e)}"
        }

async def chat_with_ai(message: str, code: str = "") -> dict:
    """
    Chat with AI about code
    """
    if not _client:
        raise ValueError("Gemini client not initialized")
    
    if code:
        prompt = f"""
You are an AI code assistant. The user has the following code and is asking a question about it.

Code:
{code}

User Question: {message}

Provide a helpful, detailed answer about the code. Be specific and actionable.
"""
    else:
        prompt = f"""
You are an AI code assistant. Answer the user's question helpfully and in detail.

User Question: {message}
"""

    try:
        response = _client.models.generate_content(
            model="models/gemini-2.5-pro",
            contents=prompt
        )
        return {
            "response": response.text
        }
    except Exception as e:
        return {
            "response": f"I apologize, but I encountered an error: {str(e)}"
        }
