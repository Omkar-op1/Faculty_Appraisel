document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('facultyForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            title: document.getElementById('title').value,
            firstName: document.getElementById('firstName').value,
            middleName: document.getElementById('middleName').value,
            lastName: document.getElementById('lastName').value,
            department: document.getElementById('department').value,
            facultyId: document.getElementById('facultyId').value,
            joiningDate: document.getElementById('joiningDate').value,
            designation: document.getElementById('designation').value,
            email: document.getElementById('email').value
        };
        
        // Validate form data
        if (!validateForm(formData)) {
            return;
        }
        
        // Submit form data
        console.log('Form submitted:', formData);
        // Here you would typically send the data to a server
    });
    
    // Save as draft
    document.querySelector('.btn.save').addEventListener('click', function() {
        console.log('Saved as draft');
    });
    
    // Cancel
    document.querySelector('.btn.cancel').addEventListener('click', function() {
        if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
            form.reset();
        }
    });
});

function toggleOtherInput(field) {
    const selectElement = document.getElementById(field);
    const otherInput = document.getElementById(`${field}-other`);
    
    if (selectElement.value === "Other") {
        otherInput.classList.remove("hidden");
        otherInput.focus(); // Optional: Focus the text input when it becomes visible
    } else {
        otherInput.classList.add("hidden");
        otherInput.value = ""; // Clear the text input when "Other" is not selected
    }
}


function validateForm(data) {
    // Basic validation
    if (!data.firstName || !data.lastName || !data.department || !data.facultyId || !data.email) {
        alert('Please fill in all required fields');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    return true;
}