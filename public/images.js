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

async function updateImages() {

  try {
    const response = await fetch('/api/imageAll', {
      method: 'GET',
    });

    // Store what the service gave us as the high scores
    const images = await response.json();
    $("#Image_List").empty();
    $("#select_image").empty();
    for (let i = 0; i < images.length; i++) {
      $("<li class=\"list-group-item\">" + images[i].name + "</li>").appendTo("#Image_List");
      if (i === 0) {
        $("<option selected value=\"" + i + "\">" + images[i].name + "</option>").appendTo("#select_image");
      }
      else {
        $("<option value=\"" + i + "\">" + images[i].name + "</option>").appendTo("#select_image");
      }
    }

  } catch {
    // If there was an error then just track scores locally
    this.updateScoresLocal(newScore);
  }

}

async function saveImage() {
  imageName = document.getElementById("Add_Image").value.split('\\');
  imageName = imageName[imageName.length - 1].split('.')[0];
  console.log(imageName);

  if (imageName != "") {
    const newImage = { name: imageName };

    try {
      const response = await fetch('/api/add', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newImage),
      });

    } catch {
      // If there was an error then just dont do anything

    }
    updateImages();
  }
}

$(document).ready(function () {

  updateImages();

  document.getElementById('start_image').addEventListener('click', () => {
    let host = $("#select_host").find(":selected").val();
    let image = $("#select_image").find(":selected").text();
    let memory = $("#select_memory").find(":selected").val();

    if (host === '1') {
      hostList = localStorage.getItem("host1");
    }
    else if (host === '2') {
      hostList = localStorage.getItem("host2");
    }
    else if (host === '3') {
      hostList = localStorage.getItem("host2");
    }
    if (hostList === null) {
      hostList = [];
    }
    else {
      hostList = JSON.parse(hostList);
    }
    hostList.push([image, memory, host]);
    if (host === '1') {
      localStorage.setItem("host1", JSON.stringify(hostList));
    }
    else if (host === '2') {
      localStorage.setItem("host2", JSON.stringify(hostList));
    }
    else if (host === '3') {
      localStorage.setItem("host3", JSON.stringify(hostList));
    }
    $(location).attr('href', "servers.html");

  });

});