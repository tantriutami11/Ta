// Mendapatkan elemen chart untuk suhu dari halaman web
var temperature = document.getElementById("temp");

// Mendapatkan referensi ke tombol "1 Week", "1 Month", dan "Download"
var dayButton = document.getElementById("day");
var weekButton = document.getElementById("week");
var monthButton = document.getElementById("month");
var downloadButton = document.querySelector(".button-download-temp");

// Mendefinisikan data untuk 1 hari, 1 minggu, dan 1 bulan
var dataOneDay = {
  labels: ['08.00', '09.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00'],
  datasets: [{
    label: 'Temperature',
    data: [0.50, 0.87, 0.90, 1, 1.20, 1.30, 1.15],
    fill: true,
    borderColor: 'rgb(106, 173, 217)',
    tension: 0.1,
  }]
};

var dataOneWeek = {
  labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
  datasets: [{
    label: 'Temperature',
    data: [0.50, 0.87, 0.90, 1, 1.20, 1.30, 1.15],
    fill: true,
    borderColor: 'rgb(106, 173, 217)',
    tension: 0.1,
  }]
};

var dataOneMonth = {
  labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
  datasets: [{
    label: 'Temperature',
    data: [0.50, 0.87, 0.90, 1], // Data untuk 1 bulan
    fill: true,
    borderColor: 'rgb(106, 173, 217)',
    tension: 0.1,
  }]
};

// Mendefinisikan lineChart
var lineChart;

// Membuat line chart saat halaman dimuat pertama kali dengan data satu hari
document.addEventListener("DOMContentLoaded", function() {
  lineChart = new Chart(temperature, {
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
            text: "°C"
          }
        },
      }
    }
  });

  // Memperbarui grafik untuk menampilkan data satu hari saat halaman dimuat
  updateChart(dataOneDay);
});

// Fungsi untuk mengubah data grafik berdasarkan tombol yang ditekan
function updateChart(data) {
  lineChart.data = data;
  lineChart.update();
}

// Menambahkan event listener untuk tombol "daily"
dayButton.addEventListener("click", function() {
  updateChart(dataOneDay);
});

// Menambahkan event listener untuk tombol "weekly"
weekButton.addEventListener("click", function() {
  updateChart(dataOneWeek);
});

// Menambahkan event listener untuk tombol "monthly"
monthButton.addEventListener("click", function() {
  updateChart(dataOneMonth);
});

// Fungsi untuk mengunduh data dalam format Excel
function downloadData(data) {
  // Mendefinisikan label untuk file CSV
  var csvLabels = "Waktu,Hasil Pengukuran\n";

  // Mendefinisikan data untuk file CSV
  var csvData = data.labels.map((label, index) => {
    return label + "," + data.datasets[0].data[index];
  }).join("\n");

  // Gabungkan label dan data CSV
  var csvContent = "data:text/csv;charset=utf-8," + csvLabels + csvData;

  // Proses membuat file CSV dan mengunduhnya
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "temperature_data.csv");
  document.body.appendChild(link); // Required for Firefox

  link.click();

  // Hapus elemen anchor setelah selesai mengunduh
  document.body.removeChild(link);
}

// Menambahkan event listener untuk tombol "Download"
downloadButton.addEventListener("click", function() {
  downloadData(lineChart.data);
});
