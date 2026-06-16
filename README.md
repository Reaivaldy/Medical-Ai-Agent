# AIHealthAgent

Lightweight health-focused AI assistant built with FastAPI (backend) and a small React frontend.

Overview
- Backend: FastAPI app that proxies chat messages to a Google Gemini model via `langchain_google_genai`.
- Frontend: Minimal React/Vite UI in the `frontend/` folder that talks to the backend `/api/chat` endpoint.

Prerequisites
- Python 3.10+ and pip
- Node 18+ and npm or yarn (for the frontend)
- A Google Gemini API key (or other credentials required by your `langchain` provider)

Setup
1. Copy and fill environment file:

	 - Duplicate `copy.env` to `.env` and set your Gemini API key:

		 GEMINI_API_KEY=your_key_here

2. Backend (Python)

	 - Create a virtual environment and install core packages:

		 python -m venv .venv
		 .venv\Scripts\activate  # Windows
		 pip install fastapi uvicorn python-dotenv

	 - Run the API server:

		 uvicorn main:app --reload --host 0.0.0.0 --port 8000

3. Frontend (React + Vite)

	 - Change into `frontend/`, install, and run the dev server:

		 cd frontend
		 npm install
		 npm run dev

API
- POST /api/chat

	- Request JSON shape:

		{
			"messages": [
				{"role": "user", "content": "Hello, I have a question about..."}
			]
		}

	- Response: streaming plain text from the model (text/plain).

Notes
- The backend uses `langchain_google_genai.ChatGoogleGenerativeAI` in `main.py`.
- If you use a different LLM provider, update `get_llm()` in `main.py` accordingly.

Contributing
- Small edits, fixes, and documentation improvements are welcome. Open a PR with a short description.

