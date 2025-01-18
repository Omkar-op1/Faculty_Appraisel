document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    function openTab(tabName){
        // Hide all tabs
        tabContents.forEach(tab => tab.classList.remove('active'));
        
        // Remove active class from all buttons
        tabButtons.forEach(button => button.classList.remove('active'));
        
        // Show the clicked tab's content
        const activeTab = document.getElementById(tabName);
        activeTab.classList.add('active');
        
        // Add active class to the clicked button
        const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
        activeButton.classList.add('active');

        // Scroll to the active tab
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            openTab(tabName);
        });
    });

    // Open the first tab by default
    openTab('teaching');

    // Recommendation tab functionality

    const observationTabs = document.querySelectorAll('.observation-tabs button');
  
    const textareaObservation = document.getElementById('textarea-observation');
    const textareaRecommendation = document.getElementById('textarea-recommendation');
    const fileUploadContainer = document.getElementById('file-upload-container');
    

    observationTabs.forEach(button => {
        button.addEventListener('click', function () {
            observationTabs.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            textareaObservation.style.display = 'none';
            textareaRecommendation.style.display = 'none';
            fileUploadContainer.style.display = 'none';

            if (this.id === 'observation-btn') {
                textareaObservation.style.display = 'block';
            } else if (this.id === 'recommendation-btn') {
                textareaRecommendation.style.display = 'block';
            } else if (this.id === 'file-upload-btn') {
                fileUploadContainer.style.display = 'block';
            }
        });
    });

    // Show Observations textarea by default
    document.getElementById('observation-btn').click();
    

    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
          // Remove 'active' class from all buttons
          document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
          // Add 'active' class to clicked button
          button.classList.add('active');
    
          // Hide all tab contents
          document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
          // Show the corresponding tab content
          const target = button.getAttribute('data-target');
          document.getElementById(target).classList.add('active');
        });
      });
    
        // Hide all sections initially
        const hideAllSections = () => {
            for (const section in sections) {
                sections[section].style.display = 'none';
            }
        };
    
        // Event listener for tab buttons
        tabButtons.forEach((button) => {
            button.addEventListener('click', function () {
                tabButtons.forEach((btn) => btn.classList.remove('active'));
                this.classList.add('active');
    
                hideAllSections();
                const tabName = this.textContent.trim();
                if (sections[tabName]) {
                    sections[tabName].style.display = 'block';
                }
            });
        });
    
        // Trigger the first tab to be displayed by default
        hideAllSections();
        sections["Recommendation"].style.display = 'block';
    });
    

    


    // Action buttons functionality (placeholder)
    const actionButtons = document.querySelectorAll('.actions button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log(`${this.textContent} button clicked`);
            // Add actual functionality here
        });
    });

    // View and Edit button functionality (placeholder)
    const viewButtons = document.querySelectorAll('.view-button');
    const editButtons = document.querySelectorAll('.edit-button');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('View button clicked');
            // Add actual view functionality here
        });
    });

    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Edit button clicked');
            // Add actual edit functionality here
        });
    });

