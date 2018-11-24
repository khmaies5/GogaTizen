var registerForm = document.getElementById("RegisterForm");

window.onload = function() {

    document.getElementById("register").addEventListener("click", function() {
        console.log("click");
        register(registerForm);
    });


}

var xhr = new XMLHttpRequest();

function register(form) {


    var un = form.email.value;
    var pw = form.password.value;
    var uname = form.username.value;
    var lname = form.lastname.value;
    var fname = form.firstname.value;

    var url = "https://goga-api.herokuapp.com/api/users";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");



    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json);
            loginResults();
            console.log("not error");

        } else {
            console.log("error");
            loginResults()
        }
    }

    var data = JSON.stringify({ "email": un, "password": pw, "username": uname, "lastname": lname, "firstname": fname });
    xhr.send(data);
    console.log(xhr.status);

}

function loginResults() {


    if (xhr.status == 200) {
        location.replace("login.html");

    } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'some thing happened :/';

    }
}

var check = function() {
    if (document.getElementById('password').value ==
        document.getElementById('confirm_password').value) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'matching';
        document.getElementById('confirm_password').className = "validate";
    } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'not matching';
        document.getElementById('confirm_password').className = "validate invalid";
    }
}