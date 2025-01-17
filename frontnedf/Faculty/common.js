
        // JavaScript for dropdown functionality
        document.addEventListener('DOMContentLoaded', () => {




          async function getname() {



            const response = await fetch('http://localhost:5000/api/get-details1', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: token,
              },
            });


            const data= response.json();


            const namebox=document.querySelector('#profile-name')
          
            namebox.innerText=data.faculty.firstName;
          }



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
    
    
       
            });  
                 const logoutButton = document.getElementById('logoutbutton');
        logoutButton.addEventListener('click', () => {
            console.log('hello')
            localStorage.removeItem('authToken');
            window.location.href = '../../Homepage/HomePage.html';
        });



        getname();
          });