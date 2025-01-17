

// Fetch data and populate table
document.addEventListener('DOMContentLoaded', () => {
    const facultyTableBody = document.getElementById('facultyTableBody');
  
    
  
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
  
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${faculty.firstName +" "+ faculty.lastName}</td>
          <td>${faculty.facultyId}</td>
          <td>${faculty.appraisalForms}</td>
          <td>${faculty.score}</td>
          <td>${new Date(faculty.submittedAt).toLocaleDateString()}</td>
          <td>${faculty.status ? 'Endorsed' : 'Not Endorsed'}</td>
          <td>
            <a href="${faculty.downloadUrl}" target="_blank" class="download-link">Download</a>
          </td>
        `;
  
        facultyTableBody.appendChild(row);
      });
    }
  
    // Fetch data when the page loads
    fetchFacultyData();
  });
  

  