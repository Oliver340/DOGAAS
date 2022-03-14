const dogImg = document.getElementById("dogImg");
const xhttp = new XMLHttpRequest();
const endPoint = "https://dogaas.patrickng.ca/"; //CHANGE

xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
            let jsonData = JSON.parse(xhttp.response);
            dogImg.src = jsonData[0];
        }
    }
};

const getDog = function() {
    xhttp.open("GET", endPoint, true);
    xhttp.send();
};