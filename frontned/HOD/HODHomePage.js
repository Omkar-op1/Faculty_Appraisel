
        // Dropdown Toggle
        document.getElementById('userDropdown').addEventListener('click', function() {
            document.getElementById('dropdownMenu').classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('#userDropdown')) {
                document.getElementById('dropdownMenu').classList.remove('active');
            }
        });

        // Sample data for recent submissions
        const recentSubmissionsData = [
            { name: 'Dr. Sarah Johnson', department: 'Computer Science', status: 'Approved' },
            { name: 'Prof. Michael Chen', department: 'Physics', status: 'Pending' },
            { name: 'Dr. Emily Brown', department: 'Mathematics', status: 'Under Review' }
        ];

        // Populate recent submissions table
        function populateRecentSubmissions() {
            const tbody = document.getElementById('recentSubmissions');
            tbody.innerHTML = recentSubmissionsData.map(submission => `
                <tr>
                    <td>${submission.name}</td>
                    <td>${submission.department}</td>
                    <td>${submission.status}</td>
                </tr>
            `).join('');
        }

        // System status update
        function updateSystemStatus() {
            const systemStatus = document.getElementById('systemStatus');
            systemStatus.innerHTML = `
                <p>Last System Update: ${new Date().toLocaleDateString()}</p>
                <p>Active Users: 45</p>
                <p>System Performance: Optimal</p>
            `;
        }

        // Quick Action Functions
        function generateReport() {
            alert('Generating comprehensive report...');
        }

        function reviewPending() {
            alert('Opening pending reviews...');
        }

        function manageFaculty() {
            alert('Opening faculty management...');
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            populateRecentSubmissions();
            updateSystemStatus();
        });

        // Optional: Add a chart using a charting library
        // You would need to include a charting library like Chart.js
        // and initialize it here
    
