let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs: " + date.getMinutes() + "Mins: " + date.getSeconds() + "Secs ";
}

function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            console.log(methodType + " state changed called at: " + showTime() + "Ready state " + xhr.readyState + " Status: " + xhr.status);
            if (xhr.readyState == 4) {
                if (xhr.status == 200 || xhr.status == 201) {
                    resolve(xhr.responseText);
                } else if (xhr.status >= 400) {
                    reject({ status: xhr.status, statusText: xhr.statusText });
                    console.log("Handle 400 client error or 500 server error at: " + showTime());
                }
            }
        }
        //establishing connection
        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
        }
        console.log(methodType + " request sent to server");
    });
}

const getURL = "http://localhost:3000/employees/1";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get User Data: " + responseText)
    })
    .catch(error => console.log("GET Error status: " + JSON.stringify(error)));

const deleteURL = "http://localhost:3000/employees/4";
makePromiseCall("DELETE", deleteURL, false)
    .then(responseText => {
        console.log("User Deleted: " + responseText)
    })
    .catch(error => console.log("DELETE Error Status: " + JSON.stringify(error)));

const postURL = "http://localhost:3000/employees";
const employeeData = { "name": "Harry", "salary": "500000" };
makePromiseCall("POST", postURL, true, employeeData)
    .then(responseText => {
        console.log("User Added: " + responseText);
    })
    .catch(error => console.log("POST Error Status: " + JSON.stringify(error)));
