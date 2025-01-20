document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken'); 

    if (!token) {
        window.location.href = "../../Homepage/homepage.html";
    }
    const instituteNameElement = document.querySelector('.profile-name');
  
    if (token) {
      fetch('http://localhost:5000/api/institute-name', {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch institute name');
          }
          return response.json();
        })
        .then(data => {
          if (data.instituteName) {
            console.log(data.instituteName)
            instituteNameElement.textContent = data.instituteName; // Update institute name in UI
          }
        })
        .catch(error => {
          console.error('Error fetching institute name:', error);
          instituteNameElement.textContent = 'Unknown Institute'; // Fallback
        });
    } else {
      instituteNameElement.textContent = 'No Token Found'; // Handle missing token
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


      })

       
    }) 
   const logoutButton = document.getElementById('logoutbutton');
  logoutButton.addEventListener('click', () => {
      console.log('hello')
      localStorage.removeItem('authToken');
      window.location.href = '../Homepage/HomePage.html';
  });

  });


