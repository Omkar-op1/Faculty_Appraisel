document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('facultyProfileForm');
    const saveAsDraftBtn = document.getElementById('saveAsDraft');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Collect form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // Here you would typically send the data to a server
        console.log('Form submitted with data:', data);
        alert('Form submitted successfully!');
    });

    saveAsDraftBtn.addEventListener('click', function() {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Save to localStorage as draft
        localStorage.setItem('facultyProfileDraft', JSON.stringify(data));
        alert('Form saved as draft!');
    });

    // Load draft data if exists
    const savedDraft = localStorage.getItem('facultyProfileDraft');
    if (savedDraft) {
        const data = JSON.parse(savedDraft);
        Object.entries(data).forEach(([key, value]) => {
            const field = document.getElementById(key);
            if (field) {
                field.value = value;
            }
        });
    }
});

// Get the necessary DOM elements
const notificationBell = document.querySelector('.notification-bell');
const notificationPanel = document.querySelector('.notification-panel');

// Add click event listener to the notification bell
notificationBell.addEventListener('click', () => {
  notificationPanel.classList.toggle('show');
});

// Add click event listener to the document to close the notification panel when clicked outside
document.addEventListener('click', (event) => {
  if (!event.target.closest('.notification-container')) {
    notificationPanel.classList.remove('show');
  }
});

// Fetch notifications from a server or local storage
const notifications = [
  {
    title: 'New Message',
    message: 'You have a new message from Jane Doe.',
    timestamp: '2 hours ago'
  },
  {
    title: 'Meeting Reminder',
    message: 'Your weekly team meeting is scheduled for 3 PM today.',
    timestamp: 'Yesterday'
  },
  {
    title: 'Report Reminder',
    message: "Don't forget to submit your monthly report by the end of the week.",
    timestamp: '3 days ago'
  }
];

// Populate the notification list
const notificationList = document.querySelector('.notification-list');
notifications.forEach((notification) => {
  const notificationItem = document.createElement('li');
  notificationItem.innerHTML = `
    <h4>${notification.title}</h4>
    <p>${notification.message}</p>
    <span class="notification-time">${notification.timestamp}</span>
  `;
  notificationList.appendChild(notificationItem);
});

// Update the notification badge
const notificationBadge = document.querySelector('.notification-badge');
notificationBadge.textContent = notifications.length;


  // JavaScript for dropdown functionality
      document.addEventListener('DOMContentLoaded', () => {



        const token = localStorage.getItem('authToken'); 

    if (!token) {
        window.location.href = "../../Homepage/homepage.html";
    }
        const profileInfo = document.querySelector('.profile-info');
        const profileDropdown = document.querySelector('.profile-dropdown');
  
        profileInfo.addEventListener('click', () => {
          profileDropdown.classList.toggle('hidden');
        });
  
        // Close dropdown when clicking outside
        document.addEventListener('click', (event) => {
          if (!profileInfo.contains(event.target)) {
            profileDropdown.classList.add('hidden');
          }


          const logoutButton = document.getElementById('logoutbutton');
    logoutButton.addEventListener('click', () => {
        console.log('hello')
        localStorage.removeItem('authToken');
        window.location.href = '../Homepage/HomePage.html';
    });
        });
      });
      function toggleNotifications() {
        const notificationSection = document.getElementById("notification-section");
        if (notificationSection.style.display === "none" || notificationSection.style.display === "") {
            notificationSection.style.display = "block";
        } else {
            notificationSection.style.display = "none";
        }
    }