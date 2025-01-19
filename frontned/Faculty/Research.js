const t=6;
document.addEventListener('DOMContentLoaded', () => {
  fetchData();
  getscore();

});

async function getscore() {
  const scorebox=document.getElementById('scoreObtained');
  try {
    const response = await fetch('http://localhost:5000/api/get-details1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();
    scorebox.value=data.faculty.D;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

}
async function fetchdata1() {

  const response = await fetch('http://localhost:5000/api/fetchg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  
  });
}
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
function populateTable(data) {
  const tableBody = document.getElementById('entriesTableBody');
  tableBody.innerHTML = '';
  data.forEach((entry, index) => {
    const row = document.createElement('tr');
    console.log(entry._id);
    row.setAttribute('data-id', entry._id);
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${entry.research || 'N/A'}</td>
      <td>${entry.publicationName || 'N/A'}</td>
      <td>${entry.category || 'N/A'}</td>
      <td>${entry.score || 'N/A'}</td>
      <td><a href='${entry.document || 'N/A'}'>view</a></td>
      <td>
       <button class="btn btn-danger btn-sm rounded-0" type="button" 
        data-toggle="tooltip" data-placement="top" title="Delete"
        onclick="deleteEntry(${index})">
    <i class="fa fa-trash"></i>
</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}
// DOM Elements
const modal = document.getElementById("modal");
const facultyForm = document.getElementById("facultyForm");
const entriesTableBody = document.getElementById("entriesTableBody");
const scoreObtained = document.getElementById("scoreObtained");
const token = localStorage.getItem('authToken'); 
// Points mapping for categories


// Render the table


// Open modal
function openModal() {
  modal.classList.remove("hidden");
}

// Close modal
function closeModal() {
  modal.classList.add("hidden");
  resetForm();
}

// Handle category change
function handleCategoryChange() {
  const categorySelect = document.getElementById("categorySelect");
  const customCategoryGroup = document.getElementById("customCategoryGroup");

  if (categorySelect.value === "Other") {
    customCategoryGroup.classList.remove("hidden");
  } else {
    customCategoryGroup.classList.add("hidden");
    document.getElementById("customCategoryInput").value = ""; // Reset custom category input
  }
}

// Form submission
async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  formData.append('t', '6');
  const formDataObj = {};
  
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      const score = calculatescore(formDataObj);
      formDataObj['score']=score;

      try {
        const response = await fetch('http://localhost:5000/api/add-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
          body: JSON.stringify(formDataObj),
        });
    
        // Check if the response is successful
        if (!response.ok) {
          const errorBody = await response.json(); // Parse error details from the response
          console.error("Error details:", errorBody);
    
          // Create a meaningful error message
          const errorMessage = errorBody.error || errorBody.message || `Error: ${response.status} - ${response.statusText}`;
          throw new Error(errorMessage);
        }
    
        const data = await response.json();
        console.log("Response received:", data);
        alert('Details added successfully!');
    
      } catch (error) {
        // Log and display the error
        console.error('Error during fetch:', error.message);
        alert(`An error occurred: ${error.message}`);
      }
    
  closeModal();
  fetchData();
  
}

// Reset form
function resetForm() {
  facultyForm.reset();
}


// View document (placeholder)
function viewDocument(id) {
  alert("Document viewer will be implemented here");
}

// // Calculate final score
// function calculateFinalScore() {
//   let totalPoints = 0;

//   entries.forEach((entry) => {
//     totalPoints += categoryPoints[entry.category] || 0; // Add points for the selected category
//   });

//   // Cap the score at 10
//   const finalScore = Math.min(totalPoints, 10); // Ensure total score does not exceed 10
//   scoreObtained.value = finalScore.toFixed(2); // Display with two decimal points
// }

function toggleNotifications() {
  const notificationSection = document.getElementById("notification-section");
  if (notificationSection.style.display === "none" || notificationSection.style.display === "") {
      notificationSection.style.display = "block";
  } else {
      notificationSection.style.display = "none";
  }
}

async function deleteEntry(index) {
  const tableBody = document.getElementById('entriesTableBody');
  const row = tableBody.rows[index];
  const entryId = row.getAttribute('data-id'); // Ensure each row has a unique 'data-id' attribute

  if (!entryId) {
    alert('Unable to identify the entry to delete.');
    return;
  }

  const confirmation = confirm('Are you sure you want to delete this entry?');
  if (!confirmation) return;

  try {
    const response = await fetch(`http://localhost:5000/api/delete-details/${entryId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        'type': t,

      },
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Error details:', errorBody);
      const errorMessage = errorBody.error || errorBody.message || `Error: ${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Delete response:', data);
    alert('Entry deleted successfully!');

    // Remove the row from the table
    row.remove();
  } catch (error) {
    console.error('Error deleting entry:', error.message);
    alert(`An error occurred: ${error.message}`);
  }
}

function toggleFields() {
  const publicationType = document.getElementById("publication-type").value;
  const authorDiv = document.getElementById("author-div");
  const categoryDiv = document.getElementById("category-div");

  // Show/Hide fields based on the publication type
  if (publicationType === "Research Paper") {
    authorDiv.style.display = "none";
    categoryDiv.style.display = "block";
  } else if (publicationType === "Book" || publicationType === "Book Chapter") {
    categoryDiv.style.display = "none";
    authorDiv.style.display = "block";
  } else {
    authorDiv.style.display = "none";
    categoryDiv.style.display = "none";
  }
}

function toggleOtherCategoryInput() {
  const categorySelect = document.getElementById("category-select").value;
  const otherCategoryDiv = document.getElementById("other-category-div");
  
  // Show the "Other" input field if "Other" is selected
  if (categorySelect === "Other") {
    otherCategoryDiv.style.display = "block";
  } else {
    otherCategoryDiv.style.display = "none";
  }
}