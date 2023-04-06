
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
  async function updateChart(memory) {
    try {
      string = "https://www.randomnumberapi.com/api/v1.0/random?min=1&max=" + memory + "&count=1";
      const response = await fetch(string, {
        method: 'GET',
      });
      const memNum = await response.json();
      
      let unusedMem = memory - memNum[0];
      memChart.data.datasets[0].data = [memNum[0], unusedMem];
      memChart.update();
    } catch {
      // If there was an error then just dont do anything

    }
    try {
      const response = await fetch('https://www.randomnumberapi.com/api/v1.0/random?min=1&max=100&count=1', {
        method: 'GET',
      });
      const cpuNum = await response.json();
      let unusedcpu = 100 - cpuNum[0];
      cpuChart.data.datasets[0].data = [cpuNum[0], unusedcpu];
      cpuChart.update();
    } catch {
      // If there was an error then just dont do anything

    }

  }
  async function updateList() {
    try {
      const response = await fetch('/api/serverAll', {
        method: 'GET',
      });


      const images = await response.json();
      $("#select_image").empty();
      for (let i = 0; i < images.length; i++) {

        if (i === 0) {
          $("<option selected value=\"" + images[i]._id + "\">" + images[i].name + "</option>").appendTo("#select_image");
        }
        else {
          $("<option value=\"" + images[i]._id + "\">" + images[i].name + "</option>").appendTo("#select_image");
        }
      }
      let host = $("#select_image").find(":selected").val();
      for (let i = 0; i < images.length; i++) {
        if (images[i]._id === host) {
          document.getElementById('host_print').innerHTML = "Running On Host " + images[i].host;
          updateChart(images[i].memory);
          break;
        }
      }
      return images;



    } catch {
      // If there was an error then just dont do anything

    }
  }


  let memCtx = $("#mem_chart");
  let memChart = new Chart(memCtx, {
    type: 'pie',
    data: {
      labels: ["Avalible", "Used"],
      datasets: [{
        data: [1200, 1700],
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
        data: [1200, 1700],
        backgroundColor: ["rgba(100, 255, 0, 0.5)", "rgba(255, 0, 0, 0.5)"]
      }]
    },
    options: {
    }
  });
  updateList();
  $("#select_image").change(async function () {
    try {
      const response = await fetch('/api/serverAll', {
        method: 'GET',
      });


      const images = await response.json();
      let host = $("#select_image").find(":selected").val();
      for (let i = 0; i < images.length; i++) {
        if (images[i]._id === host) {
          document.getElementById('host_print').innerHTML = "Running On Host " + images[i].host;
          updateChart(images[i].memory);
          break;
        }
      }
      return images;



    } catch {
      // If there was an error then just dont do anything

    }
  });
  $("#shut_down_btn").click(async function () {
    let host = $("#select_image").find(":selected").val();
    messg = { _id: host };
    try {
      const response = await fetch('/api/serverAll', {
        method: 'GET',
      });


      const images = await response.json();
      let host = $("#select_image").find(":selected").val();
      for (let i = 0; i < images.length; i++) {
        if (images[i]._id === host) {
          messg = { name: images[i].name, host: images[i].host, memory: images[i].memory }
          break;
        }
      }
    } catch {
      // If there was an error then just dont do anything

    }

    console.log(JSON.stringify(messg));
    try {
      const response = await fetch('/api/stop', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(messg),
      });
    } catch {
      // If there was an error then just dont do anything

    }
  });


});
