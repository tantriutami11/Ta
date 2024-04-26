// Mendapatkan elemen canvas berdasarkan ID
var temperatureChart = document.getElementById("temperatur-solar");
var currentChart = document.getElementById("current");
var voltageChart = document.getElementById("voltage");

// Mendefinisikan data untuk 1 hari, 1 minggu, dan 1 bulan
var dataOneDay = {
  labels: ['08.00', '09.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00'],
  datasets: [{
    label: 'Temperature',
    data: [50, 60, 55, 60, 75, 70, 63],
    borderColor: "rgb(240,230,140)",
    backgroundColor: "rgb(218,165,32)",
    fill: false
  }]
};

var dataOneWeek = {
  labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
  datasets: [{
    label: 'Temperature',
    data: [50, 60, 55, 60, 75, 70, 63],
    borderColor: "rgb(240,230,140)",
    backgroundColor: "rgb(218,165,32)",
    fill: false
  }]
};

var dataOneMonth = {
  labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
  datasets: [{
    label: 'Temperature',
    data: [50, 60, 55, 60], // Data untuk 1 bulan
    borderColor: "rgb(240,230,140)",
    backgroundColor: "rgb(218,165,32)",
    fill: false
  }]
};

// Membuat grafik temperature
var temperatureLineChart = new Chart(temperatureChart, {
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
          text: '\u2103'
        }
      }
    }
  }
});

// Membuat grafik Current
var currentLineChart = new Chart(currentChart, {
  type: "line",
  data: {
    labels: dataOneDay.labels,
    datasets: [{
      label: 'Current',
      data: [50, 60, 55, 60, 75, 70, 63],
      borderColor: "rgb(135,206,235)",
      backgroundColor: "rgb(70,130,180)",
      fill: false
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'A'
        }
      }
    }
  }
});

// Membuat grafik voltage
var voltageLineChart = new Chart(voltageChart, {
  type: "line",
  data: {
    labels: dataOneDay.labels,
    datasets: [{
      label: 'Voltage',
      data: [5.03, 60, 55, 60, 75, 70, 63],
      borderColor: "rgb(245,222,179)",
      backgroundColor: "rgb(210,105,30)",
      fill: false
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'V'
        }
      }
    }
  }
});

// Fungsi untuk mengubah data grafik berdasarkan tombol yang ditekan
function updateChart(chart, data) {
  chart.data.labels = data.labels;
  chart.data.datasets[0].data = data.datasets[0].data;
  chart.update();
}

// Menambahkan event listener untuk tombol "daily"
document.getElementById("day").addEventListener("click", function() {
  updateChart(temperatureLineChart, dataOneDay);
  updateChart(currentLineChart, dataOneDay);
  updateChart(voltageLineChart, dataOneDay);
});

// Menambahkan event listener untuk tombol "weekly"
document.getElementById("week").addEventListener("click", function() {
  updateChart(temperatureLineChart, dataOneWeek);
  updateChart(currentLineChart, dataOneWeek);
  updateChart(voltageLineChart, dataOneWeek);
});

// Menambahkan event listener untuk tombol "monthly"
document.getElementById("month").addEventListener("click", function() {
  updateChart(temperatureLineChart, dataOneMonth);
  updateChart(currentLineChart, dataOneMonth);
  updateChart(voltageLineChart, dataOneMonth);
});

// Fungsi untuk mengunduh data dalam format Excel
function downloadData() {
  // Mendefinisikan label untuk file CSV
  var csvContent = "Waktu,Monitoring Temperatur,Monitoring Arus,Monitoring Voltage\n";

  // Mendapatkan data untuk grafik temperatur
  var temperatureData = temperatureLineChart.data;

  // Mendapatkan data untuk grafik current
  var currentData = currentLineChart.data;

  // Mendapatkan data untuk grafik voltage
  var voltageData = voltageLineChart.data;

  // Mendapatkan label waktu
  var labels = temperatureData.labels;

  // Mendapatkan data untuk masing-masing grafik
  var temperatureValues = temperatureData.datasets[0].data;
  var currentValues = currentData.datasets[0].data;
  var voltageValues = voltageData.datasets[0].data;

  // Menggabungkan data ke dalam format CSV
  for (var i = 0; i < labels.length; i++) {
    csvContent += labels[i] + "," + temperatureValues[i] + "," + currentValues[i] + "," + voltageValues[i] + "\n";
  }

  // Membuat objek Blob
  var blob = new Blob([csvContent], { type: 'text/csv' });

  // Membuat URL objek Blob
  var url = URL.createObjectURL(blob);

  // Membuat link untuk mengunduh data
  var link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "parameters_of_solar_panel.csv");

  // Menambahkan link ke dalam dokumen dan mengkliknya secara otomatis
  document.body.appendChild(link);
  link.click();

  // Membersihkan URL objek Blob setelah pengunduhan selesai
  URL.revokeObjectURL(url);
}

// Menambahkan event listener untuk tombol "Download"
document.querySelector(".button-download-solar").addEventListener("click", downloadData);