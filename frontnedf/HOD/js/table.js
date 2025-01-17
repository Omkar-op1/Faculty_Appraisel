export function setupTable(facultyData) {
    const tableBody = document.getElementById('facultyTableBody');

    function renderTable(data) {
        tableBody.innerHTML = '';
        
        data.forEach(faculty => {
            const row = document.createElement('tr');
            const submittedDate = new Date(faculty.submittedAt).toLocaleDateString();
            const statusClass = faculty.endorsed ? 'status-endorsed' : 'status-pending';
            const statusText = faculty.endorsed ? 'Endorsed' : 'Pending';
            
            row.innerHTML = `
                <td>${faculty.id}</td>
                <td>${faculty.name}</td>
                <td>${faculty.loginId}</td>
                <td>
                    <button class="view-btn">View</button>
                </td>
                <td>${faculty.score}</td>
                <td>${submittedDate}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>
                    <button class="download-btn">
                        <i class="fas fa-download"></i>
                    </button>
                </td>
            `;

            row.querySelector('.view-btn').addEventListener('click', () => {
                viewAppraisalForm(faculty);
            });

            row.querySelector('.download-btn').addEventListener('click', () => {
                downloadAppraisalForm(faculty);
            });

            tableBody.appendChild(row);
        });
    }

    function viewAppraisalForm(faculty) {
        // Implement view functionality
        console.log(`Viewing appraisal form for ${faculty.name}`);
    }

    function downloadAppraisalForm(faculty) {
        // Implement download functionality
        console.log(`Downloading appraisal form for ${faculty.name}`);
    }

    facultyData.addChangeListener(renderTable);
    renderTable(facultyData.data);
}