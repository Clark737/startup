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

    // Store what the service gave us as the images
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

async function startImage() {
  let host = document.getElementById("select_host").value;
  let image = document.getElementById("select_image");
  image = image.options[image.selectedIndex].text;
  let memory = document.getElementById("select_memory").value;

  const serverstart = { host: host, name: image, memory: memory };
  try {
    const response = await fetch('/api/start', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(serverstart),
    });
    window.location.href = 'servers.html'
  } catch {
    // If there was an error then just dont do anything

  }

}

$(document).ready(function () {

  updateImages();



});