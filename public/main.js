function logout() {
  fetch(`/api/auth/logout`, {
    method: 'delete',
  }).then(() => (window.location.href = '/'));
}
function login() {
  window.location.href = '/login.html'
}


(async () => {
  let authenticated = false;
  const userName = localStorage.getItem('userName');
  
  if (userName) {

    const user = await getUser(userName);
    authenticated = user?.authenticated;
  }
  if (authenticated) {
    document.getElementById('logout').innerHTML = "Logout";
    document.getElementById('logout').onclick = logout;
  } else {
    document.getElementById('logout').onclick = login;
  }
})();


async function getUser(userName) {
  // See if we have a user with the given userName.
  const response = await fetch(`/api/user/${userName}`);
  if (response.status === 200) {
    return response.json();
  }

  return null;
}
