// Mendapatkan elemen chart untuk Potential of Hydrogen (PH) dari halaman HTML
var potential = document.getElementById("ph-chart");

// Mendapatkan referensi ke tombol "1 Week", "1 Month", dan "Download"
var dayButton = document.getElementById("day");
var weekButton = document.getElementById("week");
var monthButton = document.getElementById("month");
var downloadButton = document.querySelector(".button-download-ph")

// Mendefenisikan data untuk 1 hari
var dataOneDay = {
  labels: ['08.00', '09.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00'],
  datasets: [{
    label: 'PH',
    data: [6, 6.8, 7, 6.5, 6.9, 7, 8.5, 7.5],
    fill: true,
    borderColor: 'rgb(106, 173, 217)',
    tension: 0.1,
  }]
};

//  Mendefenisikan data untuk 1 Minggu dan 1 Bulan
var dataOneWeek = {
  labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
  datasets: [{
    label: 'PH',
    data: [7, 6.5, 6.7, 7.2, 6, 7.8, 7.5],
    fill: true,
    borderColor: 'rgb(106, 173, 217)',
    tension: 0.1,
  }]
};

var dataOneMonth = {
  labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
  datasets: [{
    label: 'PH',
    data: [6.7, 7, 6.5, 7.5], // Data untuk 1 bulan
    fill: true,
    borderColor: 'rgb(106, 173, 217)',
    tension: 0.1,
  }]
};

// Mendefinisikan linechart
var lineChart;

// Membuat line chart saat halaman dimuat pertama kali dengan data satu hari 
document.addEventListener("DOMContentLoaded", function() {
  lineChart = new Chart(potential, {
    type: 'line',
    data: {
      labels: dataOneDay.labels,
      datasets: dataOneDay.datasets,
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'PH'
          }
        },
      }
    }
  });

  // Memperbaharui grafik untuk menampilkan data satu hari saat halaman dimuat
  updateChart(dataOneDay);
});

// Fungsi untuk mengubah data grafik berdasarkan tombol yang ditekan
function updateChart(data) {
  lineChart.data = data;
  lineChart.update()
}

// Menambahkan event listener untuk tombol "daily"
dayButton.addEventListener("click", function() {
  updateChart(dataOneDay);
});

// Menambahkan event listener untuk tombol "1 Week"
weekButton.addEventListener("click", function() {
  updateChart(dataOneWeek);
});

// Menambahkan event listener untuk tombol "1 Month"
monthButton.addEventListener("click", function() {
  updateChart(dataOneMonth);
});

// Fungsi untuk mengunduh data dalam format excel
function downloadData(data) {
  // Mendefenisikan label untuk file CVS
  var csvLabels = "Waktu,Hasil Pengukuran\n";

  // Mendefenisikan data untuk file CVS
  var csvData = data.labels.map((label, index) => {
    return label + "," + data.datasets[0].data[index];
  }).join("\n");

  // Gabungkan label dan data CSV
  var csvContent = "data:text/csv;charset=utf-8," + csvLabels + csvData;

  // Proses membuat file Excel dan mengunduhnya
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "PH_data.csv");
  document.body.appendChild(link); // Required for FF

  link.click();
}

// Menambahkan event listener untuk tombol "Download"
downloadButton.addEventListener("click", function() {
  downloadData(lineChart.data);
});