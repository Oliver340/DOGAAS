const dogImg = document.getElementById("dogImg");
const dogTag = document.getElementById("dogTag");
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
    let selectedOption = dogTag.options[dogTag.selectedIndex].value;
    if (selectedOption == 0) {
        xhttp.open("GET", endPoint, true);
        xhttp.send();
    } else {
        
    }
};