const token = localStorage.getItem('authToken'); 
document.addEventListener('DOMContentLoaded', function() {
    const facultyProfileForm = document.getElementById('facultyProfileForm');
    const masterEditBtn = document.getElementById('masterEditBtn');
    const saveAsDraftBtn = document.getElementById('saveAsDraft');
    const inputs = facultyProfileForm.querySelectorAll('input, select');
    const profileDropdown = document.querySelector('.profile-dropdown');
    const profileContainer = document.querySelector('.profile-container');
    const logoutButton = document.getElementById('logoutbutton');

    // Toggle edit mode
    masterEditBtn.addEventListener('click', function() {
        facultyProfileForm.classList.toggle('editing');
        masterEditBtn.classList.toggle('editing');

        if (facultyProfileForm.classList.contains('editing')) {
            // Enable inputs
            inputs.forEach(input => {
                input.removeAttribute('disabled');
                input.style.backgroundColor = 'white';
                input.style.borderColor = '#263A6D';
            });
            masterEditBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
        } else {
            // Disable inputs and save changes
            inputs.forEach(input => {
                input.setAttribute('disabled', true);
                input.style.backgroundColor = '#f8f9fa';
                input.style.borderColor = '#ddd';
            });
            masterEditBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
            saveProfileData();
        }
    });

    // Save as draft functionality
    saveAsDraftBtn.addEventListener('click', function() {
        saveProfileData(true);
    });

    // Profile form submission
    facultyProfileForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            saveProfileData(false);
        }
    });

    // Profile dropdown toggle
    profileContainer.addEventListener('click', function() {
        profileDropdown.classList.toggle('hidden');
    });

    // Logout functionality
    logoutButton.addEventListener('click', function() {
        // Implement logout logic
        window.location.href = '../login.html'; // Redirect to login page
    });

    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = facultyProfileForm.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });

        // Email validation
        const emailField = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value && !emailRegex.test(emailField.value)) {
            emailField.classList.add('error');
            isValid = false;
        }

        // Phone number validation
        const phoneField = document.getElementById('phone');
        const phoneRegex = /^[6-9]\d{9}$/;
        if (phoneField.value && !phoneRegex.test(phoneField.value)) {
            phoneField.classList.add('error');
            isValid = false;
        }

        return isValid;
    }

    // Save profile data
    function saveProfileData(isDraft = false) {
        if (!validateForm()) return;

        // Collect form data
        const formData = {
            isDraft: isDraft,
            personalInfo: {
                title: document.getElementById('title').value,
                firstName: document.getElementById('firstName').value,
                middleName: document.getElementById('middleName').value,
                lastName: document.getElementById('lastName').value
            },
            contactInfo: {
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                gender: document.getElementById('gender').value,
                dob: document.getElementById('dob').value
            },
            addressInfo: {
                address1: document.getElementById('address1').value,
                address2: document.getElementById('address2').value,
                city: document.getElementById('city').value,
                zipCode: document.getElementById('zipCode').value,
                state: document.getElementById('state').value,
                country: document.getElementById('country').value
            },
            professionalInfo: {
                designation: document.getElementById('designation').value,
                department: document.getElementById('department').value,
                education: document.getElementById('education').value,
                specialization: document.getElementById('specialization').value,
                experience: document.getElementById('experience').value,
                employeeType: document.getElementById('employeeType').value
            }
        };

        // Backend API call (replace with your actual backend endpoint)
        async function fetchData() {
            try {
              const response = await fetch('http://localhost:5000/api/get-details', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: token,
                  'type': t,
                },
              });
              if (!response.ok) throw new Error('Failed to fetch data');
              const data = await response.json();
              console.log(data.key);
              populateTable(data.key); 
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        }
    }

    // Initialize form with disabled inputs
    inputs.forEach(input => {
        input.setAttribute('disabled', true);
    });
});