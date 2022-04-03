const dogImg = document.getElementById("dogImg");
const dogTag = document.getElementById("dogTag");
const responseText = document.getElementById("responseText");
const xhttp = new XMLHttpRequest();
const endPoint = "https://dogaas.patrickng.ca/"; //CHANGE

xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
            let jsonData = JSON.parse(xhttp.response);
            dogImg.src = jsonData[0];
        } else if (xhttp.status == 500) {
            let jsonData = JSON.parse(xhttp.response);
            responseText.innerHTML = `<div>${jsonData.message}</div>`;
        } else if (xhttp.status == 401) {
            let jsonData = JSON.parse(xhttp.response);
            responseText.innerHTML = `<div>${jsonData.message}</div>`;
        }
    }
};

const getDog = function() {
    let selectedOption = dogTag.options[dogTag.selectedIndex].value;
    if (selectedOption == 0) {
        xhttp.open("GET", endPoint + "/api/v1/dog", true);
        xhttp.send();
    } else {
        xhttp.open("GET", endPoint + "/api/v1/dog", true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send("?tagID=" + selectedOption);
    }
};