// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('facultyProfileForm');
//     const saveAsDraftBtn = document.getElementById('saveAsDraft');

//     form.addEventListener('submit', function(e) {
//         e.preventDefault();
//         // Collect form data
//         const formData = new FormData(this);
//         const data = Object.fromEntries(formData.entries());
        
//         // Here you would typically send the data to a server
//         console.log('Form submitted with data:', data);
//         alert('Form submitted successfully!');
//     });

//     saveAsDraftBtn.addEventListener('click', function() {
//         const formData = new FormData(form);
//         const data = Object.fromEntries(formData.entries());
        
//         // Save to localStorage as draft
//         localStorage.setItem('facultyProfileDraft', JSON.stringify(data));
//         alert('Form saved as draft!');
//     });

//     // Load draft data if exists
//     const savedDraft = localStorage.getItem('facultyProfileDraft');
//     if (savedDraft) {
//         const data = JSON.parse(savedDraft);
//         Object.entries(data).forEach(([key, value]) => {
//             const field = document.getElementById(key);
//             if (field) {
//                 field.value = value;
//             }
//         });
//     }
// });

// // Get the necessary DOM elements
// const notificationBell = document.querySelector('.notification-bell');
// const notificationPanel = document.querySelector('.notification-panel');

// // Add click event listener to the notification bell
// notificationBell.addEventListener('click', () => {
//   notificationPanel.classList.toggle('show');
// });

// // Add click event listener to the document to close the notification panel when clicked outside
// document.addEventListener('click', (event) => {
//   if (!event.target.closest('.notification-container')) {
//     notificationPanel.classList.remove('show');
//   }
// });

// // Fetch notifications from a server or local storage
// const notifications = [
//   {
//     title: 'New Message',
//     message: 'You have a new message from Jane Doe.',
//     timestamp: '2 hours ago'
//   },
//   {
//     title: 'Meeting Reminder',
//     message: 'Your weekly team meeting is scheduled for 3 PM today.',
//     timestamp: 'Yesterday'
//   },
//   {
//     title: 'Report Reminder',
//     message: "Don't forget to submit your monthly report by the end of the week.",
//     timestamp: '3 days ago'
//   }
// ];

// // Populate the notification list
// const notificationList = document.querySelector('.notification-list');
// notifications.forEach((notification) => {
//   const notificationItem = document.createElement('li');
//   notificationItem.innerHTML = `
//     <h4>${notification.title}</h4>
//     <p>${notification.message}</p>
//     <span class="notification-time">${notification.timestamp}</span>
//   `;
//   notificationList.appendChild(notificationItem);
// });

// // Update the notification badge
// const notificationBadge = document.querySelector('.notification-badge');
// notificationBadge.textContent = notifications.length;

// Function to fetch faculty profile data

