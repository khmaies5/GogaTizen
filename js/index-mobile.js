window.onload = function() {
    var posts;
loadUserDetails();

loadData().then(data=>{

    for(var e in data){
        console.log(data[e]);
        posts += `<div class="card gedf-card">
        <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="mr-2">
                        <img class="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="">
                    </div>
                    <div class="ml-2">
                        <div class="h5 m-0">@LeeCross</div>
                        <div class="h7 text-muted">Miracles Lee Cross</div>
                    </div>
                </div>
                <div>
                    <div class="dropdown">
                        <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-ellipsis-h"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                            <div class="h6 dropdown-header">Configuration</div>
                            <a class="dropdown-item" href="#">Save</a>
                            <a class="dropdown-item" href="#">Hide</a>
                            <a class="dropdown-item" href="#">Report</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="card-body">
            <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i>10 min ago</div>
            <div class="entry">
            <span class="category">Funny</span>
            <img src="https://goga-api.herokuapp.com/api/attachments/images/download/${data[e].type}
            " alt="">
            <h5><a href="#">${data[e].title}</a></h5>
           
        </div>

        </div>
        <div class="card-footer">
            <a href="#" class="card-link"><i class="fa fa-gittip"></i> Like</a>
            <a href="#" class="card-link"><i class="fa fa-comment"></i> Comment</a>
            <a href="#" class="card-link"><i class="fa fa-mail-forward"></i> Share</a>
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