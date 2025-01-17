document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = e.target.querySelector('input[type="text"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
  
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Login successful');

        console.log(result);

        localStorage.setItem('authToken', result.token);
        window.location.href='AdminHomepage.html'
      } else {
        alert(result.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while logging in');
    }
  });