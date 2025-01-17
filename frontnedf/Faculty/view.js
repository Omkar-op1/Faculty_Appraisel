const token = localStorage.getItem('authToken'); 



function getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        facultyId: urlParams.get('facultyId'),
    };
}

async function fetchFacultyData() {
    try {
        const { facultyId } = getQueryParams();
        if (!facultyId) {
            throw new Error('Faculty ID is missing in the URL.');
        }

        const response = await fetch(`http://localhost:5000/api/get-details1?facultyId=${facultyId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch faculty data.');
        }

        const data1 = await response.json();
        const data = data1.faculty;
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
document.addEventListener('DOMContentLoaded', function() {
    const recommendedRadio = document.getElementById('recommended');
    const nonRecommendedRadio = document.getElementById('non-recommended');
    const recommendedSection = document.getElementById('recommended-section');
    const nonRecommendedSection = document.getElementById('non-recommended-section');

    // Handle main choice visibility
    recommendedRadio.addEventListener('change', function() {
        recommendedSection.style.display = 'block';
        nonRecommendedSection.style.display = 'none';
    });

    nonRecommendedRadio.addEventListener('change', function() {
        recommendedSection.style.display = 'none';
        nonRecommendedSection.style.display = 'block';
    });

    // Handle scale value display
    const performanceScale = document.getElementById('performance-scale');
    const potentialScale = document.getElementById('potential-scale');
    const performanceValue = document.getElementById('performance-value');
    const potentialValue = document.getElementById('potential-value');

    performanceScale.addEventListener('input', function() {
        performanceValue.textContent = this.value;
    });

    potentialScale.addEventListener('input', function() {
        potentialValue.textContent = this.value;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const scaleContainer = document.getElementById("recommendation-scale");

    // Generate the scale circles dynamically
    for (let i = 0; i <= 10; i++) {
        const circle = document.createElement("div");
        circle.classList.add("circle");
        circle.textContent = i;
        circle.dataset.value = i; // Store the value for reference
        scaleContainer.appendChild(circle);

        // Add click event to handle selection
        circle.addEventListener("click", function () {
            // Remove active state from all circles
            document.querySelectorAll(".circle").forEach((c) => c.classList.remove("active", "low", "mid", "high"));

            // Add active class and color based on value
            const value = parseInt(this.dataset.value);
            this.classList.add("active");
            if (value <= 4) {
                this.classList.add("low"); // Red for low scores
            } else if (value <= 7) {
                this.classList.add("mid"); // Orange for medium scores
            } else {
                this.classList.add("high"); // Green for high scores
            }
        });
    }
});

// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Create scales for each section
  createScale("student-behavior-scale");
  createScale("colleague-behavior-scale");
});

function createScale(containerId) {
  const scaleContainer = document.getElementById(containerId);

  // Clear any previous scale
  scaleContainer.innerHTML = '';

  // Generate the scale circles dynamically (1 to 10)
  for (let i = 1; i <= 10; i++) {
      const circle = document.createElement("div");
      circle.classList.add("circle");
      circle.textContent = i;
      circle.dataset.value = i; // Store the value for reference
      scaleContainer.appendChild(circle);

      // Add click event to handle selection
      circle.addEventListener("click", function () {
          // Remove active state from all circles in this scale
          scaleContainer.querySelectorAll(".circle").forEach((c) => c.classList.remove("selected", "low", "mid", "high"));

          // Add active class and color based on value
          const value = parseInt(this.dataset.value);
          this.classList.add("selected");
          if (value <= 4) {
              this.classList.add("low"); // Red for low scores
          } else if (value <= 7) {
              this.classList.add("mid"); // Orange for medium scores
          } else {
              this.classList.add("high"); // Green for high scores
          }
      });
  }
}

  document.addEventListener("DOMContentLoaded", function () {
    // Get the radio button and the text box
    const nonRecommendedRadio = document.getElementById("non-recommended");
    const nonRecommendedTextBox = document.getElementById("non-recommended-text-box");
  
    // Add an event listener to show the text box when the "Non-Recommended" option is selected
    nonRecommendedRadio.addEventListener("change", function () {
      if (this.checked) {
        nonRecommendedTextBox.style.display = "block"; // Show the text box
      } else {
        nonRecommendedTextBox.style.display = "none"; // Hide the text box
      }
    });
  });
  document.addEventListener('DOMContentLoaded', function() {
    const recommendedRadio = document.getElementById('recommended');
    const nonRecommendedRadio = document.getElementById('non-recommended');
    const recommendedSection = document.getElementById('recommended-section');
    const nonRecommendedSection = document.getElementById('non-recommended-section');
    const nonRecommendedTextBox = document.getElementById('non-rec-reason'); // New non-recommended reason textbox

    // Handle main choice visibility
    recommendedRadio.addEventListener('change', function() {
        recommendedSection.style.display = 'block';
        nonRecommendedSection.style.display = 'none';
        nonRecommendedTextBox.style.display = 'none'; // Hide the non-recommended textbox when "Recommended" is selected
    });

    nonRecommendedRadio.addEventListener('change', function() {
        recommendedSection.style.display = 'none';
        nonRecommendedSection.style.display = 'block';
        nonRecommendedTextBox.style.display = 'block'; // Show the non-recommended textbox when "Non-Recommended" is selected
    });
});
