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

  images = JSON.parse(localStorage.getItem("images"));
  if (images != null) {
    $("#Image_List").empty();
    $("#select_image").empty();
    for (let i = 0; i < images.length; i++) {
      $("<li class=\"list-group-item\">" + images[i] + "</li>").appendTo("#Image_List");
      if (i === 0) {
        $("<option selected value=\"" + i + "\">" + images[i] + "</option>").appendTo("#select_image");
      }
      else {
        $("<option value=\"" + i + "\">" + images[i] + "</option>").appendTo("#select_image");
      }
    }
  }
  else{
    $("#Image_List").empty();
    $("#select_image").empty();
  }

  document.getElementById('add_image_btn').addEventListener('click', () => {
    imageName = document.getElementById("Add_Image").value.split('\\');
    imageName = imageName[imageName.length - 1].split('.')[0];
    console.log(imageName);
    images = localStorage.getItem("images");
    if (images === null) {
      images = [];
      if (imageName != "") {
        images.push(imageName);
      }

    }
    else {
      images = JSON.parse(images);
      if (!images.includes(imageName)) {
        if (imageName != "") {
          images.push(imageName);
        }
      }
    }
    localStorage.setItem("images", JSON.stringify(images));
    $("#Image_List").empty();
    for (let i = 0; i < images.length; i++) {
      $("<li class=\"list-group-item\">" + images[i] + "</li>").appendTo("#Image_List");
    }
  });


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