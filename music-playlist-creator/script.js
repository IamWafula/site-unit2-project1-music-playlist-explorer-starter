

let all_playlists = data["playlists"];

// add items to side featured



// get allplaylist and add them to the home page

function updateMainPage(){
   all_playlists = data["playlists"]

   document.getElementById("main_section").innerHTML = `
         <article style="display: block; padding-top: 2%;" onclick="openformModal(null)" >
            <div class="play_image" style="background-image: url('/music-playlist-creator/assets/img/plus_synbol.png')"></div>
         </article> 
   `
   
   for (let playlist in all_playlists){

      let playlist_art = all_playlists[playlist].playlist_art;
      let playlist_name =  all_playlists[playlist].playlist_name;
      let creator_name =  all_playlists[playlist].playlist_creator;
      let songs = all_playlists[playlist].songs;
      let likes = all_playlists[playlist].likeCount;
      let id = all_playlists[playlist].playlistID;

      let new_article = document.createElement("article")
      new_article.innerHTML = `
         <i class="fa fa-trash" style="font-size:20px; z-index:1; color:red; background-color:white"></i>

         <div class="play_image" style="background-image: url(` + playlist_art + `);">             
         </div>
         <div id="playlist_det">
            
            <div id="play_name">
                  <h3>`+playlist_name+`</h3>
                  
                  <p>`+creator_name+`</p>  
                  
            </div>
                           
            <div id="reactions">
                  <i class="fa fa-edit" style="font-size:20px; padding-right:10px"></i>

                  <i class="fa fa-heart-o" style="font-size:20px"></i>
                  
                  <p>`+ likes +`</p>
                  
            </div>
            
         </div>             
         `

      let reactions_div = new_article.childNodes[5].childNodes[3]
      reactions_div.childNodes[3].addEventListener("click", ()=> {

         if (reactions_div.childNodes[3].getAttribute("class") == "fa fa-heart-o"){
            reactions_div.childNodes[3].setAttribute("class", "fa fa-heart");
            reactions_div.childNodes[3].setAttribute("style", "font-size:20px;color:red");
            
            // get current value, parse it to int and then increment by 1
            reactions_div.childNodes[5].innerText = parseInt(reactions_div.childNodes[5].innerText) + 1;
         } else {         
            reactions_div.childNodes[3].setAttribute("class", "fa fa-heart-o");
            reactions_div.childNodes[3].setAttribute("style", "font-size:20px;");

            reactions_div.childNodes[5].innerText = 0;

         }

         
      })


      reactions_div.childNodes[1].addEventListener("click", ()=>{
         currentPlaylistId = id;
         openformModal(
            {
               "id": id,
               "name": playlist_name,
               "creator": creator_name,
               "image" : playlist_art,
               "songs": songs
            }
         )
      })
      
      new_article.childNodes[3].addEventListener("click", ()=> {
         openModal({name: playlist_name, imageUrl: playlist_art, all_songs: songs})
      })

      document.getElementById("main_section").appendChild(new_article)

      new_article.childNodes[1].addEventListener("click", ()=> {
         
         data["playlists"].splice(currentPlaylistId,1);
         
         new_article.remove()
      })

   }
}


updateMainPage()

// JavaScript for Opening and Closing the Modal
var modal = document.getElementById("playlistModal");
var formModal = document.getElementById("formModal");
var span = document.getElementsByClassName("close")[0];
let currentPlaylistId;

function openModal(festival) {
   document.getElementById('playlistName').innerText = festival.name;
   document.getElementById('playlistImage').src = festival.imageUrl;

   let all_playlist_songs = festival.all_songs;

   document.getElementById("playlistSongs").innerHTML = ``
   
   for (let i = 0; i < all_playlist_songs.length; i++){
      let single_song = all_playlist_songs[i];

      let new_div = document.createElement("li");

      new_div.innerHTML = `
         <image id="article_image" src="` + single_song.cover_art + `" />
         <div id="songDetails">
            <p>`+ single_song.title +`</p>
            <p>` + single_song.artist + `</p>
            <p>` + single_song.album + ` </p>
         </div>
         <p id="song_timer">` + single_song.duration + `</p>
      `


      new_div.setAttribute("id", "playlistSong");
            
      document.getElementById("playlistSongs").appendChild(new_div);

   }
   
   modal.style.display = "block";
   let all_songs;
   all_songs = [...document.getElementById("playlistSongs").childNodes];

   
   // shuffle function


   document.getElementById("shuffle").addEventListener("click", ()=>{
      let list_songs = document.getElementById("playlistSongs");

      for (let i = list_songs.children.length; i>=0; i--){
         list_songs.appendChild(list_songs.children[Math.random()*i | 0]);
      }
              
   })

}


