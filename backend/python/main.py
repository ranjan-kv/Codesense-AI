from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from google import genai
import ai_utils

load_dotenv()

app = FastAPI(title="CodeSense AI - AI Processing API")

# CORS middleware - Allow all Vercel URLs
allowed_origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    os.getenv("FRONTEND_URL", "")  # Add your Vercel URL here after deployment
]
allowed_origins = [origin for origin in allowed_origins if origin]  # Remove empty strings

# Allow all Vercel URLs (preview and production)
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.vercel\.app",  # Allow all Vercel URLs
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini API client
GEMINI_CLIENT = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# Set client in ai_utils module
ai_utils.set_client(GEMINI_CLIENT)

class CodeReviewRequest(BaseModel):
    code: str
    language: str = "javascript"

class ChatRequest(BaseModel):
    message: str
    code: str = ""

@app.get("/")
def read_root():
    return {"message": "CodeSense AI - AI Processing API"}

@app.post("/review")
async def review_code(request: CodeReviewRequest):
    try:
        result = await ai_utils.review_code_with_ai(request.code, request.language)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        result = await ai_utils.chat_with_ai(request.message, request.code)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)

