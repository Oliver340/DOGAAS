const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const responseText = document.getElementById("responseText");
const xhttp = new XMLHttpRequest();
const endPoint = "https://dogaas.patrickng.ca/"; //CHANGE

xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
            responseText.innerHTML = `<div>${xhttp.response}</div>`;
            //document.getElementById("loginContainer").style.display = "none";
        } else if (xhttp.status == 404) {
            responseText.innerHTML = "Invalid Credentials";
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
    xhttp.send(JSON.stringify({ username: usr, password: pwd }));
};