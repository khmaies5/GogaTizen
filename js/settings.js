var settingsForm = document.getElementById("SettingsForm");

window.onload = function() {
    /* document.getElementById("loginBtn").addEventListener("click", function() {
          console.log("click");
           login(loginForm);
       });*/


       

    setDefaultEvents();
    /**
     * Handles the hardware key events.
     * @private
     * @param {Object} event - The object contains data of key event
     */
    function keyEventHandler(event) {
        if (event.keyName === "back") {
                try {
                        window.history.back();
                } catch (ignore) {
                        tizen.application.getCurrentApplication().exit();

                }
        }
}
    /**
     * Sets default event listeners.
     * @private
     */
    function setDefaultEvents() {
        document.addEventListener("tizenhwkey", keyEventHandler);
    }

           
    settings(settingsForm);

}

var xhr = new XMLHttpRequest();
var name = localStorage.getItem("username");

function settings(form) {
    form.username.value = localStorage.getItem("username");
    form.email.value = localStorage.getItem("email");


    console.log("profile ", localStorage.getItem("username"));
    var photo1 = localStorage.getItem("profilepicture");

    document.getElementById("photo").src = "http://41.226.11.243:10003/api/attachments/profilepicture/download/" + photo1;
    document.getElementById("photo2").src = "http://41.226.11.243:10003/api/attachments/profilepicture/download/" + photo1;
    console.log("photo", localStorage.getItem("profilepicture"));

    document.getElementById("name").innerHTML = name;

}


function changeProfile() {
    var username = settingsForm.username.value;
    var email = settingsForm.email.value;
    var password = settingsForm.username.value;

    var userId = localStorage.getItem("loginDetails");

    var url = "http://41.226.11.243:10003/api/users/" + userId;
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