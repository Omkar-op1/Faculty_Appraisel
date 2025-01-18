import { FacultyData } from './data.js';
import { setupFilters } from './filters.js';
import { setupTable } from './table.js';
import { setupChatWidget } from './chat.js';

document.addEventListener('DOMContentLoaded', () => {
    const facultyData = new FacultyData();
    setupFilters(facultyData);
    setupTable(facultyData);
    setupChatWidget();
});