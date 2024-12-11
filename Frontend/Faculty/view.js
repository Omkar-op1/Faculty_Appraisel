const token = localStorage.getItem('authToken'); 



async function fetchFacultyData() {
    try {
        const response = await fetch('http://localhost:5000/api/get-details1', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          });
        const data1 = await response.json();
        const data=data1.faculty;
          console.log(data);
        // Populate the faculty profile
        document.getElementById('facultyName').textContent = data.firstName + " " + data.lastName;
        document.getElementById('facultyId').textContent = data.facultyId;
        document.getElementById('facultyDesignation').textContent = data.designation;

        // Populate the Teaching Process Section
        let teachingScore = 0;
        const teachingTableBody = document.getElementById('teaching-table-body');
        data.teachingProcess.forEach(teaching => {
            teachingTableBody.innerHTML += `
                <tr>
                    <td>${teaching.semester}</td>
                    <td>${teaching.subjectName}</td>
                    <td>${teaching.scheduledClasses}</td>
                    <td>${teaching.actualClasses}</td>
                    <td>${teaching.score}</td>
                </tr>
            `;
            teachingScore += teaching.score;
        });
        document.getElementById('teaching-score').textContent = teachingScore / data.teachingProcess.length;

        // Populate the Student Feedback Section
        let feedbackScore = 0;
        const feedbackTableBody = document.getElementById('feedback-table-body');
        data.studentsFeedback.forEach(feedback => {
            feedbackTableBody.innerHTML += `
                <tr>
                    <td>${feedback.semester}</td>
                    <td>${feedback.subjectName}</td>
                    <td>${feedback.studentFeedback}</td>
                    <td>${feedback.score}</td>
                </tr>
            `;
            feedbackScore += feedback.score;
        });
        document.getElementById('feedback-score').textContent = feedbackScore / data.studentsFeedback.length;

        // Populate the Research & Publications Section
        let researchScore = 0;
        const researchTableBody = document.getElementById('research-table-body');
        data.research.forEach(research => {
            researchTableBody.innerHTML += `
                <tr>
                    <td>${research.research}</td>
                    <td>${research.publicationName}</td>
                    <td>${research.category}</td>
                    <td>${research.score}</td>
                </tr>
            `;
            researchScore += research.score;
        });
        document.getElementById('research-score').textContent = researchScore / data.research.length;

        // Populate the Institutional Contributions Section
        let institutionalScore = 0;
        const institutionalTableBody = document.getElementById('institutional-table-body');
        data.instituteActivities.forEach(activity => {
            institutionalTableBody.innerHTML += `
                <tr>
                    <td>${activity.activity}</td>
                    <td>${activity.criteria}</td>
                    <td>${activity.semester}</td>
                    <td>${activity.score}</td>
                </tr>
            `;
            institutionalScore += activity.score;
        });
        document.getElementById('institutional-score').textContent = institutionalScore / data.instituteActivities.length;
    } catch (error) {
        console.error('Error fetching faculty data:', error);
    }
}

// Call the function when the page loads
window.onload = fetchFacultyData;