document.addEventListener("DOMContentLoaded", function() {
  // Mendapatkan elemen chart
  var solarChart = document.getElementById("temperatur-solar");
  var currentChart = document.getElementById("current");
  var voltageChart = document.getElementById("voltage");

  // Mendapatkan referensi ke tombol-tombol
  var dayButton = document.getElementById("day");
  var weekButton = document.getElementById("week");
  var monthButton = document.getElementById("month");
  var downloadButton = document.querySelector(".button-download-solar");

  // Mendefinisikan lineChart
  var solarLineChart;
  var currentLineChart;
  var voltageLineChart;

  // Membuat line chart saat halaman dimuat pertama kali dengan data satu hari
  solarLineChart = createChart(solarChart, [], [], 'Temperature', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 1)');
  currentLineChart = createChart(currentChart, [], [], 'Current', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 1)');
  voltageLineChart = createChart(voltageChart, [], [], 'Voltage', 'rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 1)');

  // Memperbarui grafik untuk menampilkan data satu hari saat halaman dimuat
  fetchDataAndUpdateChart('day');

  // Fungsi untuk mengambil data dari backend dan memperbarui grafik
  function fetchDataAndUpdateChart(interval) {
    var apiUrl = '';
    if (interval === 'day') {
      apiUrl = 'http://localhost:3000/api/v1/multisensor/day'; // Ganti dengan endpoint untuk data harian
    } else if (interval === 'week') {
      apiUrl = 'http://localhost:3000/api/v1/multisensor/week'; // Ganti dengan endpoint untuk data mingguan
    } else if (interval === 'month') {
      apiUrl = 'http://localhost:3000/api/v1/multisensor/month'; // Ganti dengan endpoint untuk data bulanan
    }

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Membuat array untuk menampung data sensor dari database
        var temperatureData = [];
        var currentData = [];
        var voltageData = [];
        var labelsArray = [];

        // Memfilter data untuk hanya mengambil nilai sensor
        data.response.forEach(entry => {
          if (interval === 'day') {
            var time = new Date(entry.waktu);
            var formattedTime = time.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'});
            labelsArray.push(formattedTime);
            temperatureData.push(entry.sensor_suhu_baterai);
            currentData.push(entry.sensor_arus);
            voltageData.push(entry.sensor_tegangan);
          } else if (interval === 'week') {
            var time = new Date(entry.min_waktu);
            var formattedTime = time.toLocaleDateString('en-US', {day: 'numeric', month: 'short'});
            labelsArray.push(formattedTime);
            temperatureData.push(entry.sensor_suhu_baterai_avg);
            currentData.push(entry.sensor_arus_avg);
            voltageData.push(entry.sensor_tegangan_avg);
          } else if (interval === 'month') {
            // Menggunakan tanggal bulan sebagai label
            var date = new Date(entry.min_waktu);
            var monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
            labelsArray.push(monthYear);
            temperatureData.push(entry.sensor_suhu_baterai_avg);
            currentData.push(entry.sensor_arus_avg);
            voltageData.push(entry.sensor_tegangan_avg);
          }
        });

        // Update chart dengan data
        updateChart(solarLineChart, labelsArray, temperatureData);
        updateChart(currentLineChart, labelsArray, currentData);
        updateChart(voltageLineChart, labelsArray, voltageData);
      })
      .catch(error => console.error('Error fetching data:', error.message));
  }

  // Fungsi untuk membuat grafik
  function createChart(ctx, labels, data, label, backgroundColor, borderColor) {
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: label,
          data: data,
          fill: true,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          tension: 0.1,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: label
            }
          },
        }
      }
    });
  }

  // Fungsi untuk mengubah data grafik
  function updateChart(chart, labels, data) {
    // Update data pada chart dengan data yang baru
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;

    // Update grafik
    chart.update();
  }

  // Menambahkan event listener untuk tombol "daily"
  dayButton.addEventListener("click", function() {
    fetchDataAndUpdateChart('day');
  });

  // Menambahkan event listener untuk tombol "weekly"
  weekButton.addEventListener("click", function() {
    fetchDataAndUpdateChart('week');
  });

  // Menambahkan event listener untuk tombol "monthly"
  monthButton.addEventListener("click", function() {
    fetchDataAndUpdateChart('month');
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

    // Proses membuat file Excel dan mengunduhnya
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "solar_data.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
  }

  // Menambahkan event listener untuk tombol "Download"
  downloadButton.addEventListener("click", function() {
    downloadData(solarLineChart.data);
  });
});