function readImage(input){
   let playlist_details = input.currentTarget.parentNode;
   let image_holder = playlist_details.children[0];



   var reader = new FileReader();

   reader.onload = function (e) {
      
      image_holder.setAttribute("alt", image_holder.getAttribute("src") )

      image_holder.setAttribute('src', e.target.result)      
      
      // image_holder.setAttribute('src', "/music-playlist-creator/assets/img/post_malone.jpg")
   }

   reader.readAsDataURL(input.srcElement.files[0])
}


// open form Modal 
function openformModal(playlist) {
   formModal.style.display = "block";

   if (playlist){
      //add playlist details
      currentPlaylistId = playlist.id;



      let form_details = formModal.children[0]
      
      form_details[0].value = playlist.name;
      
      
      document.getElementById("form_playlistSongs").innerHTML = ''
      

      for (let i = 0; i<playlist.songs.length; i++){
         let song = playlist.songs[i]
         let edit_song = document.createElement("li")
         
         edit_song.innerHTML = 
         `
            <div id="playlist_image_input">
               <image width="100px" src="`+ song.cover_art +`" class="new_article_image" id="article_image" height="100px" ></image>
               <input type="file" title="" >                            
            </div>

            <div id="songDetails">
               <input type="text"  placeholder="Song Name" value="`+song.title+`">
               <input type="text" placeholder="Song Artist" value="`+song.artist+`">
               <input type="text"  placeholder="Song Album" value="`+song.album+`">
            </div>

            <input id="new_duration" type="text" placeholder="song Duration" value="`+song.duration+`">  
         `
         
         edit_song.setAttribute("class", "new_song")

         edit_song.children[0].children[1].addEventListener("change", readImage)

         form_details.children[3].appendChild(edit_song)
      }

      document.getElementById("save_playlist").addEventListener("click", savePlaylist)

   }else{      
      document.getElementById("formModal").innerHTML = `
         <form class="modal-content">            
            <div id="playlist_details">                               
               <input required id="form_playlistName" name="form_playlist_name" placeholder="playlist title 🖊️">
               <img required id="form_playlistImage" src="/music-playlist-creator/assets/img/playlist.png" alt="Festival Image">
            </div>

            <button class="button-5" id="form_add_song">add song</button>
            <button type="submit" class="button-5" id="save_playlist">save</button>

            <ul id="form_playlistSongs">
               
               
            </ul>

         </form>
      `

      document.getElementById("form_add_song").addEventListener("click", (target)=> {
   
         target.preventDefault();
      
         let main_form = document.getElementById("form_playlistSongs");
      
         let new_song = document.createElement("li");
      
         new_song.innerHTML = `      
               <div id="playlist_image_input">
                  <image width="100px" src="/music-playlist-creator/assets/img/song.png" class="new_article_image" id="article_image" height="100px" onchange="readImage(this);"></image>
                  <input type="file" title="" >                            
               </div>
      
               <div id="songDetails">
                  <input required type="text"  placeholder="Song Name">
                  <input required type="text" placeholder="Song Artist">
                  <input required type="text"  placeholder="Song Album">
               </div>
               <input id="new_duration" type="text" placeholder="duration">                              
         `   

         new_song.setAttribute("class", "new_song")

         new_song.children[0].children[1].addEventListener("change", readImage)

         main_form.appendChild(new_song);
      })
      
      document.getElementById("save_playlist").addEventListener("click", saveNewPlaylist)

   }
}

// for testing Modal, comment out when done
let playlist_art = all_playlists[0].playlist_art;
let playlist_name =  all_playlists[0].playlist_name;
let creator_name =  all_playlists[0].playlist_creator;
let songs = all_playlists[0].songs;
let likes = all_playlists[0].likeCount;

// openModal({name: playlist_name, imageUrl: playlist_art, all_songs: songs})
// openformModal(null)

span.onclick = function() {
   modal.style.display = "none";
}
window.onclick = function(event) {
   if (event.target == modal || event.target == formModal) {
      modal.style.display = "none";
      formModal.style.display = "none";
   }
}

// event listender for featured page
document.getElementById("go_to_featured").addEventListener("click", ()=> {
   let link_home = document.createElement("a");
   link_home.setAttribute("href", "featured.html");

   link_home.click()
})

// uri to url
const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
}))

