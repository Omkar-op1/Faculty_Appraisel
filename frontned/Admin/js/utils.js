export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export function sortByLoginId(data, direction = 'asc') {
    return [...data].sort((a, b) => {
        const comparison = a.loginId.localeCompare(b.loginId);
        return direction === 'asc' ? comparison : -comparison;
    });
}

export function filterByDepartments(data, departments) {
    if (!departments.length) return data;
    return data.filter(item => departments.includes(item.department));
}

export function searchFaculty(data, term) {
    if (!term) return data;
    const searchTerm = term.toLowerCase();
    return data.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.loginId.includes(searchTerm)
    );
}