document.addEventListener('DOMContentLoaded', () => {
    const chatbotMessages = document.getElementById('chatbot-messages');
    const faqBtns = document.querySelectorAll('.faq-btn');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const minimizeBtn = document.getElementById('minimize-btn');

    // FAQ answers
    const faqAnswers = {
        q1: "To access the self-appraisal form, log in to your account on the portal, navigate to the 'Self-Appraisal' section on your dashboard, and select the appropriate form for your designation (Assistant or Associate Professor).",
        q2: "Click on the 'Forgot Password' link on the login page. Enter your registered email or mobile number, and a reset link or OTP will be sent to you.",
        q4: "Yes, you can edit the form before the final submission. Once submitted, any edits will require approval from the admin panel.",
        q6: "Log in to your dashboard and navigate to the 'Form Status' section. You will see whether your form is Pending Review, Under Review, or Approved.",
        q10: "Yes, the system supports integration with existing ERP systems or LMS platforms via APIs for seamless data transfer and reporting."
    };

    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', () => {
        if (chatbotContainer.style.display === 'flex') {
            chatbotContainer.style.display = 'none';
        } else {
            chatbotContainer.style.display = 'flex';
        }
    });

    // Minimize chatbot
    minimizeBtn.addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
    });

    // Display answer when a FAQ button is clicked
    faqBtns.forEach(button => {
        button.addEventListener('click', () => {
            const questionId = button.getAttribute('data-question');
            const answer = faqAnswers[questionId];
            addMessage('user', button.textContent);
            addMessage('bot', answer);
        });
    });

    // Add a message to the chat window
    function addMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = message;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
});
