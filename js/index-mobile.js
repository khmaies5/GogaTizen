window.onload = function() {
    var posts;
loadUserDetails();

loadData().then(data=>{

    for(var e in data){
        console.log(data[e]);
        posts += `<div class="row">
        <div class="col s12">
            <div class="entry">
                <span class="category">Funny</span>
                <img src="https://goga-api.herokuapp.com/api/attachments/images/download/${data[e].type}" alt="">
                <h5><a href="#">${data[e].title}</a></h5>
                <span class="author">By <a href="#">Mario Doe</a></span>
                <p>Lorem ipsum dolor sit amet consectetur</p>
            </div>
        </div>
    </div>`
    }
     $('#myList').append(posts);


}).catch(err=>{

    console.log(err)
      $('#myList').append(`<div class="row">
      <div class="col s12">
          <div class="entry">
              <span class="category">Funny</span>
              <img src="img/loading.gif" alt="">
              <h5><a href="#">error</a></h5>
              <span class="author">By <a href="#">Admin</a></span>
              <p>${err}</p>
          </div>
      </div>
  </div>`);

})



      

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


const loadData = async () => {
   const url = "https://goga-api.herokuapp.com/api/posts?filter=%7B%22order%22%3A%22datepublication%20DESC%22%7D";

  
      
      let data =  (await fetch(url)).json();
      
    return data;
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
                   <img src="https://goga-api.herokuapp.com/api/attachments/images/download/${json.type}" alt="">
                   <h5><a href="#">${json.title}</a></h5>
                   <span class="author">By <a href="#">Mario Doe</a></span>
                   <p>Lorem ipsum dolor sit amet consectetur</p>
               </div>
           </div>
       </div>`
       $('#myList').append(`<div class="row">
       <div class="col s12">
           <div class="entry">
               <span class="category">Funny</span>
               <img src="https://goga-api.herokuapp.com/api/attachments/images/download/${json.type}" alt="">
               <h5><a href="#">${json.title}</a></h5>
               <span class="author">By <a href="#">Mario Doe</a></span>
               <p>Lorem ipsum dolor sit amet consectetur</p>
           </div>
       </div>
   </div>`);
        }else {
            console.log("error");
            var posts = `<div class="row">
            <div class="col s12">
                <div class="entry">
                    <span class="category">Funny</span>
                    <img src="/img/loading.gif" alt="">
                    <h5><a href="#">Error</a></h5>
                    <span class="author">By <a href="#">Admin</a></span>
                    <p>Lorem ipsum dolor sit amet consectetur</p>
                </div>
            </div>
        </div>`
            $('#myList').append(`<div class="row">
            <div class="col s12">
                <div class="entry">
                    <span class="category">Funny</span>
                    <img src="/img/loading.gif" alt="">
                    <h5><a href="#">Error</a></h5>
                    <span class="author">By <a href="#">Admin</a></span>
                    <p>Lorem ipsum dolor sit amet consectetur</p>
                </div>
            </div>
        </div>`);
         //   loginResults()}
    } 


}
xhr.send();

}