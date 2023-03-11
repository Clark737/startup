$(document).ready(function () {

  const hostOneMem = 32;
  const hostTwoMem = 32;
  const hostThreeMem = 16;

  let currentMemOne = 15;
  let currentMemTwo = 28;
  let currentMemThree = 3;

  let currentCPUOne = 15;
  let currentCPUTwo = 28;
  let currentCPUThree = 99;


  let loggedIn = localStorage.getItem("login");
  if (loggedIn === null){
    loggedIn = "False";
  }
  console.log(loggedIn);
  if (loggedIn === "False"){
    $(location).attr('href',"login.html");
  }

  document.getElementById('logout').addEventListener('click', () => {
    localStorage.setItem("login","False");
    $(location).attr('href',"login.html");
 });


  let memCtx = $("#mem_chart");
  let memChart = new Chart(memCtx, {
    type: 'pie',
    data: {
      labels: ["Used", "Avalible"],
      datasets: [{
        data: [currentMemOne, hostOneMem - currentMemOne],
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
        data: [currentCPUOne, 100 - currentCPUOne],
        backgroundColor: ["rgba(255, 0, 0, 0.5)", "rgba(100, 255, 0, 0.5)"]
      }]
    },
    options: {
    }
  });





  $( "#select_host" ).change(function() {
    let host = $( "#select_host" ).find(":selected").val();
    console.log(host);
    if(host === '1'){
      let unusedMem = hostOneMem - currentMemOne;
      memChart.data.datasets[0].data = [currentMemOne, unusedMem];
      memChart.update();
      cpuChart.data.datasets[0].data = [currentCPUOne, 100 - currentCPUOne];
      cpuChart.update();
    }
    if(host === '2'){
      let unusedMem = hostTwoMem - currentMemTwo;
      memChart.data.datasets[0].data = [currentMemTwo, unusedMem];
      memChart.update();
      cpuChart.data.datasets[0].data = [currentCPUTwo, 100 - currentCPUTwo];
      cpuChart.update();
    }
    if(host === '3'){
      let unusedMem = hostThreeMem - currentMemThree;
      memChart.data.datasets[0].data = [currentMemThree, unusedMem];
      memChart.update();
      cpuChart.data.datasets[0].data = [currentCPUThree, 100 - currentCPUThree];
      cpuChart.update();
    }
  });

});