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

function loadPosts(){
    var xhr = new XMLHttpRequest();

    var url = "https://goga-api.herokuapp.com/api/posts?filter=%7B%22order%22%3A%22datepublication%20DESC%22%7D";
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
 
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json);
            //loginResults();
           var posts = `<div class="row">
           <div class="col s12">
               <div class="entry">
                   <span class="category">Funny</span>
                   <img src="img/post2.jpg" alt="">
                   <h5><a href="#">Crazy really shows you have to try</a></h5>
                   <span class="author">By <a href="#">Mario Doe</a></span>
                   <p>Lorem ipsum dolor sit amet consectetur</p>
               </div>
           </div>
       </div>`

        }else {
            console.log("error");
         //   loginResults()}
    } 


}
xhr.send();

}