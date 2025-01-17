export class FacultyData {
    constructor() {
        this.data = [
            { id: 1, name: 'Anushree Khadgi', loginId: '10301', score: 900, department: 'Computer Engineering', submittedAt: '2024-02-15', endorsed: true },
            { id: 2, name: 'Isha Patel', loginId: '10302', score: 500, department: 'Computer Engineering', submittedAt: '2024-02-14', endorsed: false },
            { id: 3, name: 'Aarav Sharma', loginId: '10303', score: 800, department: 'Electrical Engineering', submittedAt: '2024-02-13', endorsed: true },
            { id: 4, name: 'Aditya Nair', loginId: '10304', score: 850, department: 'Mechanical Engineering', submittedAt: '2024-02-12', endorsed: false },
            { id: 5, name: 'Siddharth Iyer', loginId: '10305', score: 450, department: 'Computer Engineering', submittedAt: '2024-02-11', endorsed: true },
            { id: 6, name: 'Pooja Chauhan', loginId: '10306', score: 510, department: 'Electrical Engineering', submittedAt: '2024-02-10', endorsed: false },
            { id: 7, name: 'Rahul Verma', loginId: '10307', score: 550, department: 'Mechanical Engineering', submittedAt: '2024-02-09', endorsed: true },
        ];
        this.listeners = [];
    }

    addChangeListener(callback) {
        this.listeners.push(callback);
    }

    notifyListeners(data) {
        this.listeners.forEach(callback => callback(data || this.data));
    }

    filterData(filters) {
        let filteredData = [...this.data];

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filteredData = filteredData.filter(item => 
                item.name.toLowerCase().includes(searchTerm) ||
                item.loginId.includes(searchTerm)
            );
        }

        if (filters.departments && filters.departments.length > 0) {
            filteredData = filteredData.filter(item => 
                filters.departments.includes(item.department)
            );
        }

        if (filters.submittedAt) {
            const today = new Date();
            switch (filters.submittedAt) {
                case 'today':
                    filteredData = filteredData.filter(item => 
                        new Date(item.submittedAt).toDateString() === today.toDateString()
                    );
                    break;
                case 'this_week':
                    const weekAgo = new Date(today.setDate(today.getDate() - 7));
                    filteredData = filteredData.filter(item => 
                        new Date(item.submittedAt) >= weekAgo
                    );
                    break;
                case 'this_month':
                    const monthAgo = new Date(today.setMonth(today.getMonth() - 1));
                    filteredData = filteredData.filter(item => 
                        new Date(item.submittedAt) >= monthAgo
                    );
                    break;
                case 'this_year':
                    const yearStart = new Date(today.getFullYear(), 0, 1);
                    filteredData = filteredData.filter(item => 
                        new Date(item.submittedAt) >= yearStart
                    );
                    break;
            }
        }

        if (filters.endorsed !== undefined) {
            filteredData = filteredData.filter(item => 
                item.endorsed === filters.endorsed
            );
        }

        if (filters.sortBy) {
            filteredData.sort((a, b) => {
                if (filters.sortBy === 'asc') {
                    return a.loginId.localeCompare(b.loginId);
                } else {
                    return b.loginId.localeCompare(a.loginId);
                }
            });
        }

        return filteredData;
    }
}