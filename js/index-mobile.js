window.onload = function() {
    var posts = "";
    var userId = localStorage.getItem("loginDetails");
    var singlePostData;
    var user = { username: "error", profilepicture: "profile.png" };



    setDefaultEvents();
    /**
     * Handles the hardware key events.
     * @private
     * @param {Object} event - The object contains data of key event
     */
    function keyEventHandler(event) {
        if (event.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    }
    /**
     * Sets default event listeners.
     * @private
     */
    function setDefaultEvents() {
        document.addEventListener("tizenhwkey", keyEventHandler);
    }


    loadUserDetails();
    var object = {};
    loadData().then(data => {
        $('#myList2').empty();
        $('#myList').empty();
        for (var e in data) {



            object = data[e];
            console.log(object)
            if (data[e].upvotes.indexOf(userId) == -1) { posts += `<div class="card gedf-card">
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
            " alt="">
            <h5><a href="#">${data[e].title}</a></h5>
           
        </div>

        </div>
        <div class="card-footer">
           <a  onclick="Like('${data[e].id}',event)" class="card-link"><i  id="${data[e].id}" class="fa fa-gittip"></i>&nbsp${data[e].numberOfUpVotes} Like</a>
            <a href="#" onclick="openComments('${data[e].id}','${object}',event);" class="card-link"><i class="fa fa-comment"></i> Comment</a>
            <a href="#" onclick="shareFb(${data[e]});return false;"class="card-link"><i class="fa fa-mail-forward"></i> Share</a>
            </div>
    </div>` } else {
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
        " alt="">
        <h5><a href="#">${data[e].title}</a></h5>
       
    </div>

    </div>
    <div class="card-footer">
       <a  onclick="Like('${data[e].id}',event)" class="card-link"><i style="color:red;" id="${data[e].id}" class="fa fa-gittip"></i>&nbsp${data[e].numberOfUpVotes} Like</a>
        <a href="#" onclick="openComments('${data[e].id}',JSON.stringify(${data[e]}),event);" class="card-link"><i class="fa fa-comment"></i> Comment</a>
        <a href="#" onclick="shareFb(${data[e]});return false;"class="card-link"><i class="fa fa-mail-forward"></i> Share</a>
        </div>
</div>`
            }
        }

        $('#myList').append(posts);


    }).catch(err => {

        console.log(err)
        $('#myList').append(`<div class="row">
      <div class="col s12">
          <div class="entry">
              <span class="category">Funny</span>
              <img src="img/loadingcat.gif" alt="">
              <h5><a href="#">error</a></h5>
              <span class="author">By <a href="#">Admin</a></span>
              <p>${err}</p>
          </div>
      </div>
  </div>`);

    })





}




function openComments(id, data) {
    console.log(id);
    console.log(data[1])
    localStorage.setItem("postId", id);
    localStorage.setItem("postData", JSON.stringify(data));
    window.location.href = "single-post-gif.html"



}

function Like(postId, event) {
    event.preventDefault();

    var idClass = '#';
    idClass += postId;
    var Atoken = localStorage.getItem("Atoken");
    var userId =  localStorage.getItem("loginDetails");
    const url = 'https://goga-api.herokuapp.com/api/posts/'+postId+'/upvote';
    // The data we are going to send in our request
    let data = {
        userId: userId,
        access_token: Atoken
    }
    console.info(data);
    // Create our request constructor with all the parameters we need
    var request = new Request(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data)
    });

    fetch(request)
        .then(data => {
            if (data.ok) {
                console.log("like ", data)
                $(idClass).css('color', 'red');
            } else {
                console.log("dislike ", data)

                $(idClass).css('color', 'black');
                dislike(postId);
            }
            // Handle response we get from the API
        }).catch(err => {
            $(idClass).css('color', 'black');

            console.log(err)
        })

}

function checkLike() {

}

function dislike(postId) {
    var Atoken = localStorage.getItem("Atoken");
    var userId =  localStorage.getItem("loginDetails");
    const url = 'https://goga-api.herokuapp.com/api/posts/'+postId+'/downvote';
    // The data we are going to send in our request
    let data = {
        userId: userId,
        access_token: Atoken
    }
    console.info(data);
    // Create our request constructor with all the parameters we need
    var request = new Request(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data)
    });

    fetch(request)
        .then(function() {
            console.log("dislike")


            // Handle response we get from the API
        }).catch(err => console.log(err))

}


function loadUserDetails() {
    console.log(localStorage.getItem("loginDetails"));
    var photo1 = localStorage.getItem("profilepicture");

    document.getElementById("photop").src = "https://goga-api.herokuapp.com/api/attachments/profilepicture/download/" + photo1;

    var xhr = new XMLHttpRequest();

    var userId = localStorage.getItem("loginDetails");
    var url = "https://goga-api.herokuapp.com/api/users/" + userId;
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json);
            //loginResults();
            console.log("not error");
            document.getElementById("name").innerHTML = json.username
            
            localStorage.setItem("username", json.username);
            localStorage.setItem("profilepicture", json.profilepicture);


            localStorage.setItem("username", json.username);
            localStorage.setItem("profilepicture", json.profilepicture);
            localStorage.setItem("email", json.email);
        } else {
            console.log("error");
            //   loginResults()}
        }


    }
    xhr.send();

}


const loadData = async() => {
    const url = "https://goga-api.herokuapp.com/api/posts?filter=%7B%22order%22%3A%22datepublication%20DESC%22%2C%22include%22%3A%20%22user%22%7D";



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