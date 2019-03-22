if (sessionStorage.getItem("currentUser") == null) {
    document.getElementById('pInfo').innerHTML = "<a href='sign-in.html'>Sign in</a> <a href='register.html'>Register</a>";
} else {
    document.getElementById('pInfo').innerHTML = `Hello ${sessionStorage.getItem('currentUser').split('/')[2]} <a href='home.html' onclick='signout()'>Sign-out</a>`;
}
