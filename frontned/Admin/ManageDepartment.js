// JavaScript for submitting the department details form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.faculty-form'); // Select the form
    const token = localStorage.getItem('authToken'); 
    // Add event listener to the submit button
    const submitButton = document.getElementById('submit')
    submitButton.addEventListener('click', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const departmentName = document.getElementById('Department').value;

        // Validate form fields (optional)
        if (!departmentName) {
            alert('All fields are required.');
            return;
        }


        try {
            const response = await fetch('http://localhost:5000/api/department', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                   Authorization: token,
                },
                body: JSON.stringify({departmentName}),
            });

            if (response.ok) {
                alert('Department added successfully!');
                form.reset(); // Clear the form
            } else {
                const error = await response.json();
                alert(`Failed to add department: ${error.message}`);
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            alert('An error occurred while adding the department.');
        }
    });
});
