// let entries = [];
document.addEventListener('DOMContentLoaded', () => {
  // Fetch data when the page loads
  fetchTeachingProcessData();
});
const t=1;

const modal = document.getElementById('modal');
const facultyForm = document.getElementById('facultyForm');
const entriesTableBody = document.getElementById('entriesTableBody');
const scoreObtained = document.getElementById('scoreObtained');
const studentFeedback = document.getElementById('studentFeedback');
const token = localStorage.getItem('authToken'); 

// function renderTable() {
//   entriesTableBody.innerHTML = entries
//     .map((entry, index) => {
      
//       const percentage =entry.studentFeedback;
//       let points = 0;
//       if (percentage >= 96) points = 10;
//     else if (percentage >= 90) points = 9;
//     else if (percentage >= 80) points = 8;
//     else if (percentage >= 70) points = 7;
//     else if (percentage >= 60) points = 6;
//     else if (percentage >= 50) points = 5;
//     else if (percentage >= 40) points = 4;
//     else if (percentage >= 30) points = 3;
//     else if (percentage >= 20) points = 2;
//     else if (percentage >= 10) points = 1;
//     else if (percentage >= 0) points = 0;
//       return `
//         <tr>
//             <td>${index + 1}</td>
//             <td>${entry.semester}</td>
//             <td>${entry.subjectCode}</td>
//             <td>${entry.subjectName}</td>
//             <td>${entry.studentFeedback}</td>
//             <td><button class="view-btn" onclick="viewDocument(${entry.id})">View</button></td>
//             <td>${points}</td>
//             <td><button class="remove-btn" onclick="removeEntry(${entry.id})">Remove</button></td>
//         </tr>
//       `;
//     })
//     .join('');
  
//   calculateFinalScore();
// }

function openModal() {
  modal.classList.remove('hidden');
}
function closeModal() {
  modal.classList.add('hidden');
  resetForm();
}

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const fileInput = document.getElementById('fileInput');
  console.log(fileInput.files[0])

  const formDataObj = {};

   formData.append('t', 1);
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });

      console.log(formDataObj)


      const file=fileInput.files[0];

      const FL = new FormData();
      FL.append('file', file);

      










      const per=formDataObj.studentFeedback;
      let points=0;
      if (per >= 96) points = 10;
      else if (per >= 90) points = 9;
      else if (per >= 80) points = 8;
      else if (per >= 70) points = 7;
      else if (per >= 60) points = 6;
      else if (per >= 50) points = 5;
      else if (per >= 40) points = 4;
      else if (per >= 30) points = 3;
      else if (per >= 20) points = 2;
      else if (per >= 10) points = 1;
      else if (per >= 0) points = 0;

      formDataObj['score']=points;
      try {
        const response = await fetch('http://localhost:5000/api/add-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
          body: JSON.stringify(formDataObj),
        });
        
        if (!response.ok) {
          const errorBody = await response.json(); 
          console.error("Error details:", errorBody);
          
          const errorMessage = errorBody.error || errorBody.message || `Error: ${response.status} - ${response.statusText}`;
          throw new Error(errorMessage);
        }
        const data = await response.json();
        console.log("Response received:", data);
      const R = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: FL,
        headers: {
          'Authorization': token,
        },
       

    });
     console.log(f);
    alert('Details added successfully!');
} catch (error) {
        
        console.error('Error during fetch:', error.message);
        alert(`An error occurred: ${error.message}`);
      }
  // const newEntry = {
  //   id: entries.length + 1,
  //   semester: formData.get('semester'),
  //   subjectCode: formData.get('subjectCode'),
  //   subjectName: formData.get('subjectName'),
  //   studentFeedback: parseInt(formData.get('studentFeedback')) || 0, 
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

// function calculateFinalScore() {
//   let totalPoints = 0;
//   entries.forEach((entry) => {
//     const percentage =entry.studentFeedback;
//     let points = 0;
//     if (percentage >= 96) points = 10;
//     else if (percentage >= 90) points = 9;
//     else if (percentage >= 80) points = 8;
//     else if (percentage >= 70) points = 7;
//     else if (percentage >= 60) points = 6;
//     else if (percentage >= 50) points = 5;
//     else if (percentage >= 40) points = 4;
//     else if (percentage >= 30) points = 3;
//     else if (percentage >= 20) points = 2;
//     else if (percentage >= 10) points = 1;
//     else if (percentage >= 0) points = 0;
//     totalPoints += points;
//   });
//   const finalScore = entries.length > 0 ? (totalPoints / (entries.length * 10)) * 20 : 0;
//   scoreObtained.value = finalScore.toFixed(2);
// }

// renderTable();

async function fetchTeachingProcessData() {
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
    populateTable(data.key); // Call function to populate table
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
function populateTable(data) {
  const tableBody = document.getElementById('entriesTableBody');
  tableBody.innerHTML = ''; // Clear previous entries, if any

  data.forEach((entry, index) => {
    const row = document.createElement('tr');
    row.setAttribute('data-id', entry._id);
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${entry.semester || 'N/A'}</td>
      <td>${entry.subjectCode || 'N/A'}</td>
      <td>${entry.subjectName || 'N/A'}</td>
      <td>${entry.studentFeedback}%</td>
      <td>-</td>
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

// // Helper function to calculate feedback percentage
// function calculateFeedbackPercentage(entry) {
//   // Assuming attainment is a percentage, return it directly
//   return entry.attainment || 'N/A';
// }

// // Helper function to handle supporting document logic
// function getSupportingDocument(entry) {
//   // Placeholder logic; replace with your actual implementation
//   return `<a href="/documents/${entry.subjectCode}" target="_blank">View</a>`;
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