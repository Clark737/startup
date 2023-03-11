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




});