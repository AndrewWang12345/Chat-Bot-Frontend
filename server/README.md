📖 Language Model API – FastAPI Backend
This is a FastAPI backend for generating text using a pretrained Transformer-based language model. The model is served via an API endpoint and takes a text context from the frontend, returning a generated string of text.

🚀 Features
🧠 Loads a pretrained PyTorch language model

🧾 Accepts prompt input (context) from the frontend

📤 Returns generated text based on prompt

🔄 Supports CORS for easy frontend integration

🧰 Requirements
Install dependencies with:

<pre> ```bash pip install -r requirements.txt ``` </pre>

🛠 Setup
Ensure the following files are present:

model.pth – The trained PyTorch language model

saved_vocab.pkl – A pickled vocabulary (dict[int, bytes])

main.py – The FastAPI server (your backend script)

📡 API Usage
POST /generate
Description: Generate text based on a given context.

Request:

Content-Type: application/x-www-form-urlencoded

Parameter:

context (str): Prompt to condition the language model

Example Request:

<pre> ```
curl -X POST http://localhost:8000/generate \
     -F "context=The quick brown fox"
``` </pre>
Response:

<pre> ```
{
  "generated_text": "The quick brown fox jumps over the lazy dog."
}
``` </pre>
🧪 Running Locally
Start the server with:

<pre> ```
python main.py
``` </pre>