const token = localStorage.getItem('authToken'); 
async function fetchFacultyProfile() {
  try {
    const response = await fetch('http://localhost:5000/api/get-details1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        //'type': t,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();
      console.log(data);
      populateProfileForm(data.faculty)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
// Function to populate the form with fetched data
function populateProfileForm(data) {
  console.log(data);
  // Personal Information
  document.getElementById('title').innerText = data.title || '';
  document.getElementById('firstName').innerText = data.firstName || '';
  document.getElementById('middleName').innerText = data.middleName || '';
  document.getElementById('lastName').innerText = data.lastName || '';

  // Contact Information
  document.getElementById('phone').innerText = data.phone || '';
  document.getElementById('email').innerText = data.facultyEmail || '';
  document.getElementById('gender').innerText = data.gender || '';
  document.getElementById('dob').innerText = data.dateOfBirth || '';

  // Address Details
  document.getElementById('address1').innerText = data.address1 || '';
  document.getElementById('address2').innerText = data.address2 || '';
  document.getElementById('city').innerText = data.city || '';
  document.getElementById('zipCode').innerText = data.zipcode || '';
  document.getElementById('state').innerText = data.state || '';
  document.getElementById('country').innerText = data.country || 'india';

  // Professional Information
  document.getElementById('designation').innerText = data.designation || '';
  document.getElementById('department').innerText = data.departmentName || '';
  document.getElementById('education').innerText = data.educationalQualifications || '';
  document.getElementById('specialization').innerText = data.areasOfSpecialization || '';
  document.getElementById('experience').innerText = data.experiences || '';
  document.getElementById('employeeType').innerText = data.employeeType || '';
}

// Function to handle form submission
async function handleProfileSubmission(event) {
  event.preventDefault();

  // Validate form
  if (!validateForm()) {
      return;
  }

  // Collect form data
  const formData = {
      // Personal Information
      title: document.getElementById('title').value,
      firstName: document.getElementById('firstName').value,
      middleName: document.getElementById('middleName').value,
      lastName: document.getElementById('lastName').value,

      // Contact Information
      phone: document.getElementById('phone').value,
      facultyEmail: document.getElementById('email').value,
      gender: document.getElementById('gender').value,
      dateOfBirth: document.getElementById('dob').value,

      // Address Details
      address1: document.getElementById('address1').value,
      address2: document.getElementById('address2').value,
      city: document.getElementById('city').value,
      zipcode: document.getElementById('zipCode').value,
      state: document.getElementById('state').value,
      country: document.getElementById('country').value,

      // Professional Information
      designation: document.getElementById('designation').value,
      departmentName: document.getElementById('department').value,
      educationalQualifications: document.getElementById('education').value,
      areasOfSpecialization: document.getElementById('specialization').value,
      experience: document.getElementById('experience').value,
      employeeType: document.getElementById('employeeType').value
  };

  try {
      // Replace with your actual backend submission endpoint
      const response = await fetch('/api/faculty/profile', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              // Add any authentication headers if required
              // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(formData)
      });

      if (!response.ok) {
          throw new Error('Failed to submit profile');
      }

      const result = await response.json();
      showSuccessMessage('Profile updated successfully');
  } catch (error) {
      console.error('Error submitting profile:', error);
      showErrorMessage('Unable to submit profile. Please try again.');
  }
}

// Function to validate form
function validateForm() {
  const requiredFields = document.querySelectorAll('.required');
  let isValid = true;

  requiredFields.forEach(field => {
      const input = field.nextElementSibling;
      if (!input.value.trim()) {
          input.classList.add('error');
          isValid = false;
      } else {
          input.classList.remove('error');
      }
  });

  return isValid;
}

// Function to show success message
function showSuccessMessage(message) {
  const messageContainer = document.createElement('div');
  messageContainer.className = 'alert alert-success';
  messageContainer.textContent = message;
  document.querySelector('.main-content').prepend(messageContainer);
  
  // Remove message after 5 seconds
  setTimeout(() => {
      messageContainer.remove();
  }, 5000);
}

// Function to show error message
function showErrorMessage(message) {
  const messageContainer = document.createElement('div');
  messageContainer.className = 'alert alert-error';
  messageContainer.textContent = message;
  document.querySelector('.main-content').prepend(messageContainer);
  
  // Remove message after 5 seconds
  setTimeout(() => {
      messageContainer.remove();
  }, 5000);
}

// Function to handle draft saving
async function handleDraftSave() {
  // Collect form data (similar to submission)
  const draftData = {
      // ... same data collection as in handleProfileSubmission
  };

  try {
      // Replace with your actual backend draft saving endpoint
      const response = await fetch('/api/faculty/draft', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              // Add authentication if required
          },
          body: JSON.stringify(draftData)
      });

      if (!response.ok) {
          throw new Error('Failed to save draft');
      }

      showSuccessMessage('Draft saved successfully');
  } catch (error) {
      console.error('Error saving draft:', error);
      showErrorMessage('Unable to save draft. Please try again.');
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Uncomment when backend is ready
  fetchFacultyProfile();

  // Form submission
  const profileForm = document.getElementById('facultyProfileForm');
  if (profileForm) {
      profileForm.addEventListener('submit', handleProfileSubmission);
  }

  // Draft saving
  const draftButton = document.getElementById('saveAsDraft');
  if (draftButton) {
      draftButton.addEventListener('click', handleDraftSave);
  }
});