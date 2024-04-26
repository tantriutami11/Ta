// Mendapatkan data dari backend dan memperbarui nilai-nilai dalam halaman HTML
fetch('http://localhost:3000/api/v1/multisensor')
  .then(response => response.json())
  .then(data => {
    // Memperbarui nilai "Current Am"
    document.getElementById('current-am').textContent = data.response[0].am;
    
    // Memperbarui nilai "Current DO"
    document.getElementById('current-do').textContent = data.response[0].do;
    
    // Memperbarui nilai "Current PH"
    document.getElementById('current-ph').textContent = data.response[0].ph;
    
    // Memperbarui nilai "Current Temp"
    document.getElementById('current-temp').textContent = data.response[0].temp;

    // Memperbarui nilai "Current A"
    document.getElementById('current-a').textContent = data.response[0].a;
    
    // Memperbarui nilai "Current V"
    document.getElementById('current-v').textContent = data.response[0].v;

    document.getElementById('current-tpanel').textContent = data.response[0].tpanel;
  })
  .catch(error => console.error('Error:', error));