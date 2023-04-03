$(document).ready(function () {

  let loggedIn = localStorage.getItem("login");
  if (loggedIn === null) {
    loggedIn = "False";
  }
  console.log(loggedIn);
  if (loggedIn === "False") {
    $(location).attr('href', "login.html");
  }

  document.getElementById('logout').addEventListener('click', () => {
    localStorage.setItem("login", "False");
    $(location).attr('href', "login.html");
  });
  let host1Img = JSON.parse(localStorage.getItem("host1"));
  let host2Img = JSON.parse(localStorage.getItem("host2"));
  let host3Img = JSON.parse(localStorage.getItem("host3"));

  function updateList() {
    $("#select_image").empty();
    if (host1Img === null){
      images = [];
    }
    else{
      images = host1Img;
    }
    if (host2Img != null){
      images = images.concat(host2Img)
    }
    if (host3Img != null){
      images = images.concat(host3Img)
    }

    for (let i = 0; i < images.length; i++) {

      if (i === 0) {
        $("<option selected value=\""+ i.toString() + "\">" + images[i][0] + "</option>").appendTo("#select_image");
      }
      else {
        $("<option value=\""+ i.toString() + "\">" + images[i][0] + "</option>").appendTo("#select_image");
      }
    }
    let host = $("#select_image").find(":selected").val();
    console.log(images[+host]);

    document.getElementById('host_print').innerHTML = "Running On Host " + images[+host][2];

    let unusedMem = images[+host][1] - 3;
    memChart.data.datasets[0].data = [3, unusedMem];
    memChart.update();
    cpuChart.data.datasets[0].data = [100/images[+host][1], 100 - 100/images[+host][1]];
    cpuChart.update();
  }
  

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
  updateList();
  $("#select_image").change(function () {
    let host = $("#select_image").find(":selected").val();
    console.log(images[+host]);

    document.getElementById('host_print').innerHTML = "Running On Host " + images[+host][2];

    let unusedMem = images[+host][1] - 3;
    memChart.data.datasets[0].data = [3, unusedMem];
    memChart.update();
    cpuChart.data.datasets[0].data = [100/images[+host][1], 100 - 100/images[+host][1]];
    cpuChart.update();

  });
  // $("#shut_down_btn").click(function () {
  //   let host = $("#select_image").find(":selected").val();
  //   console.log(images[+host]);
    
  //   images = images.splice(+host, +host);

  //   let host1Val = [];
  //   let host2Val = [];
  //   let host3Val = [];



  //   for (let i =0;i< images.length; ++i){
  //     console.log(images[i]);
  //     if (+images[i][2] === 1){
  //       host1Val.push(images[i]);
  //     }
  //     else if (+images[i][2] === 2){
  //       host2Val.push(images[i]);
  //     }
  //     else if (+images[i][2] === 3){
  //       host3Val.push(images[i]);
  //     }
  //   }

  //   localStorage.setItem("host1",JSON.stringify(host1Val));
  //   localStorage.setItem("host2",JSON.stringify(host2Val));
  //   localStorage.setItem("host3",JSON.stringify(host3Val));


  //   updateList();
  // });


});
