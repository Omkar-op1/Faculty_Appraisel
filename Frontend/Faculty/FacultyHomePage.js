
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