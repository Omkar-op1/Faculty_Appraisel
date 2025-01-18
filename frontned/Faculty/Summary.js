async function fetchData() {
    try {
      const response = await fetch('http://localhost:5000/api/get-details1', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,

        },
      });
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      console.log(data);
      populateTable(data);
      getscore(); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
}