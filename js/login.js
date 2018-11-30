window.onload = function() {

    loginForm = document.getElementById("LoginForm");
    loginBtn = document.getElementById("loginBtn");
    setDefaultEvents();
    /**
     * Handles the hardware key events.
     * @private
     * @param {Object} event - The object contains data of key event
     */
    function keyEventHandler(event) {
        if (event.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    }
    /**
     * Sets default event listeners.
     * @private
     */
    function setDefaultEvents() {
        document.addEventListener("tizenhwkey", keyEventHandler);
    }

    loginBtn.addEventListener("click", function() {
        console.log("click");
        login(loginForm);
    });

    var loggedIn = document.getElementById("BadLogin");
    loggedIn.style.visibility = "hidden"


};
var json;
var xhr = new XMLHttpRequest();
var loginForm ;
var loginBtn;

function login(form) {
    var un = form.email.value;
    var pw = form.password.value;
    loginBtn.className += " running";

    var url = "http://41.226.11.243:10003/api/users/login";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");



    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            json = JSON.parse(xhr.responseText);

            console.log(json);

            localStorage.setItem("loginDetails", json.userId);
            localStorage.setItem("Atoken", json.id);

            console.log("login ", localStorage.getItem("loginDetails"));

            loginResults();
            console.log("not error");

        } else {
            loginResults();
            console.log("error ", xhr.statusText);

        }
    }

    var data = JSON.stringify({ "email": un, "password": pw });
    xhr.send(data);
    console.log(xhr.statusText);

}


function loginResults() {
    //var loggedIn = document.getElementById("LoggedIn");
    var badLogin = document.getElementById("BadLogin");
    if (xhr.status == 200) {

       

        location.replace("index-mobile.html");
        // navigate to home and store user details her
    } else {
        badLogin.innerHTML = "The login information you entered does not match an account in our records. Please try again.";
        badLogin.style.visibility = "visible";
        badLogin.style.display = "block";
        loginForm.email.select();
        loginForm.email.className = "validate invalid";
        loginForm.password.className = "validate invalid";
        loginBtn.className = "button ld-over";

        /* setTimeout(function() {
            badLogin.style.display = 'none';
        }, 3000);*/
    }
}