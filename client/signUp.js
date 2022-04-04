const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const responseText = document.getElementById("responseText");
const xhttp = new XMLHttpRequest();
const endPoint = "https://dogaas.patrickng.ca/"; //CHANGE

xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
            let jsonData = JSON.parse(xhttp.response);
            localStorage.setItem('token', jsonData.token);
            window.location.href = "./getDog.html";
        } else if (xhttp.status == 500) {
            responseText.innerHTML = xhttp.response;
        }
    }
};

let signUp = () => {
    let usr = usernameInput.value;
    let pwd = passwordInput.value;
    if (!usr.trim().length || !pwd.trim().length) {
        alert('Cannot leave any fields blank');
        return;
    }

    xhttp.open("POST", endPoint + 'API/v1/userCreate', true);
    xhttp.setRequestHeader("Content-Type", "application/JSON");
    xhttp.send(JSON.stringify({ username: usr, password: pwd }));
};