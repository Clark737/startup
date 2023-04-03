(async () => {
  let authenticated = false;
  const userName = localStorage.getItem('userName');
  if (userName) {
    const user = await getUser(userName);
    authenticated = user?.authenticated;
  }

  if (!authenticated) {
    window.location.href = "/";
  }
})();

function logout() {
  fetch(`/api/auth/logout`, {
    method: 'delete',
  }).then(() => (window.location.href = '/'));
}

async function getUser(userName) {
  // See if we have a user with the given userName.
  const response = await fetch(`/api/user/${userName}`);
  if (response.status === 200) {
    return response.json();
  }

  return null;
}


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

  async function getServers(host) {
    try {
      const response = await fetch('/api/runningOn/' + host, {
        method: 'GET',
      });

      const images = await response.json();
      $("#image_list").empty();
      for (let i = 0; i < images.length; i++) {
        $("<li class=\"list-group-item\">" + images[i].name + "</li>").appendTo("#image_list");
      }
    }
    catch {

    }
  }
  getServers("1");
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





  $("#select_host").change(function () {
    let host = $("#select_host").find(":selected").val();
    console.log(host);
    if (host === '1') {
      let unusedMem = hostOneMem - currentMemOne;
      memChart.data.datasets[0].data = [currentMemOne, unusedMem];
      memChart.update();
      cpuChart.data.datasets[0].data = [currentCPUOne, 100 - currentCPUOne];
      cpuChart.update();

      getServers("1");

    }
    if (host === '2') {
      let unusedMem = hostTwoMem - currentMemTwo;
      memChart.data.datasets[0].data = [currentMemTwo, unusedMem];
      memChart.update();
      cpuChart.data.datasets[0].data = [currentCPUTwo, 100 - currentCPUTwo];
      cpuChart.update();


      getServers("2");
    }
    if (host === '3') {
      let unusedMem = hostThreeMem - currentMemThree;
      memChart.data.datasets[0].data = [currentMemThree, unusedMem];
      memChart.update();
      cpuChart.data.datasets[0].data = [currentCPUThree, 100 - currentCPUThree];
      cpuChart.update();


      getServers("3");
    }
  });

});