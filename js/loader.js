var userId;
window.onload = function() {

    this.userId = localStorage.getItem("loginDetails");

    setTimeout(function() {

        checkDetails();

    }, 3000);





}

function checkDetails() {

    if (this.userId) {

        location.replace("index-mobile.html");

    } else {
        location.replace("login.html");

    }
}