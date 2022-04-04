const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const responseText = document.getElementById("responseText");
const xhttp = new XMLHttpRequest();
const endPoint = "https://dogaas.patrickng.ca/"; //CHANGE

xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
            let jsonData = JSON.parse(xhttp.response);
            responseText.innerHTML = `<div>${jsonData.message}</div>`;
        } else if (xhttp.status == 500) {
            let jsonData = JSON.parse(xhttp.response);
            responseText.innerHTML = `<div>${jsonData.message}</div>`;
        } else if (xhttp.status == 401) {
            let jsonData = JSON.parse(xhttp.response);
            responseText.innerHTML = `<div>${jsonData.message}</div>`;
        }
    }
};

let validateAdmin = function () {
    let username = usernameInput.value;
    let password = passwordInput.value;
    if (!username.trim().length || !password.trim().length) {
        alert('Cannot leave any fields blank');
        return;
    }

    xhttp.open("POST", endPoint + '/api/v1/admin', true);
    xhttp.setRequestHeader("Content-Type", "application/JSON");
    xhttp.setRequestHeader( "x-access-token", localStorage.getItem('token') );
    xhttp.send(JSON.stringify({ username: usr, password: pwd }));
};