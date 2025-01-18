import { debounce } from './utils.js';

export function setupFilters(facultyData) {
    const searchInput = document.querySelector('.search-input');
    const sortOptions = document.getElementById('sortOptions');
    const departmentFilter = document.getElementById('departmentFilter');
    const submittedAtFilter = document.getElementById('submittedAtFilter');
    const endorseFilter = document.getElementById('endorseFilter');
    const activeFiltersContainer = document.getElementById('activeFilters');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    let activeFilters = {
        search: '',
        sortBy: '',
        departments: new Set(),
        submittedAt: '',
        endorsed: undefined
    };

    // Setup dropdowns
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropdown-btn');
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdowns.forEach(d => {
                if (d !== dropdown) d.classList.remove('active');
            });
            dropdown.classList.toggle('active');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    });

    // Debounced search handler
    const debouncedSearch = debounce((value) => {
        activeFilters.search = value;
        updateFilterTags();
        updateResults();
    }, 300);

    searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value.trim());
    });

    sortOptions.addEventListener('change', (e) => {
        if (e.target.type === 'radio') {
            activeFilters.sortBy = e.target.value;
            updateFilterTags();
            updateResults();
            e.target.closest('.dropdown').classList.remove('active');
        }
    });

    departmentFilter.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            if (e.target.checked) {
                activeFilters.departments.add(e.target.value);
            } else {
                activeFilters.departments.delete(e.target.value);
            }
            updateFilterTags();
            updateResults();
        }
    });

    submittedAtFilter.addEventListener('change', (e) => {
        if (e.target.type === 'radio') {
            activeFilters.submittedAt = e.target.value;
            updateFilterTags();
            updateResults();
            e.target.closest('.dropdown').classList.remove('active');
        }
    });

    endorseFilter.addEventListener('change', (e) => {
        if (e.target.type === 'radio') {
            activeFilters.endorsed = e.target.value === 'true';
            updateFilterTags();
            updateResults();
            e.target.closest('.dropdown').classList.remove('active');
        }
    });

    function updateFilterTags() {
        activeFiltersContainer.innerHTML = '';
        let hasFilters = false;

        if (activeFilters.search) {
            addFilterTag(`Search: ${activeFilters.search}`, () => {
                activeFilters.search = '';
                searchInput.value = '';
                updateFilterTags();
                updateResults();
            });
            hasFilters = true;
        }

        if (activeFilters.sortBy) {
            const sortText = activeFilters.sortBy === 'asc' ? 'ID ↑' : 'ID ↓';
            addFilterTag(`Sort: ${sortText}`, () => {
                activeFilters.sortBy = '';
                document.querySelectorAll('input[name="sort"]').forEach(radio => radio.checked = false);
                updateFilterTags();
                updateResults();
            });
            hasFilters = true;
        }

        activeFilters.departments.forEach(dept => {
            addFilterTag(dept, () => {
                activeFilters.departments.delete(dept);
                const checkbox = departmentFilter.querySelector(`input[value="${dept}"]`);
                if (checkbox) checkbox.checked = false;
                updateFilterTags();
                updateResults();
            });
            hasFilters = true;
        });

        if (activeFilters.submittedAt) {
            const submittedText = {
                'today': 'Today',
                'this_week': 'This Week',
                'this_month': 'This Month',
                'this_year': 'This Year'
            }[activeFilters.submittedAt];
            
            addFilterTag(`Submitted: ${submittedText}`, () => {
                activeFilters.submittedAt = '';
                document.querySelectorAll('input[name="submitted"]').forEach(radio => radio.checked = false);
                updateFilterTags();
                updateResults();
            });
            hasFilters = true;
        }

        if (activeFilters.endorsed !== undefined) {
            const endorseText = activeFilters.endorsed ? 'Endorsed' : 'Not Endorsed';
            addFilterTag(`Status: ${endorseText}`, () => {
                activeFilters.endorsed = undefined;
                document.querySelectorAll('input[name="endorse"]').forEach(radio => radio.checked = false);
                updateFilterTags();
                updateResults();
            });
            hasFilters = true;
        }

        if (hasFilters) {
            const clearAllButton = document.createElement('button');
            clearAllButton.className = 'clear-all-filters';
            clearAllButton.textContent = 'Clear all filters';
            clearAllButton.addEventListener('click', clearAllFilters);
            activeFiltersContainer.appendChild(clearAllButton);
        }

        activeFiltersContainer.classList.toggle('hidden', !hasFilters);
    }

    function clearAllFilters() {
        activeFilters = {
            search: '',
            sortBy: '',
            departments: new Set(),
            submittedAt: '',
            endorsed: undefined
        };
        searchInput.value = '';
        document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => input.checked = false);
        updateFilterTags();
        updateResults();
    }

    function addFilterTag(text, onRemove) {
        const tag = document.createElement('span');
        tag.className = 'filter-tag';
        tag.innerHTML = `
            ${text}
            <button type="button" aria-label="Remove filter">×</button>
        `;
        tag.querySelector('button').addEventListener('click', onRemove);
        activeFiltersContainer.appendChild(tag);
    }

    function updateResults() {
        const filteredData = facultyData.filterData({
            search: activeFilters.search,
            sortBy: activeFilters.sortBy,
            departments: Array.from(activeFilters.departments),
            submittedAt: activeFilters.submittedAt,
            endorsed: activeFilters.endorsed
        });
        facultyData.notifyListeners(filteredData);
    }
}