// Define the API endpoints
const API_BASE_URL = "https://localhost:5000";
const API_SAVE_CREDITS = `${API_BASE_URL}/saveCredits`;
const API_SET_DEADLINE = `${API_BASE_URL}/setDeadline`;
const API_BEGIN_PROCESS = `${API_BASE_URL}/beginProcess`;
const API_GET_SETTINGS = `${API_BASE_URL}/getSettings`;

// Save credit settings
function saveCreditSettings() {
    const credits = Array.from(document.querySelectorAll('.credit-input')).map(input => ({
        section: input.dataset.section,
        value: parseInt(input.value, 10)
    }));

    fetch(API_SAVE_CREDITS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ credits })
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to save credits');
            return response.json();
        })
        .then(data => {
            alert('Credits saved successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error saving credits.');
        });
}

// Set the deadline
function setDeadline() {
    const deadline = document.getElementById('deadlineDate').value;

    if (!deadline) {
        alert('Please select a deadline date.');
        return;
    }

    fetch(API_SET_DEADLINE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ deadline })
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to set deadline');
            return response.json();
        })
        .then(data => {
            alert('Deadline set successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error setting deadline.');
        });
}

// Begin the appraisal process
function startAppraisal() {
    fetch(API_BEGIN_PROCESS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'start' })
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to start appraisal process');
            return response.json();
        })
        .then(data => {
            alert('Appraisal process started successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error starting the appraisal process.');
        });
}

// Retrieve credit settings and deadline
function loadSettings() {
    fetch(API_GET_SETTINGS)
        .then(response => {
            if (!response.ok) throw new Error('Failed to retrieve settings');
            return response.json();
        })
        .then(data => {
            // Populate credit settings
            const creditSettings = data.credits;
            const creditSettingsContainer = document.getElementById('creditSettings');
            creditSettingsContainer.innerHTML = '';

            creditSettings.forEach(setting => {
                const input = document.createElement('input');
                input.type = 'number';
                input.className = 'credit-input';
                input.dataset.section = setting.section;
                input.value = setting.value;

                const label = document.createElement('label');
                label.textContent = `${setting.section}: `;
                label.appendChild(input);

                creditSettingsContainer.appendChild(label);
            });

            // Set deadline date
            document.getElementById('deadlineDate').value = data.deadline;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error loading settings.');
        });
}

// Initialize settings on page load
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();

    // Modal close functionality
    const modal = document.getElementById('creditModal');
    const closeModalButton = modal.querySelector('.close');
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.onclick = event => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});
