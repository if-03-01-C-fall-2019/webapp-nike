// Get the modal

if (window.location.href.includes("reviewWebsite")) {
    document.querySelector(".loginButton").addEventListener("click", checkLogin);
    showLogin();
    document.querySelector(".signUp").addEventListener("click", signUp);
}


function showLogin() {
    document.querySelector("#id01").style.display = 'block';
}

async function checkLogin() {
    let password = document.querySelector(".password").value;
    let username = document.querySelector(".username").value;

    let users = await fetchRestEndpoint("/api/review", "GET");

    let isFound = false;

    users.map((element) => {
        if (element.username == username && element.password == password) {
            document.querySelector("#id01").style.display = 'none';
            isFound = true;
        }
    });

    if (!isFound) {
        document.querySelector(".container").innerHTML += `<p>Unvalid</p>`
    }




}

function signUp() {
    document.querySelector(".container").innerHTML = `<label for="email"><b>E-Mail</b></label>
    <input type="email" placeholder="Enter email" name="email" required class="email">
    <label for="uname"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="uname" required class="username">

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required class="password">

    <button class="signUp">Sign Up</button>`;



    document.querySelector(".signUp").addEventListener("click", async() => {
        let password = document.querySelector(".password").value;
        let username = document.querySelector(".username").value;
        const user = { username: username, password: password };
        let users = await fetchRestEndpoint("/api/review/signup", "POST", user);
        document.querySelector(".container").innerHTML = `<label for="uname"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="uname" required class="username">

        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required class="password">

        <button class="loginButton">Login</button><br>
        <button class="signUp">Sign Up</button>`

        document.querySelector(".loginButton").addEventListener("click", checkLogin);
    });
}

/**
 * Sends a HTTP request to the REST API endpoint.
 * @param {string} route 
 * @param {'GET' |'POST'} method 
 * @param {Object} data 
 */
async function fetchRestEndpoint(route, method, data) {
    const options = { method };

    if (data) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(data);
    }

    const res = await fetch(route, options);

    if (!res.ok) {
        const error = new Error(`${method} ${res.url} ${res.status} (${res.statusText})`);
        error.response = res;
        throw error;
    }

    if (res.status !== 204) {
        return await res.json();
    }
}