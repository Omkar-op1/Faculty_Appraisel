// Faculty Profile Update Function
document.getElementById('facultyProfileForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Collect form data
    const formData = {
        title: document.querySelector('[name="title"]').value,
        firstName: document.querySelector('[name="firstName"]').value,
        middleName: document.querySelector('[name="middleName"]').value,
        lastName: document.querySelector('[name="lastName"]').value,
        phone: document.querySelector('[name="phone"]').value,
        gender: document.querySelector('[name="gender"]').value,
        dateOfBirth: document.querySelector('[name="dob"]').value,
        address1: document.querySelector('[name="address1"]').value,
        address2: document.querySelector('[name="address2"]').value,
        city: document.querySelector('[name="city"]').value,
        zipcode: document.querySelector('[name="zipCode"]').value,
        state: document.querySelector('[name="state"]').value,
        country: document.querySelector('[name="country"]').value,
        departmentName: document.querySelector('[name="department"]').value,
        //facultyId: document.querySelector('[name="facultyId"]').value,
        //dateOfJoining: document.querySelector('[name="dateOfJoining"]').value,
        designation: document.querySelector('[name="designation"]').value,
        facultyEmail: document.querySelector('[name="email"]').value,
        educationQualification: document.querySelector('[name="education"]').value,
        areasOfSpecialization: document.querySelector('[name="specialization"]').value,
        experiences: document.querySelector('[name="experience"]').value,
        employeeType: document.querySelector('[name="employeeType"]').value,
    };

    try {
        // Send POST request to backend
        const response = await fetch('http://localhost:5000/api/updateFaculty', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(formData),
            
        });

        // Check if the response is successful
        console.log(formData);
        const result = await response.json();

        if (response.ok) {
            alert(result.message); // Success message
        } else {
            alert(`Error: ${result.message}`); // Error message
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
    }
});

// Optional: You can add event listeners to handle the profile dropdown toggle and other UI interactions
document.querySelector('.profile-icon').addEventListener('click', () => {
    const dropdown = document.querySelector('.profile-dropdown');
    dropdown.classList.toggle('hidden');
});

// Handling the logout button click
document.getElementById('logoutbutton').addEventListener('click', () => {
    // Add logout functionality here (e.g., clear session, redirect, etc.)
    alert('Logging out...');
});
