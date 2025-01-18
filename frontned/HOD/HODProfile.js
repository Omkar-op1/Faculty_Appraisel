document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('facultyProfileForm');
    const saveAsDraftBtn = document.getElementById('saveAsDraft');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Collect form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // Here you would typically send the data to a server
        console.log('Form submitted with data:', data);
        alert('Form submitted successfully!');
    });

    saveAsDraftBtn.addEventListener('click', function() {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Save to localStorage as draft
        localStorage.setItem('facultyProfileDraft', JSON.stringify(data));
        alert('Form saved as draft!');
    });

    // Load draft data if exists
    const savedDraft = localStorage.getItem('facultyProfileDraft');
    if (savedDraft) {
        const data = JSON.parse(savedDraft);
        Object.entries(data).forEach(([key, value]) => {
            const field = document.getElementById(key);
            if (field) {
                field.value = value;
            }
        });
    }
});