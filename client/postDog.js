const dogInput = document.getElementById("dogInput");
const responseText = document.getElementById("responseText");
const xhttp = new XMLHttpRequest();
const endPoint = "https://dogaas.patrickng.ca/"; //CHANGE

xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
            responseText.innerHTML = `<div>${xhttp.response}</div>`;
        } else if (xhttp.status == 500) {
            let jsonData = JSON.parse(xhttp.response);
            responseText.innerHTML = `<div>${jsonData.message}</div>`;
        } else if (xhttp.status == 401) {
            let jsonData = JSON.parse(xhttp.response);
            responseText.innerHTML = `<div>${jsonData.message}</div>`;
        }
    }
};

let postDog = () => {
    let dogURL = dogInput.value;
    if (!dogURL.trim().length) {
        alert('Cannot leave any fields blank');
        return;
    }

    xhttp.open("POST", endPoint + 'API/v1/dog', true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader( "x-access-token", localStorage.getItem('token') );
    xhttp.send("?dogURL=" + dogURL);
};