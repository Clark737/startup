$(document).ready(function () {

  let loggedIn = localStorage.getItem("login");
  if (loggedIn === null) {
    loggedIn = "False";
  }
  console.log(loggedIn);
  if (loggedIn === "True") {
    document.getElementById('logout').innerHTML = "Logout";
    document.getElementById('logout').addEventListener('click', () => {
      localStorage.setItem("login", "False");
      $(location).attr('href', "login.html");
    });
  }
  else{
    document.getElementById('logout').addEventListener('click', () => {
      $(location).attr('href', "login.html");
    });
  }






});