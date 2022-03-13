const dogInput = document.getElementById("dogInput");
const responseText = document.getElementById("responseText");
const xhttp = new XMLHttpRequest();
const endPoint = "https://SERVER_NAME"; //CHANGE

xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
            responseText.innerHTML = `<div>${xhttp.response}</div>`;
        } else if (xhttp.status == 404) {
            responseText.innerHTML = "Failed to Post Dog";
        }
    }
};

let postDog = function () {
    let dogURL = dogInput.value;
    if (!dogURL.trim().length) {
        alert('Cannot leave any fields blank');
        return;
    }

    xhttp.open("POST", endPoint, true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("?dogURL=" + dogURL);
};