async function fetchData() {
  const t=7;
  const token = localStorage.getItem('authToken'); 

    try {
      const response = await fetch('http://localhost:5000/api/get-details', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
          'type': t,

        },
      });
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      console.log(data);
      console.log(data.i.credits[data.key.designation].A);
      const A = document.getElementById('A');
    A.textContent=(data.i.credits[data.key.designation].A)*100;
    const B = document.getElementById('B');
    B.textContent=(data.i.credits[data.key.designation].B)*100;
    const C = document.getElementById('C');
    C.textContent=(data.i.credits[data.key.designation].C)*100;
    const D = document.getElementById('D');
    D.textContent=(data.i.credits[data.key.designation].D)*100;
    const E = document.getElementById('E');
    E.textContent=(data.i.credits[data.key.designation].E)*100;
    const F = document.getElementById('F');
    F.textContent=(data.i.credits[data.key.designation].F)*100;
    const G = document.getElementById('G');
    G.textContent=(data.i.credits[data.key.designation].G)*100;
    const A1 = document.getElementById('A1');
    A1.textContent=data.key.A;
    const B1 = document.getElementById('B1');
    B1.textContent=data.key.B;
    const C1 = document.getElementById('C1');
    C1.textContent=data.key.C;
    const D1 = document.getElementById('D1');
    D1.textContent=data.key.D;
    const E1 = document.getElementById('E1');
    E1.textContent=data.key.E;
    const F1 = document.getElementById('F1');
    F1.textContent=data.key.F;
    const G1 = document.getElementById('G1');
    G1.textContent=data.key.G;
    const T = document.getElementById('T');
    const T1 = document.getElementById('T1');
    T1.value=data.key.total;
    T.textContent=data.key.total;
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    


}
document.addEventListener('DOMContentLoaded', () => {
  fetchData();
});