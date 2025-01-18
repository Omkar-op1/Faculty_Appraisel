document.addEventListener('DOMContentLoaded', function () {
  const signup = document.getElementById('signupform');

  signup.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(signup);

    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    const { username, password, confirmPassword } = formDataObj;

    if (!username || username.length < 3) {
      alert("Username must be at least 3 characters long.");
      return;
    }

    if (!password || password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    delete formDataObj.confirmPassword;

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObj),
      }); ``

      if (!response.ok) {
        const error = await response.json();
        alert(`Error: ${error.message || 'Something went wrong'}`);
        return;
      }

      const data = await response.json();
      localStorage.setItem('authToken', data.token);
      alert(data.message || "Signup successful!");
      window.location.href = 'Instituteregister.html';
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  });
});
