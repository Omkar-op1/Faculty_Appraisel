const t=5;

document.addEventListener('DOMContentLoaded', () => {
  // Fetch data when the page loads
  fetchData();
});



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
      <td>${entry.activity || 'N/A'}</td>
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
const modal = document.getElementById('modal');
const facultyForm = document.getElementById('facultyForm');
const entriesTableBody = document.getElementById('entriesTableBody');
const scoreObtained = document.getElementById('scoreObtained');
const token = localStorage.getItem('authToken'); 
// Initialize table
// function renderTable() {
//   entriesTableBody.innerHTML = entries
//     .map((entry, index) => {
//       return `
//         <tr>
//           <td>${index + 1}</td>
//           <td>${entry.semester}</td>
//           <td>${entry.activity}</td>
//           <td><button class="view-btn" onclick="viewDocument(${entry.id})">View</button></td>
//           <td>5</td> <!-- Fixed 5 points for each entry -->
//           <td><button class="remove-btn" onclick="removeEntry(${entry.id})">Remove</button></td>
//         </tr>
//       `;
//     })
//     .join('');

//   // Calculate the final score based on the number of entries
//   calculateFinalScore();
// }

// Modal functions
function openModal() {
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  resetForm();
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Form handling
async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target); 
  formData.append('t', '5');
  const formDataObj = {};
  
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      formDataObj['score']=5;
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
        return data;
    
      } catch (error) {
        // Log and display the error
        console.error('Error during fetch:', error.message);
        alert(`An error occurred: ${error.message}`);
      }
    

  // const newEntry = {
  //   id: entries.length + 1,
  //   semester: formData.get('semester'),
  //   activity: formData.get('activity'),
  //   supportingDocument: formData.get('supportingDocument'),
  // };

  // entries.push(newEntry);
  // renderTable();
  closeModal();
}

function resetForm() {
  facultyForm.reset();
}

// function removeEntry(id) {
//   if (confirm('Are you sure you want to remove this entry?')) {
//     entries = entries.filter((entry) => entry.id !== id);
//     renderTable();
//   }
// }

// function viewDocument(id) {
//   alert('Document viewer will be implemented here');
// }

// // Calculate final score with a maximum of 20 points
// function calculateFinalScore() {
//   const totalMarks = Math.min(entries.length * 5, 10); // Cap total score at 20
//   scoreObtained.value = totalMarks.toFixed(2); // Display the calculated score
// }

// Initialize the table on page load
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