from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv
import markdown

# Load environment variables
load_dotenv()

with open('bio.txt', 'r') as f:
    BIO = f.read()

app = Flask(__name__)

# Configure Google Gemini
genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))

# Initialize the model
model = genai.GenerativeModel('gemini-2.5-flash-preview-05-20')

# Store conversation history (in production, use database)
conversations = {}

def clean_markdown_text(text):
    """Clean and format markdown text for better HTML rendering"""
    # Remove any unwanted characters or formatting
    cleaned_text = text.strip()
    
    # Convert markdown to HTML
    html_content = markdown.markdown(
        cleaned_text,
        extensions=['codehilite', 'fenced_code', 'tables', 'nl2br'],
        extension_configs={
            'codehilite': {
                'css_class': 'highlight',
                'use_pygments': False
            }
        }
    )
    
    return html_content

@app.route('/')
def index():
    return render_template('chat.html')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        session_id = data.get('session_id', 'default')
        
        # Initialize conversation history for new sessions
        if session_id not in conversations:
            conversations[session_id] = []
        
        # Create conversation context
        conversation_context = ""
        if conversations[session_id]:
            for msg in conversations[session_id][-10:]:  # Last 10 messages for context
                conversation_context += f"User: {msg['user']}\nAssistant: {msg['assistant']}\n"
        
        prompt = f"""You are a helpful and friendly AI assistant for the portfolio of Ahmad Rosyid Alfualdi. Answer in the language spoken by users politely and informatively.Use the following information to answer questions related to my portfolio (portfolio of Ahmad Rosyid Alfualdi):
        {BIO} 
        
        Rules:
        1. Answer in the language of the questioner, prioritise the use of English
        2. if the questioner asks something other than about my portfolio (portfolio of Ahmad Rosyid Alfualdi) then answer the questioner's question
        3. when the questioner asks about the portfolio without including my portofolio (portfolio of Ahmad Rosyid Alfualdi) then ask whether the question is for my portofolio (portfolio of Ahmad Rosyid Alfualdi) or not
        4. If the questioner uses negative sentences then answer the question while giving him advice and warning
        5. when the questioner has been given a warning, but does not change then never answer the question again as long as the questioner still uses negative sentences
        6. When providing a link to the questioner, hide the original link and use ‘click here’ instead.
        
        You can use markdown formatting in your responses for better readability:
        
        - Use **bold** for emphasis
        - Use *italic* for subtle emphasis
        - Use `code` for inline code
        - Use ```language for code blocks
        - Use # ## ### for headers
        - Use - or * for bullet points
        - Use numbered lists when appropriate



{conversation_context}
User: {user_message}
Assistant:"""
        
        # Generate response using Gemini
        response = model.generate_content(prompt)
        ai_message_raw = response.text
        
        # Convert markdown to HTML
        ai_message_html = clean_markdown_text(ai_message_raw)
        
        # Store conversation (store raw text for context)
        conversations[session_id].append({
            'user': user_message,
            'assistant': ai_message_raw  # Store raw markdown for context
        })
        
        # Keep only last 20 conversations to manage memory
        if len(conversations[session_id]) > 20:
            conversations[session_id] = conversations[session_id][-20:]
        
        return jsonify({
            'success': True,
            'response': ai_message_html,  # Send HTML to frontend
            'raw_response': ai_message_raw  # Also send raw markdown if needed
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Error: {str(e)}'
        })

@app.route('/clear', methods=['POST'])
def clear_conversation():
    try:
        data = request.get_json()
        session_id = data.get('session_id', 'default')
        
        if session_id in conversations:
            conversations[session_id] = []
        
        return jsonify({
            'success': True,
            'message': 'The conversation has been deleted'
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Error: {str(e)}'
        })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)