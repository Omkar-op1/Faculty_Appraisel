const t=6;
document.addEventListener('DOMContentLoaded', () => {
  fetchData();
});

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
function calculatescore(data)
{
  const c=data['category'];
  let score=0;
  if(c==='SCI'){
     score=5;
  }
  else if(c==='Scopus'){
     score=4;

}
  else if(c==='Scopus Indexed'){
       score=3;


  }
  else if(c==='SCI'){
     score=2;

  }
  else if(c==='WOS'){
     score=2;

}
  else if(c==='UGC Recognized'){
     score=1.5;
    

}
  else{
     score=1;

}
return score;
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

// Remove an entry
function removeEntry(id) {
  if (confirm("Are you sure you want to remove this entry?")) {
    entries = entries.filter((entry) => entry.id !== id);
    renderTable();
  }
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