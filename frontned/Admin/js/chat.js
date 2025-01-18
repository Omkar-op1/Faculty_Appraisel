export function setupChatWidget() {
    const chatIcon = document.querySelector('.chat-icon');
    const chatHeader = document.querySelector('.chat-header');

    chatIcon.addEventListener('mouseenter', () => {
        chatHeader.style.display = 'block';
    });

    chatIcon.addEventListener('mouseleave', () => {
        chatHeader.style.display = 'none';
    });

    chatIcon.addEventListener('click', () => {
        // Implement chat functionality
        console.log('Chat widget clicked');
    });
}