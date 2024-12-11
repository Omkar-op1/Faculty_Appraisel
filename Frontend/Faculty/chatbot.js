document.addEventListener('DOMContentLoaded', function() {
  // Get all necessary elements
  const chatbotToggle = document.querySelector('.chatbot-toggle');
  const chatbotContainer = document.querySelector('.chatbot-container');
  const minimizeBtn = document.querySelector('.minimize-btn');
  const userInput = document.querySelector('#user-input');
  const sendBtn = document.querySelector('#send-btn');
  const messagesContainer = document.querySelector('.chatbot-messages');

  // Toggle chatbot visibility
  chatbotToggle.addEventListener('click', function() {
      chatbotContainer.style.display = 'flex';
      chatbotToggle.style.display = 'none';
  });

  // Minimize chatbot
  minimizeBtn.addEventListener('click', function() {
      chatbotContainer.style.display = 'none';
      chatbotToggle.style.display = 'block';
  });

  // Function to add a message to the chat
  function addMessage(message, isUser = false) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message');
      messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
      messageDiv.textContent = message;
      messagesContainer.appendChild(messageDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Function to get bot response
  function getBotResponse(message) {
      const lowerMessage = message.toLowerCase();
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
          return "Hello! How can I help you today?";
      } else if (lowerMessage.includes('appraisal')) {
          return "The appraisal system is currently open. You can submit your appraisal through the 'Get Started' button.";
      } else if (lowerMessage.includes('deadline')) {
          return "The current deadline for appraisal submission is December 31, 2024.";
      } else if (lowerMessage.includes('help')) {
          return "I can help you with appraisal submission, guidelines, and deadlines. What would you like to know?";
      } else {
          return "I'm not sure about that. Can you please rephrase your question?";
      }
  }

  // Handle sending messages
  function handleSendMessage() {
      const message = userInput.value.trim();
      if (message) {
          // Add user message
          addMessage(message, true);
          
          // Clear input
          userInput.value = '';
          
          // Add bot response after a short delay
          setTimeout(() => {
              const response = getBotResponse(message);
              addMessage(response, false);
          }, 500);
      }
  }

  // Send message on button click
  sendBtn.addEventListener('click', handleSendMessage);

  // Send message on Enter key
  userInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
          handleSendMessage();
      }
  });
});
