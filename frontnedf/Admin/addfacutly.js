document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('facultyForm');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = {
            title: document.getElementById('title').value,
            firstName: document.getElementById('firstName').value,
            middleName: document.getElementById('middleName').value,
            lastName: document.getElementById('lastName').value,
            departmentName: document.getElementById('departmentName').value,
            facultyId: document.getElementById('facultyId').value,
            dateOfJoining: document.getElementById('dateOfJoining').value,
            designation: document.getElementById('designation').value,
            facultyEmail: document.getElementById('facultyEmail').value,
            scholarid: document.getElementById('scholarid').value,
            role: document.getElementById('role').value

        };

        // if (!validateForm(formData)) {
        //     return;
        // }
        
        const token = localStorage.getItem('authToken'); 
        try {
            const response = await fetch('http://localhost:5000/api/addfaculty', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': token,},
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Faculty added successfully!');
                form.reset();
            } else {
                alert('Error submitting form. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to connect to the server.');
        }
    });

    document.querySelector('.btn.save').addEventListener('click', () => {
        console.log('Saved as draft');
    });

    document.querySelector('.btn.cancel').addEventListener('click', () => {
        if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
            form.reset();
        }
    });
});

function validateForm(data) {
    // if (!data.firstName || !data.lastName || !data.departmentName || !data.facultyId || !data.facultyEmail) {
    //     alert('Please fill in all required fields');
    //     return false;
    // }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address');
        return false;
    }

    return true;
}