// Sample data for demo purposes
const data = [
    { timestamp: '2025-01-12T16:36:34Z', device_id: 'device1', temperature: 31.5, humidity: 65, battery_percentage: 6 },
    { timestamp: '2025-01-12T16:36:34Z', device_id: 'device2', temperature: 28.4, humidity: 50, battery_percentage: 51 },
    { timestamp: '2025-01-12T17:36:34Z', device_id: 'device1', temperature: 36.1, humidity: 83, battery_percentage: 15 },
    { timestamp: '2025-01-12T17:36:34Z', device_id: 'device2', temperature: 31.3, humidity: 84, battery_percentage: 79 },
    // Add more data as required
  ];
  
  // Arrays to store processed data
  let timestamps = [];
  let device1Temp = [], device2Temp = [];
  let device1Humidity = [], device2Humidity = [];
  let device1Battery = [], device2Battery = [];
  
  // Process data to organize by device
  data.forEach(row => {
    timestamps.push(row.timestamp);
    if (row.device_id === 'device1') {
      device1Temp.push(row.temperature);
      device1Humidity.push(row.humidity);
      device1Battery.push(row.battery_percentage);
    } else {
      device2Temp.push(row.temperature);
      device2Humidity.push(row.humidity);
      device2Battery.push(row.battery_percentage);
    }
  });
  
  // Initialize the Chart
  function initializeChart(canvasId, label, data1, data2) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: timestamps,
        datasets: [
          {
            label: 'Device 1',
            data: data1,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            fill: false,
          },
          {
            label: 'Device 2',
            data: data2,
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'hour',
            },
          },
          y: {
            beginAtZero: false,
          },
        },
      },
    });
  }
  
  // Check for low battery alert
  function checkLowBattery() {
    const lowBatteryDevices = [];
    if (device1Battery.some(battery => battery < 10)) lowBatteryDevices.push('Device 1');
    if (device2Battery.some(battery => battery < 10)) lowBatteryDevices.push('Device 2');
  
    if (lowBatteryDevices.length > 0) {
      alert('Low Battery Alert: ' + lowBatteryDevices.join(', '));
    }
  }
  
  // Show Temperature Graph
  function showTemperatureGraph() {
    initializeChart('temperatureChart', 'Temperature (°C)', device1Temp, device2Temp);
    checkLowBattery();
  }
  
  // Show Humidity Graph
  function showHumidityGraph() {
    initializeChart('humidityChart', 'Humidity (%)', device1Humidity, device2Humidity);
    checkLowBattery();
  }
  
  // Show Battery Graph
  function showBatteryGraph() {
    initializeChart('batteryChart', 'Battery (%)', device1Battery, device2Battery);
    checkLowBattery();
  }
  
  // Call the relevant graph function when the page loads
  if (window.location.href.indexOf("temperature.html") > -1) {
    showTemperatureGraph();
  } else if (window.location.href.indexOf("humidity.html") > -1) {
    showHumidityGraph();
  } else if (window.location.href.indexOf("battery.html") > -1) {
    showBatteryGraph();
  }
  