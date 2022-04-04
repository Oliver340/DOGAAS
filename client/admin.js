const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const responseText = document.getElementById("responseText");
const xhttp = new XMLHttpRequest();
const endPoint = "https://dogaas.patrickng.ca/"; //CHANGE

xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
            let jsonData = JSON.parse(xhttp.response);
            console.log(jsonData);
            jsonData.forEach(element => {
                let table = document.createElement("tr");
                table.id = "endPointTable";
                let method = document.createElement("td");
                method.innerHTML = "Method";
                let endPoint = document.createElement("td");
                endPoint.innerHTML = "Endpoint";
                let requestCount = document.createElement("td");
                requestCount.innerHTML = "Requests";
                table.append(method);
                table.append(endPoint);
                table.append(requestCount);
                method = document.createElement("td");
                method.innerHTML = element.method;
                endPoint = document.createElement("td");
                endPoint.innerHTML = element.endPoint;
                requestCount = document.createElement("td");
                requestCount.innerHTML = element.requestCount;
                table.append(method);
                table.append(endPoint);
                table.append(requestCount);
                document.getElementById("endPointTable").append(table);
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