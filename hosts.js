$(document).ready(function () {
  let memCtx = $("#mem_chart");
  let memChart = new Chart(memCtx, {
    type: 'pie',
    data: {
      labels: ["Used", "Avalible"],
      datasets: [{
        data: [1200, 1700],
        backgroundColor: ["rgba(255, 0, 0, 0.5)", "rgba(100, 255, 0, 0.5)"]
      }]
    },
    options: {
    }
  });
  let cpuCtx = $("#cpu_chart");
  let cpuChart = new Chart(cpuCtx, {
    type: 'pie',
    data: {
      labels: ["Used", "Avalible"],
      datasets: [{
        data: [1200, 1700],
        backgroundColor: ["rgba(255, 0, 0, 0.5)", "rgba(100, 255, 0, 0.5)"]
      }]
    },
    options: {
    }
  });
});