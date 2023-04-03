function loginFunk() {
  const userId = document.querySelector("#login");
  const userPass = document.querySelector("#password");
  let check = localStorage.getItem(userId.value) ?? 'new';
  if (userId.value === "" || userPass.value === "") {
    document.querySelector("#signUpButton").innerHTML = "Insert a User Name and Password"
  }
  else if (check === "new") {
    document.querySelector("#signUpButton").innerHTML = "Incorrect User Name or Password"
  }
  else if (check === userPass.value) {
    localStorage.setItem("login", "True");
    window.location.href = "servers.html";
  }



}

function signup() {
  const userId = document.querySelector("#login");
  const userPass = document.querySelector("#password");
  console.log("signing up?")
  if (userId.value === "" || userPass.value === "") {
    document.querySelector("#signUpButton").innerHTML = "Insert a User name and Password"
  }
  else {
    let check = localStorage.getItem(userId.value) ?? 'new';
    if (check === "new") {
      localStorage.setItem(userId.value, userPass.value)
      document.querySelector("#signUpButton").innerHTML = "Name Added, Try Logging in"
    }
    else {
      document.querySelector("#signUpButton").innerHTML = "Username Already Exists"
    }
  }
}
