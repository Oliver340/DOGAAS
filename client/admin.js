const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const responseText = document.getElementById("responseText");
const xhttp = new XMLHttpRequest();
const endPoint = "https://dogaas.patrickng.ca/"; //CHANGE

xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
            let jsonData = JSON.parse(xhttp.response);
            jsonData.forEach(element => {
                let table = document.createElement("tr");
                table.id = "endPointTable";
                let methodTitle = document.createElement("th");
                methodTitle.innerHTML = "Method";
                let endPointTitle = document.createElement("th");
                endPointTitle.innerHTML = "Endpoint";
                let requestCountTitle = document.createElement("th");
                requestCountTitle.innerHTML = "Requests";
                table.append(methodTitle);
                table.append(endPointTitle);
                table.append(requestCount);
                let method = document.createElement("td");
                method.innerHTML = element.method;
                let endPoint = document.createElement("td");
                endPoint.innerHTML = element.endPoint;
                let requestCount = document.createElement("td");
                requestCount.innerHTML = element.requestCount;
                table.append(method);
                table.append(endPoint);
                table.append(requestCount);
                responseText.append(table);
            });
        } else {
            let jsonData = JSON.parse(xhttp.response);
            responseText.innerHTML = `<div>${jsonData.message}</div>`;
        }
    }
};

let validateAdmin = () => {
    let usr = usernameInput.value;
    let pwd = passwordInput.value;
    if (!usr.trim().length || !pwd.trim().length) {
        alert('Cannot leave any fields blank');
        return;
    }

    xhttp.open("POST", endPoint + 'API/v1/admin', true);
    xhttp.setRequestHeader("Content-Type", "application/JSON");
    xhttp.setRequestHeader( "x-access-token", localStorage.getItem('token') );
    xhttp.send(JSON.stringify({ username: usr, password: pwd }));
};