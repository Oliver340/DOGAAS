const dogImg = document.getElementById("dogImg");
const responseText = document.getElementById("responseText");
const editForm = document.getElementById("editDogForm");
const xhttp = new XMLHttpRequest();
const endPoint = "https://dogaas.patrickng.ca/"; //CHANGE

let dogID;

xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
            let jsonData = JSON.parse(xhttp.response);
            dogImg.src = jsonData.imageURL[0].imageURL;
            dogID = jsonData.imageURL[0].dogId;
            responseText.innerHTML = `<div>${jsonData[0].message}</div>`;
        } else {
            let jsonData = JSON.parse(xhttp.response);
            responseText.innerHTML = `<div>${jsonData.message}</div>`;
        }
    }
};

const getDog = () => {
    xhttp.open("GET", endPoint + "API/v1/dog", true);
    xhttp.setRequestHeader( "x-access-token", localStorage.getItem('token') );
    xhttp.send();
}

getDog();

let deleteDog = () => {
    xhttp.open("DELETE", endPoint + 'API/v1/dog/' + dogID, true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader( "x-access-token", localStorage.getItem('token') );
    xhttp.send();
};

editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    editUrl(editForm.urlInput.value);
})

const editUrl = (newURL) => {
    xhttp.open("PUT", endPoint + 'api/v1/dog/' + dogID, true);
    xhttp.setRequestHeader("Content-Type", "application/JSON");
    xhttp.setRequestHeader( "x-access-token", localStorage.getItem('token') );
    xhttp.send(JSON.stringify({ url: newURL }));
}