function saveNewPlaylist(target) {
   target.preventDefault()

   let form_details = formModal.getElementsByTagName("form")[0];

   let new_playlist_name = form_details.children[0].children[0].value;

   let all_new_songs = document.getElementsByClassName("new_song");

   let all_songs = []

   for (let i=0; i<all_new_songs.length; i++){
      let song = all_new_songs[i];

      let songName = song.children[1].children[0].value;
      let songArtist = song.children[1].children[1].value;
      let songAlbum = song.children[1].children[2].value;
      

      image_uri = song.children[0].children[1].getAttribute("src");
      // console.log(image_uri,  song.children[0].children[0].getAttribute("src"))
      let songCover = song.children[0].children[0].getAttribute("src");
      //let songCover = "/music-playlist-creator/assets/img/post_malone.jpg"
      toDataURL( song.children[0].children[0].getAttribute("src")).then(dataURL => {
         songCover = dataURL;
      })
      

      let songDuration = song.children[2].value;

      if (songName && songArtist && songAlbum && songCover && songDuration){
         all_songs.push({
            "songID": i,
            "title": songName,
            "artist": songArtist,
            "album": songAlbum,
            "cover_art": songCover,
            "duration": songDuration
         })
      }      
   }
   
   // update data and refresh main page
   // data["playlists"][currentPlaylistId].songs = all_songs;

   data["playlists"].push({
      "playlistID": data["playlists"].length,
      "playlist_name": new_playlist_name,
      "playlist_creator": "user",
      "playlist_art": "https://picsum.photos/id/36/200",
      "likeCount": 0,
      "songs" : all_songs
   })

      
   updateMainPage()

}


// save current input playlists

function savePlaylist(target){
   target.preventDefault()

   let form_details = formModal.getElementsByTagName("form")[0];

   let new_playlist_name = form_details.childNodes[1].childNodes[3].value;

   let all_new_songs = document.getElementsByClassName("new_song");

   let all_songs = []

   for (let i=0; i<all_new_songs.length; i++){
      let song = all_new_songs[i];

      let songName = song.children[1].children[0].value;
      let songArtist = song.children[1].children[1].value;
      let songAlbum = song.children[1].children[2].value;
      

      image_uri = song.children[0].children[1].getAttribute("src");
      // console.log(image_uri,  song.children[0].children[0].getAttribute("src"))
      let songCover = song.children[0].children[0].getAttribute("src");
      //let songCover = "/music-playlist-creator/assets/img/post_malone.jpg"
      toDataURL( song.children[0].children[0].getAttribute("src")).then(dataURL => {
         songCover = dataURL;
      })
      

      let songDuration = song.children[2].value;

      if (songName && songArtist && songAlbum && songCover && songDuration){
         all_songs.push({
            "songID": i,
            "title": songName,
            "artist": songArtist,
            "album": songAlbum,
            "cover_art": songCover,
            "duration": songDuration
         })
      }      
   }
   
   console.log(currentPlaylistId)
   // update data and refresh main page
   data["playlists"][currentPlaylistId].songs = all_songs;
      
   updateMainPage()


}

document.getElementById("add_song").addEventListener("click", (target)=> {
   
   target.preventDefault();

   let main_form = document.getElementById("form_playlistSongs");

   let new_song = document.createElement("li");

   new_song.innerHTML = `      
         <div id="playlist_image_input">
            <image alt="new" width="100px" src="/music-playlist-creator/assets/img/playlist.png" class="new_article_image" id="article_image" height="100px" onchange="readImage(this);"></image>
            <input type="file" title="" >                            
         </div>

         <div id="songDetails">
            <input type="text"  placeholder="Song Name">
            <input type="text" placeholder="Song Artist">
            <input type="text"  placeholder="Song Album">
         </div>
         <input id="new_duration" type="text" placeholder="duration">                              
   `   
   new_song.setAttribute("class", "new_song");

   new_song.children[0].children[1].addEventListener("change", readImage)

   main_form.appendChild(new_song);
})



// filter songs
function filterSongs(){
   let search_term = document.getElementById("search_input").value;
   let all_playlists = document.getElementById("main_section").children
   for (let i = 1; i < all_playlists.length; i++){
      let playlist = all_playlists[i]

      let play_details = playlist.children[2]
      let play_name = play_details.children[0].children[0].innerText;
      let play_author = play_details.children[0].children[1].innerText;
      

      if( play_name.toLowerCase().indexOf(search_term.toLowerCase()) > -1 || play_author.toLowerCase().indexOf(search_term.toLowerCase()) > -1 ) {
         playlist.style.display = "block";
      } else {
         playlist.style.display = "none";
      }
   }
}