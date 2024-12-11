
        // Dropdown Toggle
        document.getElementById('userDropdown').addEventListener('click', function() {
            document.getElementById('dropdownMenu').classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('#userDropdown')) {
                document.getElementById('dropdownMenu').classList.remove('active');
            }
        });

        // Sample data for recent submissions
        const recentSubmissionsData = [
            { name: 'Dr. Sarah Johnson', department: 'Computer Science', status: 'Approved' },
            { name: 'Prof. Michael Chen', department: 'Physics', status: 'Pending' },
            { name: 'Dr. Emily Brown', department: 'Mathematics', status: 'Under Review' }
        ];

        // Populate recent submissions table
        function populateRecentSubmissions() {
            const tbody = document.getElementById('recentSubmissions');
            tbody.innerHTML = recentSubmissionsData.map(submission => `
                <tr>
                    <td>${submission.name}</td>
                    <td>${submission.department}</td>
                    <td>${submission.status}</td>
                </tr>
            `).join('');
        }

        // System status update
        function updateSystemStatus() {
            const systemStatus = document.getElementById('systemStatus');
            systemStatus.innerHTML = `
                <p>Last System Update: ${new Date().toLocaleDateString()}</p>
                <p>Active Users: 45</p>
                <p>System Performance: Optimal</p>
            `;
        }

        // Quick Action Functions
        function generateReport() {
            alert('Generating comprehensive report...');
        }

        function reviewPending() {
            alert('Opening pending reviews...');
        }

        function manageFaculty() {
            alert('Opening faculty management...');
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            populateRecentSubmissions();
            updateSystemStatus();
        });

        // Optional: Add a chart using a charting library
        // You would need to include a charting library like Chart.js
        // and initialize it here
  // Dropdown Toggle
        document.getElementById('userDropdown').addEventListener('click', function() {
            document.getElementById('dropdownMenu').classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('#userDropdown')) {
                document.getElementById('dropdownMenu').classList.remove('active');
            }
        });

        // Sample data for recent submissions
        const recentSubmissions = [
            { name: 'Dr. Sarah Johnson', department: 'Computer Science', status: 'Approved' },
            { name: 'Prof. Michael Chen', department: 'Physics', status: 'Pending' },
            { name: 'Dr. Emily Brown', department: 'Mathematics', status: 'Under Review' }
        ];

        // Populate recent submissions table
        function populateRecentSubmissions() {
            const tbody = document.getElementById('recentSubmissions');
            tbody.innerHTML = recentSubmissions.map(submission => `
                <tr>
                    <td>${submission.name}</td>
                    <td>${submission.department}</td>
                    <td>${submission.status}</td>
                </tr>
            `).join('');
        }

        // System status update
        function updateSystemStatus() {
            const systemStatus = document.getElementById('systemStatus');
            systemStatus.innerHTML = `
                <p>Last System Update: ${new Date().toLocaleDateString()}</p>
                <p>Active Users: 45</p>
                <p>System Performance: Optimal</p>
            `;
        }

        // Quick Action Functions
        function generateReport() {
            alert('Generating comprehensive report...');
        }

        function reviewPending() {
            alert('Opening pending reviews...');
        }

        function manageFaculty() {
            alert('Opening faculty management...');
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            populateRecentSubmissions();
            updateSystemStatus();
        });

        // Optional: Add a chart using a charting library
        // You would need to include a charting library like Chart.js
        // and initialize it here
    class Chatbot {
    constructor() {
        this.container = document.getElementById('chatbot-container');
        this.toggle = document.getElementById('chatbot-toggle');
        this.minimizeBtn = document.getElementById('minimize-btn');
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.userInput = document.getElementById('user-input');
        this.sendBtn = document.getElementById('send-btn');
        
        // Chat history
        this.chatHistory = [];
        
        // Predefined responses
        this.responses = {
            greeting: [
                "Hello! How can I assist you today?",
                "Hi there! Welcome to our support chat.",
                "Greetings! How may I help you?"
            ],
            appraisal: {
                process: "The appraisal process involves the following steps:\n1. Login to your account\n2. Fill out the self-assessment form\n3. Submit for review\n4. Wait for supervisor's evaluation",
                deadline: "The current appraisal submission deadline is December 31, 2024.",
                guidelines: "You can find the new appraisal guidelines in the Resources section of our website.",
                status: "To check your appraisal status, please login to your account and visit the dashboard."
            },
            technical: {
                login: "If you're having trouble logging in, please try:\n1. Clearing your browser cache\n2. Resetting your password\n3. Contacting IT support at support@example.com",
                browser: "Our system works best with the latest versions of Chrome, Firefox, or Edge browsers.",
                error: "If you're encountering an error, please take a screenshot and email it to support@example.com"
            },
            contact: {
                support: "You can reach our support team at:\nEmail: support@example.com\nPhone: 1800-XXX-XXXX\nWorking hours: 9 AM - 5 PM (Mon-Fri)",
                location: "Our office is located at: Government of NCT Delhi, Secretariat Building, I.P. Estate, New Delhi - 110002"
            }
        };

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.toggle.addEventListener('click', () => this.toggleChat());
        this.minimizeBtn.addEventListener('click', () => this.minimizeChat());
        this.sendBtn.addEventListener('click', () => this.handleUserInput());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserInput();
        });

        // Add typing indicator
        this.userInput.addEventListener('input', () => this.handleTyping());
    }

    toggleChat() {
        this.container.style.display = 'flex';
        this.toggle.style.display = 'none';
        this.scrollToBottom();
    }

    minimizeChat() {
        this.container.style.display = 'none';
        this.toggle.style.display = 'block';
    }

    async handleUserInput() {
        const message = this.userInput.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        this.userInput.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Process the message and get response
        const response = await this.processUserMessage(message);
        
        // Remove typing indicator and add bot response
        setTimeout(() => {
            this.removeTypingIndicator();
            this.addMessage(response, 'bot');
        }, 1000);
    }

    addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        
        // Convert URLs to clickable links
        const messageText = this.linkify(message);
        messageDiv.innerHTML = messageText;
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Save to chat history
        this.chatHistory.push({ sender, message });
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'bot-message', 'typing-indicator');
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        const typingIndicator = this.messagesContainer.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    async processUserMessage(message) {
        const lowerMessage = message.toLowerCase();

        // Check for greetings
        if (this.containsAny(lowerMessage, ['hello', 'hi', 'hey', 'greetings'])) {
            return this.getRandomResponse(this.responses.greeting);
        }

        // Check for appraisal-related queries
        if (lowerMessage.includes('appraisal')) {
            if (lowerMessage.includes('process')) return this.responses.appraisal.process;
            if (lowerMessage.includes('deadline')) return this.responses.appraisal.deadline;
            if (lowerMessage.includes('guidelines')) return this.responses.appraisal.guidelines;
            if (lowerMessage.includes('status')) return this.responses.appraisal.status;
        }

        // Check for technical issues
        if (this.containsAny(lowerMessage, ['login', 'password', 'cant access'])) {
            return this.responses.technical.login;
        }

        // Check for contact information
        if (this.containsAny(lowerMessage, ['contact', 'support', 'help'])) {
            return this.responses.contact.support;
        }

        // Default response
        return "I'm not sure I understand. Could you please rephrase your question? You can ask about appraisal process, guidelines, technical support, or contact information.";
    }

    containsAny(str, items) {
        return items.some(item => str.includes(item));
    }

    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    linkify(text) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, url => `<a href="${url}" target="_blank">${url}</a>`);
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    handleTyping() {
        // Add typing status if needed
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = new Chatbot();
});

