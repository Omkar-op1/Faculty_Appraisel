document.addEventListener('DOMContentLoaded', () => {
  const formBuilder = document.getElementById('formBuilder');
  const addSectionBtn = document.getElementById('addSectionBtn');
  const sectionTemplate = document.getElementById('sectionTemplate');
  const fieldTemplate = document.getElementById('fieldTemplate');
  const submitBtn = document.getElementById('submitBtn');
  const token = localStorage.getItem('authToken'); 

  // Add Section functionality
  addSectionBtn.addEventListener('click', () => {
      const newSection = sectionTemplate.content.cloneNode(true);
      const deleteBtn = newSection.querySelector('.delete-section-btn');
      const addFieldBtn = newSection.querySelector('.add-field-btn');
      const fieldsContainer = newSection.querySelector('.fields-container');

      // Delete Section functionality
      deleteBtn.addEventListener('click', (e) => {
          e.target.closest('.section').remove();
      });
      const score = newSection.getElementById('score-type');
      const scoreb = newSection.getElementById('scorebox');
      score.addEventListener('change', (e) => {
        scoreb.classList.toggle('hidden', false);
    });
      // Add Field functionality
      addFieldBtn.addEventListener('click', () => {
          const newField = fieldTemplate.content.cloneNode(true);
          const deleteFieldBtn = newField.querySelector('.delete-field-btn');
          const fieldType = newField.querySelector('.field-type');
          const fieldOptions = newField.querySelector('.field-options');

          // Show/hide options based on field type
          fieldType.addEventListener('change', (e) => {
              fieldOptions.classList.toggle('hidden', e.target.value !== 'select' && e.target.value !== 'radio');
          });

          // Delete Field functionality
          deleteFieldBtn.addEventListener('click', (e) => {
              e.target.closest('.field').remove();
          });

          fieldsContainer.appendChild(newField);
      });

      formBuilder.appendChild(newSection);
  });

  // Collect data and send to server
  submitBtn.addEventListener('click', () => {
      const sections = [];
      const sectionElements = formBuilder.querySelectorAll('.section');

      sectionElements.forEach(section => {
          const sectionTitle = section.querySelector('.section-title').textContent.trim();
          const fields = [];
          const fieldElements = section.querySelectorAll('.field');

          fieldElements.forEach(field => {
              const label = field.querySelector('.field-label').value.trim();
              const type = field.querySelector('.field-type').value;
              const options = field.querySelector('.field-options').value.split(',').map(opt => opt.trim()).filter(opt => opt);

              fields.push({ label, type, options });
          });

          sections.push({ title: sectionTitle, fields });
      });
console.log(sections);
      // Send data to server
      fetch('http://localhost:5000/api/formbuilder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
            'Authorization': token,
           },
          body: JSON.stringify({ sections })
      })
      .then(response => response.json())
      .then(data => {
          console.log('Form saved successfully:', data);
      })
      .catch(error => {
          console.error('Error saving form:', error);
      });
  });

  // Sample section creation on page load
  addSectionBtn.click();
});
