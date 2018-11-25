window.onload = function() {
    var posts;
    // loadUserDetails();

    var photo1 = localStorage.getItem("profilepicture");
    var name = localStorage.getItem("username");
    document.getElementById("photo2").src = "https://goga-api.herokuapp.com/api/attachments/profilepicture/download/" + photo1;
    document.getElementById("photo3").src = "https://goga-api.herokuapp.com/api/attachments/profilepicture/download/" + photo1;
    document.getElementById("Name").innerHTML = name;
    document.getElementById("name").innerHTML = name;

    loadData().then(data => {

        console.log("count elemnt ",data.length);
if(data.length>0)
        {
            
            for (var e in data) {
          


            if (data[e].upvotes.indexOf(userId) == -1) {

                posts += `<div class="card gedf-card">
        <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="mr-2">
                        <img class="rounded-circle" width="45" src="https://goga-api.herokuapp.com/api/attachments/profilepicture/download/${data[e].user.profilepicture}" alt="">
                    </div>
                    <div class="ml-2">
                        <div class="h5 m-0">${data[e].user.username}</div>
                    </div>
                </div>
              
            </div>

        </div>
        <div class="card-body">
            <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i><span data-livestamp="${data[e].datepublication}"></span></div>
            <div class="entry">
            <span class="category">Funny</span>
            <img src= "https://goga-api.herokuapp.com/api/attachments/images/download/${data[e].type}" onError="this.onerror=null;this.src='./img/loadingcat.gif';" alt="">
            <h5><a href="#">${data[e].title}</a></h5>
           
        </div>

        </div>
        <div class="card-footer">
           <a  onclick="Like('${data[e].id}',event)" class="card-link"><i  id="${data[e].id}" class="fa fa-gittip"></i>&nbsp${data[e].numberOfUpVotes} Like</a>
            <a href="#" onclick="openComments('${data[e].id}','${data[e]}',event);" class="card-link"><i class="fa fa-comment"></i> Comment</a>
            </div>
    </div>`
            } else {
                posts += `<div class="card gedf-card">
    <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex justify-content-between align-items-center">
                <div class="mr-2">
                    <img class="rounded-circle" width="45" src="https://goga-api.herokuapp.com/api/attachments/profilepicture/download/${data[e].user.profilepicture}" alt="">
                </div>
                <div class="ml-2">
                    <div class="h5 m-0">${data[e].user.username}</div>
                </div>
            </div>
          
        </div>

    </div>
    <div class="card-body">
        <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i><span data-livestamp="${data[e].datepublication}"></span></div>
        <div class="entry">
        <span class="category">Funny</span>
        <img src="https://goga-api.herokuapp.com/api/attachments/images/download/${data[e].type}
        " onError="this.onerror=null;this.src='./img/loadingcat.gif';" alt="">
        <h5><a href="#">${data[e].title}</a></h5>
       
    </div>

    </div>
    <div class="card-footer">
       <a  onclick="Like('${data[e].id}',event)" class="card-link"><i style="color:red;" id="${data[e].id}" class="fa fa-gittip"></i>&nbsp${data[e].numberOfUpVotes} Like</a>
        <a href="#" onclick="openComments('${data[e].id}',JSON.stringify(${data[e]}),event);" class="card-link"><i class="fa fa-comment"></i> Comment</a>
        </div>
</div>`
            }
        }
        $('#myList1').append(posts);
    }else {
        $('#myList1').append(`<div class="row">
        <div class="col s12">
            <div class="entry">
                <span class="category">Funny</span>
                <img src="./img/empty.gif" alt="">
                <h5><a href="new-post.html">nothing here </a></h5>
                <span class="author">By <a href="new-post.html">Admin</a></span>
                <p>try to upload post</p>
            </div>
        </div>
    </div>`);

    }
        


    }).catch(err => {

        console.log(err)
        $('#myList1').append(`<div class="row">
      <div class="col s12">
          <div class="entry">
              <span class="category">Funny</span>
              <img src="./img/loadingcat.gif" alt="">
              <h5><a href="#">error</a></h5>
              <span class="author">By <a href="#">Admin</a></span>
              <p>${err}</p>
          </div>
      </div>
  </div>`);

    })





}
var userId = localStorage.getItem("loginDetails");
const loadData = async() => {

    const url = "https://goga-api.herokuapp.com/api/users/" + userId + "/posts?filter=%7B%22order%22%3A%22datepublication%20DESC%22%7D";



    let data = (await fetch(url)).json();

    return data;
}




function loadPosts() {
    var xhr = new XMLHttpRequest();

    var url = "https://goga-api.herokuapp.com/api/posts?filter=%7B%22order%22%3A%22datepublication%20DESC%22%7D";
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
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
            $('#myList1').append(`<div class="row">
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
        } else {
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
            $('#myList1').append(`<div class="row">
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