document.addEventListener('DOMContentLoaded', () => {
  const facultyTableBody = document.getElementById('facultyTableBody');
  
  
  });

const token = localStorage.getItem('authToken'); 


  async function download(index) {
    const tableBody = document.getElementById('facultyTableBody');
        const row = tableBody.rows[index];
        const entryId = row.getAttribute('data-id');

        const controller = new AbortController(); const signal = controller.signal; const timeout = setTimeout(() => controller.abort(), 30000);
  
        // try {
          const response = await fetch(`http://localhost:5000/api/download/${entryId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            }, 
          });

            // Option 1: Fetch API Method
            fetch(`http://localhost:5000/api/download/${entryId}`)
              .then(response => {
                // Check if the response is successful
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.blob();
              })
              .then(blob => {
                // Create a link element
                const link = document.createElement('a');
                
                // Create a blob URL
                const url = window.URL.createObjectURL(blob);
                
                // Set link attributes
                link.href = url;
                link.download = 'document.pdf';
                
                // Append to body, click, and remove
                document.body.appendChild(link);
                link.click();
                
                // Clean up
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
              })
              .catch(error => {
                console.error('Download error:', error);
                // Optionally show user-friendly error message
                alert('Failed to download PDF');
              });
      

          clearTimeout(timeout);
          if (!response.ok) {
            const errorBody = await response.json();
            console.error('Error details:', errorBody);
            const errorMessage = errorBody.error || errorBody.message || `Error: ${response.status} - ${response.statusText}`;
            throw new Error(errorMessage);
          }
      
          const blob = await response.blob(); 
          const url = window.URL.createObjectURL(blob); 
          const a = document.createElement('a'); 
          a.href = url; 
          a.download = `Faculty_Report_${entryId}.pdf`;  
          document.body.appendChild(a); 
          a.click();
          a.remove();
  
        }
      
  
// Fetch data and populate table

  async function fetchFacultyData() {
    try {
      const response = await fetch('http://localhost:5000/api/get-all-faculty');
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      console.log(data);
      populateTable(data);
    } catch (error) {
      console.error('Failed to fetch faculty data:', error);
    }
  }

  function populateTable(facultyData) {
    facultyTableBody.innerHTML = ''; // Clear previous content

    if (facultyData.length === 0) {
      facultyTableBody.innerHTML = '<tr><td colspan="8">No data available</td></tr>';
      return;
    }

    facultyData.forEach((faculty, index) => {
      const row = document.createElement('tr');
      row.setAttribute('data-id', faculty._id);
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${faculty.firstName} ${faculty.lastName}</td>
        <td>${faculty.facultyId}</td>
        <td> <button class="view-btn" data-id="${faculty.facultyId}"><a href="view.html">View</a></button></td>
        <td>${faculty.score || "-"}</td>
        <td>${new Date(faculty.createdAt).toLocaleDateString()}</td>
         <td><span class="status-badge status-pending">pending</span></td>
       <td>
                    <button class="download-btn"  >
                        <i class="fas fa-download"></i>
                    </button>
                </td>
      `;
      facultyTableBody.appendChild(row);
      const downloadButton = row.querySelector('.download-btn');
      downloadButton.addEventListener('click', () => download(index));
    
    });
  }


  document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', event => {
      event.stopPropagation(); // Prevent any other event interference
      const facultyId = button.getAttribute('data-id');
      // Redirect to the faculty view page
      window.location.href = `/faculty/view/${facultyId}`;
    });
  });

  // Fetch data when the page loads
  fetchFacultyData();

