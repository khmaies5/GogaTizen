window.onload = function() {
    document.getElementById("loginBtn").addEventListener("click", function() {
        console.log("click");
         login(loginForm);
     });

     var loggedIn = document.getElementById("BadLogin");
        loggedIn.style.visibility = "hidden"


    }
    var json;
var xhr = new XMLHttpRequest();
var loginForm = document.getElementById("LoginForm");

function login(form) {
    var un = form.email.value;
    var pw = form.password.value;

    var url = "https://goga-api.herokuapp.com/api/users/login";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");


   
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
             json = JSON.parse(xhr.responseText);
             
            console.log(json);
     
            localStorage.setItem("loginDetails", json.userId);
            console.log("login ",localStorage.getItem("loginDetails"));

            loginResults();
            console.log("not error");

        }else {
            console.log("error");
            loginResults()}
    } 

    var data = JSON.stringify({"email": un, "password": pw});
        xhr.send(data);
        console.log(xhr.status);

}


 function loginResults() {
    //var loggedIn = document.getElementById("LoggedIn");
    var badLogin = document.getElementById("BadLogin");
    if (xhr.status == 200) {
        badLogin.innerHTML = "Logged in as " + xhr.responseText;

        badLogin.style.visibility = "visible";

        badLogin.style.display = "block";
       // loginForm.style.display = "none";
      
       location.replace("index-mobile.html");
       // navigate to home and store user details her
    } else {
        badLogin.innerHTML = `The login information you entered does not match 
        an account in our records. Please try again.`
        badLogin.style.visibility = "visible";
        badLogin.style.display = "block";
        loginForm.email.select();
        loginForm.email.className = "validate invalid";
        loginForm.password.className = "validate invalid";
               /* setTimeout(function() {
            badLogin.style.display = 'none';
        }, 3000);*/
    }
}