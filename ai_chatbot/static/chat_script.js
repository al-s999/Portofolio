let sessionId = 'user_' + Date.now();
        
        const chatMessages = document.getElementById('chatMessages');
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');
        const clearButton = document.getElementById('clearButton');
        const typingIndicator = document.getElementById('typingIndicator');

        function addMessage(content, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
            
            const messageContentDiv = document.createElement('div');
            messageContentDiv.className = 'message-content';
            
            if (isUser) {
                // For user messages, use plain text
                messageContentDiv.textContent = content;
            } else {
                // For bot messages, render HTML (converted from markdown)
                messageContentDiv.innerHTML = content;
            }
            
            messageDiv.appendChild(messageContentDiv);
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function showTyping() {
            typingIndicator.style.display = 'block';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function hideTyping() {
            typingIndicator.style.display = 'none';
        }

        async function sendMessage() {
            const message = messageInput.value.trim();
            if (!message) return;

            // Add user message
            addMessage(message, true);
            messageInput.value = '';
            
            // Disable input
            sendButton.disabled = true;
            messageInput.disabled = true;
            showTyping();

            try {
                const response = await fetch('/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: message,
                        session_id: sessionId
                    })
                });

                const data = await response.json();
                
                hideTyping();
                
                if (data.success) {
                    // data.response now contains HTML converted from markdown
                    addMessage(data.response);
                } else {
                    addMessage('Sorry, error occurred');
                }
            } catch (error) {
                hideTyping();
                addMessage('I apologize, unable to connect to the server.');
                console.error('Error:', error);
            }

            // Enable input
            sendButton.disabled = false;
            messageInput.disabled = false;
            messageInput.focus();
        }

        async function clearChat() {
            try {
                const response = await fetch('/clear', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        session_id: sessionId
                    })
                });

                if (response.ok) {
                    // Clear chat messages from UI
                    chatMessages.innerHTML = `
                        <div class="welcome-message">
                            How can I help you? 😊
                        </div>
                    `;
                }
            } catch (error) {
                console.error('Error clearing chat:', error);
            }
        }

        sendButton.addEventListener('click', sendMessage);
        clearButton.addEventListener('click', clearChat);
        
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Focus on input when page loads
        messageInput.focus();

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
          }
          
          function particlesInit() {
              var generator = document.getElementById("particleGenerator");
              var particleCount = 200;
              for (var i = 0; i < particleCount; i++) {
                  var size = getRandomInt(2, 6);
                  var n = '<div class="particle" style="top:' + getRandomInt(15, 95) + '%; left:' + getRandomInt(5,95) + '%; width:'
                  + size + 'px; height:' + size + 'px; animation-delay:' + (getRandomInt(0,30)/10) + 's; background-color:rgba('
                  + getRandomInt(80, 160) + ',' + getRandomInt(185, 255) + ',' + getRandomInt(160, 255) + ',' + (getRandomInt(2, 8)/10) + ');"></div>';
                  console.log("Particle " + i + ": " + n);
                  var node = document.createElement("div");
                  node.innerHTML = n;
                  generator.appendChild(node);
              }
          }
          
          particlesInit();