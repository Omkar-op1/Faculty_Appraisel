const t=4;

document.addEventListener('DOMContentLoaded', () => {
  // Fetch data when the page loads
  fetchData();
});

async function fetchdata1() {

  const response = await fetch('http://localhost:5000/api/get-details', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

}

async function fetchData() {
  try {
    // Replace with your actual backend API endpoint
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
    row.setAttribute('data-id', entry._id);


    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${entry.semester || 'N/A'}</td>
      <td>${entry.subjectCode || 'N/A'}</td>
      <td>${entry.subjectName || 'N/A'}</td>
      <td>${entry.noRegisteredStudents || 'N/A'}</td>
      <td>${entry.noPassedStudents || 'N/A'}</td>
      <td>${entry.result || 'N/A'}</td>
      <td>${entry.document || 'N/A'}</td>
      <td class="score">${entry.score || 0}</td>
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
// Initialize table
// function renderTable() {
//   entriesTableBody.innerHTML = entries
//     .map((entry, index) => {
//       const result =
//         entry.noRegisteredStudents > 0
//           ? (entry.noPassedStudents / entry.noRegisteredStudents) * 100
//           : 0;

//       let points = 0;
//       if (result >= 96) points = 10;
//       else if (result >= 90) points = 9;
//       else if (result >= 80) points = 8;
//       else if (result >= 70) points = 7;
//       else if (result >= 60) points = 6;
//       else if (result >= 50) points = 5;
//       else if (result >= 40) points = 4;

//       return `
//         <tr>
//           <td>${index + 1}</td>
//           <td>${entry.semester}</td>
//           <td>${entry.subjectCode}</td>
//           <td>${entry.subjectName}</td>
//           <td>${entry.noRegisteredStudents}</td>
//           <td>${entry.noPassedStudents}</td>
//           <td>${result.toFixed(2)}</td>
//           <td><button class="view-btn" onclick="viewDocument(${entry.id})">View</button></td>
//           <td>${points}</td>
//           <td><button class="remove-btn" onclick="removeEntry(${entry.id})">Remove</button></td>
//         </tr>
//       `;
//     })
//     .join("");

//   // Calculate final score
//   calculateFinalScore();
// }

// Modal functions
function openModal() {
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  resetForm();
}

// Close modal when clicking outside
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Form handling
async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  formData.append('t', '4');
  const formDataObj = {};

  const noRegisteredStudents = parseInt(formData.get('noRegisteredStudents'));
  const noPassedStudents = parseInt(formData.get('noPassedStudents'));

  const result =calculateResult(noRegisteredStudents,noPassedStudents).toFixed(2);
  const score=calculatescore(result);
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      console.log(result);
      formDataObj['score']=score;
      formDataObj['result']=result;
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
    
  // const newEntry = {
  //   id: entries.length + 1,
  //   semester: formData.get("semester"),
  //   subjectCode: formData.get("subjectCode"),
  //   subjectName: formData.get("subjectName"),
  //   noRegisteredStudents: parseInt(formData.get("noRegisteredStudents")) || 0,
  //   noPassedStudents: parseInt(formData.get("noPassedStudents")) || 0,
  // };

  // entries.push(newEntry);
  // renderTable();
  closeModal();
}

function resetForm() {
  facultyForm.reset();
}

function removeEntry(id) {
  if (confirm("Are you sure you want to remove this entry?")) {
    entries = entries.filter((entry) => entry.id !== id);
    renderTable();
  }
}

// function viewDocument(id) {
//   alert("Document viewer will be implemented here");
// }

// // Calculate final score
function calculateResult(noRegisteredStudents,noPassedStudents) {
  let totalPoints = 0;

    const result =
      noRegisteredStudents > 0? (noPassedStudents / noRegisteredStudents) * 100: 0;

    
    
  return result;


}
function calculatescore(result)
{
let points = 0;
    if (result >= 96) points = 10;
    else if (result >= 90) points = 9;
    else if (result >= 80) points = 8;
    else if (result >= 70) points = 7;
    else if (result >= 60) points = 6;
    else if (result >= 50) points = 5;
    else if (result >= 40) points = 4;
return points;
}
//   const finalScore =
//     entries.length > 0 ? (totalPoints / (entries.length * 10)) * 10 : 0;
//   scoreObtained.value = finalScore.toFixed(2);
// }

// // Initialize the table on page load
// renderTable();

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