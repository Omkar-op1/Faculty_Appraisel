// JavaScript for submitting the department details form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.faculty-form'); // Select the form

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


        try {
            // Send POST request
            const response = await fetch('/api/department', { // Replace with your API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(departmentName),
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
    }
    });
});
