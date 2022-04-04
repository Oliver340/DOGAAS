const dogImg = document.getElementById("dogImg");
const dogTag = document.getElementById("dogTag");
const responseText = document.getElementById("responseText");
const editForm = document.getElementById("editDogForm");
const xhttp = new XMLHttpRequest();
const endPoint = "https://dogaas.patrickng.ca/"; //CHANGE

let dogID;

xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
            let jsonData = JSON.parse(xhttp.response);
            dogImg.src = jsonData[0].imageURL;
            dogID = jsonData[0].dogId;
        } else if (xhttp.status == 500) {
            let jsonData = JSON.parse(xhttp.response);
            responseText.innerHTML = `<div>${jsonData.message}</div>`;
        } else if (xhttp.status == 401) {
            let jsonData = JSON.parse(xhttp.response);
            responseText.innerHTML = `<div>${jsonData.message}</div>`;
        }
    }
};

const getDog = () => {
    let selectedOption = dogTag.options[dogTag.selectedIndex].value;
    if (selectedOption == 0) {
        xhttp.open("GET", endPoint + "/api/v1/dog", true);
        xhttp.send();
    } else {
        xhttp.open("GET", endPoint + "/api/v1/dog" + selectedOption, true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader( "x-access-token", localStorage.getItem('token') );
        xhttp.send();
    }
}
getDog();

let deleteDog = () => {
    xhttp.open("DELETE", endPoint + '/api/v1/dog' + dogID, true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader( "x-access-token", localStorage.getItem('token') );
    xhttp.send();
};

editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    editUrl(editForm.urlInput.value);
})

const editURL = (newURL) => {
    xhttp.open("PUT", endPoint + '/api/v1/dog' + dogID, true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader( "x-access-token", localStorage.getItem('token') );
    xhttp.send("?imageURL=" + newURL);
}