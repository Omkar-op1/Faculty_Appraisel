document.addEventListener('DOMContentLoaded', function () {
    const register = document.getElementById('register');
  
    register.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData(register);
      const formDataObj = {};
  
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      const token = localStorage.getItem('authToken');
      console.log(token);
      try {
        const response = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`, 
          },
          body: JSON.stringify(formDataObj),
        });
  
        if (!response.ok) {
          const error = await response.json();
          alert(`Error: ${error.error || 'Something went wrong'}`);
          return;
        }
  
        const data = await response.json();
  
        alert(data.message || "Registration successful!");
        window.location.href = '../Login/Institutelogin.html';
      } catch (error) {
        alert("An error occurred. Please try again.");
      }
    });
  });