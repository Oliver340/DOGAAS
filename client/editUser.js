const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const responseText = document.getElementById("responseText");
const xhttp = new XMLHttpRequest();
const endPoint = "https://dogaas.patrickng.ca/"; //CHANGE

xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
            let jsonData = JSON.parse(xhttp.response);
            responseText.innerHTML = `<div>${jsonData.message}</div>`;
        } else {
            let jsonData = JSON.parse(xhttp.response);
            responseText.innerHTML = `<div>${jsonData.message}</div>`;
        }
    }
};

let deleteUser = () => {
    let usr = usernameInput.value;
    let pwd = passwordInput.value;
    if (!usr.trim().length || !pwd.trim().length) {
        alert('Cannot leave any fields blank');
        return;
    }

    xhttp.open("DELETE", endPoint + 'API/v1/user/' + usernameInput.value, true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader( "x-access-token", localStorage.getItem('token') );
    xhttp.send();
    signOut();
};

let editUser = () => {
    let usr = usernameInput.value;
    let pwd = passwordInput.value;
    if (!usr.trim().length || !pwd.trim().length) {
        alert('Cannot leave any fields blank');
        return;
    }

    xhttp.open("PUT", endPoint + 'API/v1/user/' + usr, true);
    xhttp.setRequestHeader("Content-Type", "application/JSON");
    xhttp.setRequestHeader( "x-access-token", localStorage.getItem('token') );
    xhttp.send(JSON.stringify({ username: usr, password: pwd }));
};

let signOut = () => {
    localStorage.setItem('token', "");
    window.location.href = "./signIn.html";
};