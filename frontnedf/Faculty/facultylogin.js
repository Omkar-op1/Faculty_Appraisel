document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
  
    try {
      const response = await fetch('http://localhost:5000/api/facultylogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Login successful');

        console.log(result);

        localStorage.setItem('authToken', result.token);
        if(result.role==='HOD')
        {
           window.location.href='../HOD/HODHomePage.html'
        }
       else{
        window.location.href='FacultyHomepage.html'
       }
      } else {
        alert(result.error || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while logging in');
    }
  });