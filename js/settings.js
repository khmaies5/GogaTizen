var settingsForm = document.getElementById("SettingsForm");

window.onload = function() {
    /* document.getElementById("loginBtn").addEventListener("click", function() {
          console.log("click");
           login(loginForm);
       });*/


    settings(settingsForm);

}

var xhr = new XMLHttpRequest();
var name = localStorage.getItem("username");

function settings(form) {
    form.username.value = localStorage.getItem("username");
    form.email.value = localStorage.getItem("email");


    console.log("profile ", localStorage.getItem("username"));
    var photo1 = localStorage.getItem("profilepicture");

    document.getElementById("photo").src = "https://goga-api.herokuapp.com/api/attachments/profilepicture/download/" + photo1;
    document.getElementById("photo2").src = "https://goga-api.herokuapp.com/api/attachments/profilepicture/download/" + photo1;
    console.log("photo", localStorage.getItem("profilepicture"));

    document.getElementById("name").innerHTML = name;



    /* var url = "https://goga-api.herokuapp.com/api/users/login";
     xhr.open("POST", url, true);
     xhr.setRequestHeader("Content-Type", "application/json");



     xhr.onreadystatechange = function() {
         if (xhr.readyState == 4 && xhr.status == 200) {
             json = JSON.parse(xhr.responseText);

             console.log(json);

             localStorage.setItem("loginDetails", json.userId);
             console.log("login ", localStorage.getItem("loginDetails"));

             loginResults();
             console.log("not error");

         } else {
             console.log("error");
             loginResults()
         }
     }

     var data = JSON.stringify({ "email": un, "password": pw });
     xhr.send(data);
     console.log(xhr.status);*/

}


function changeProfile() {
    var username = settingsForm.username.value;
    var email = settingsForm.email.value;
    var password = settingsForm.username.value;

    var userId = localStorage.getItem("loginDetails");

    var url = "https://goga-api.herokuapp.com/api/users/" + userId;
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");



    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            json = JSON.parse(xhr.responseText);

            console.log(json);




            console.log("not error");
            location.replace("index-mobile.html");

        } else {
            console.log("error");
            location.replace("404.html");
        }
    }

    var data = JSON.stringify({ "email": email, "password": password, "username": username });
    xhr.send(data);
    console.log(xhr.status);


}