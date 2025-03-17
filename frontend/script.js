const citySelect = document.getElementById("city");
const dateInput = document.getElementById("date");
let charts = {};

async function fetchCities() {
  const response = await fetch("http://localhost:3000/api/place");
  const cities = await response.json();
  citySelect.innerHTML = '<option value="">Select City</option>';
  cities.data.forEach((city) => {
    const option = document.createElement("option");
    option.value = city.id;
    option.textContent = city.city;
    citySelect.appendChild(option);
  });
}

async function fetchWeatherData() {
  const cityId = citySelect.value;
  const date = dateInput.value;
  if (!cityId || !date) {
    alert("Please select city and date");
    return;
  }

  const response = await fetch(
    `http://localhost:3000/api/weather?place_id=${cityId}&date=${date}`
  );
  const data = await response.json();
  updateCharts(data.data);
}

function updateCharts(data) {
  const datasets = {
    temperature: data.temperature.map((d) => ({
      x: d.datetime,
      y: d.value,
    })),
    temperatureFeels: data.temperature_feels.map((d) => ({
      x: d.datetime,
      y: d.value,
    })),
    precipitation: data.precipitation.map((d) => ({
      x: d.datetime,
      y: d.value,
    })),
    humidity: data.humidity.map((d) => ({ x: d.datetime, y: d.value })),
    windSpeed: data.wind_speed.map((d) => ({
      x: d.datetime,
      y: d.value,
    })),
  };

  createOrUpdateChart("temperatureChart", "Temperature", datasets.temperature);
  createOrUpdateChart(
    "temperatureFeelsChart",
    "Feels Like Temperature",
    datasets.temperatureFeels
  );
  createOrUpdateChart(
    "precipitationChart",
    "Precipitation",
    datasets.precipitation
  );
  createOrUpdateChart("humidityChart", "Humidity", datasets.humidity);
  createOrUpdateChart("windSpeedChart", "Wind Speed", datasets.windSpeed);
}

function createOrUpdateChart(canvasId, label, data) {
  const ctx = document.getElementById(canvasId).getContext("2d");

  // Jika chart sudah ada, destroy dulu sebelum membuat yang baru
  if (charts[canvasId]) {
    charts[canvasId].destroy();
  }

  charts[canvasId] = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: label,
          data: data,
          borderColor: "blue",
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "minute",
            stepSize: 10, // Menampilkan label setiap 10 menit
            displayFormats: {
              minute: "HH:mm",
            },
          },
          title: {
            display: true,
            text: "Time",
          },
        },
        // x: {
        //   type: "time",
        //   time: {
        //     unit: "minute",
        //     stepSize: 10,
        //     displayFormats: { minute: "HH:mm" },
        //   },
        //   ticks: {
        //     autoSkip: false,
        //     maxRotation: 0,
        //     minRotation: 0,
        //   },
        // },
        y: {
          title: {
            display: true,
            text: label,
          },
        },
      },
    },
  });
}

fetchCities();
