const chatBox = document.getElementById('chat-box');
const optionsContainer = document.getElementById('options-container');
const questionDropdown = document.getElementById('question-dropdown');

const predefinedQuestions = [
    "What is WasteWise?",
    "How does WasteWise work?",
    "What features does the WasteWise mobile app offer?",
    "Can users provide feedback on WasteWise?",
    "What should I do if the WasteWise app is not updating waste levels?"
];

const predefinedAnswers = {
    "What is WasteWise?": "WasteWise is a comprehensive waste management system that integrates hardware and software components to monitor and manage waste levels in real-time.",
    "How does WasteWise work?": "WasteWise works by using sensors attached to waste bins to detect fill levels. These sensors send data to an Arduino board, which then transmits the information via GSM modules to our backend server. The server processes the data and makes it available through a mobile application, providing real-time updates on waste levels.",
    "What features does the WasteWise mobile app offer?": "The WasteWise mobile app offers real-time data on waste levels, notifications, a map showing bin locations and statuses, and separate interfaces for users, cleaning staff, and administrators. It also includes secure login for data privacy.",
    "Can users provide feedback on WasteWise?": "Yes, users can provide feedback through the mobile application or our website. We value user feedback and use it to continually improve the WasteWise system.",
    "What should I do if the WasteWise app is not updating waste levels?": "If the app is not updating waste levels, please check your internet connection and ensure that the app has the necessary permissions to access data. If the issue persists, contact our support team for assistance."
};

function appendMessage(message, sender, avatarPath) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    
    const avatar = document.createElement('img');
    avatar.src = avatarPath;
    avatar.className = 'avatar';

    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';

    if (sender === 'bot') {
        messageContainer.classList.add('bot-message');
    } else {
        messageContainer.classList.add('user-message');
    }

    messageContainer.appendChild(avatar);

    const textNode = document.createElement('span');
    textNode.textContent = message;
    messageContainer.appendChild(textNode);

    messageElement.appendChild(messageContainer);

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function respondToMessage(message) {
    const response = predefinedAnswers[message] || "I'm sorry, I don't understand that.";
    const botAvatar = 'avatar.png'; // Path to bot avatar image
    setTimeout(() => {
        appendMessage(response, 'bot', botAvatar);
    }, 1000);
}

function populateDropdown() {
    predefinedQuestions.forEach(question => {
        const option = document.createElement('option');
        option.value = question;
        option.textContent = question;
        questionDropdown.appendChild(option);
    });

    questionDropdown.addEventListener('change', () => {
        const selectedQuestion = questionDropdown.value;
        if (selectedQuestion) {
            const userAvatar = 'user.jpg'; // Path to user avatar image
            appendMessage(selectedQuestion, 'user', userAvatar);
            respondToMessage(selectedQuestion);
            questionDropdown.selectedIndex = 0; // Reset dropdown
        }
    });
}

// Automatically send a welcome message from the bot and display options
window.onload = () => {
    const botAvatar = 'avatar.png'; // Path to bot avatar image
    appendMessage("Welcome! Choose a question to get started.", 'bot', botAvatar);
    populateDropdown();
};
