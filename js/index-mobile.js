window.onload = function() {

loadUserDetails();



}

function loadUserDetails(){
    console.log(localStorage.getItem("loginDetails"));
    var xhr = new XMLHttpRequest();

   var userId = localStorage.getItem("loginDetails");
    var url = "https://goga-api.herokuapp.com/api/users/"+userId;
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");


   
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json);
            //loginResults();
            console.log("not error");
            document.getElementById("name").innerHTML = json.username

        }else {
            console.log("error");
         //   loginResults()}
    } 


}
xhr.send();

}