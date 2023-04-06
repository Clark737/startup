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
  function updateChart(memory, cpu){
    memChart.data.datasets[0].data = [16 - memory, memory];
    memChart.update();
    cpuChart.data.datasets[0].data = [100 - cpu, cpu];
    cpuChart.update();
  }
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

  // Display that we have opened the webSocket
  socket.onmessage = async (event) => {
    const text = await event.data;
    const data = JSON.parse(text);
    updateChart(data.mem, data.cpu);
  };


  const hostOneMem = 32;

  let currentMemOne = 15;

  let currentCPUOne = 15;


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
      labels: ["Avalible", "Used"],
      datasets: [{
        data: [currentMemOne, hostOneMem - currentMemOne],
        backgroundColor: ["rgba(100, 255, 0, 0.5)", "rgba(255, 0, 0, 0.5)"]
      }]
    },
    options: {
    }
  });
  let cpuCtx = $("#cpu_chart");
  let cpuChart = new Chart(cpuCtx, {
    type: 'pie',
    data: {
      labels: ["Avalible", "Used"],
      datasets: [{
        data: [currentCPUOne, 100 - currentCPUOne],
        backgroundColor: ["rgba(100, 255, 0, 0.5)", "rgba(255, 0, 0, 0.5)"]
      }]
    },
    options: {
    }
  });





  $("#select_host").change(function () {
    let host = $("#select_host").find(":selected").val();
    console.log(host);
    getServers(host)
  });

});