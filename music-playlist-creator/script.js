

let all_playlists = data["playlists"];

// add items to side featured



// get allplaylist and add them to the home page
for (let playlist in all_playlists){

   let playlist_art = all_playlists[playlist].playlist_art;
   let playlist_name =  all_playlists[playlist].playlist_name;
   let creator_name =  all_playlists[playlist].playlist_creator;
   let songs = all_playlists[playlist].songs;
   let likes = all_playlists[playlist].likeCount;



   let new_article = document.createElement("article")
   new_article.innerHTML = `
      <div class="play_image" style="background-image: url(` + playlist_art + `);"></div>

      <div id="playlist_det">
         <div id="play_name">
               <h3>`+playlist_name+`</h3>
               <p>`+creator_name+`</p>  
         </div>
                        
         <div id="reactions">
               <i class="fa fa-heart-o" style="font-size:20px"></i>
               <p>`+ likes +`</p>
         </div>
      </div>             
      `


   let reactions_div = new_article.childNodes[3].childNodes[3]
   reactions_div.childNodes[1].addEventListener("click", ()=> {

      if (reactions_div.childNodes[1].getAttribute("class") == "fa fa-heart-o"){
         reactions_div.childNodes[1].setAttribute("class", "fa fa-heart");
         reactions_div.childNodes[1].setAttribute("style", "font-size:20px;color:red");
         
         // get current value, parse it to int and then increment by 1
         reactions_div.childNodes[3].innerText = parseInt(reactions_div.childNodes[3].innerText) + 1;
      } else {         
         reactions_div.childNodes[1].setAttribute("class", "fa fa-heart-o");
         reactions_div.childNodes[1].setAttribute("style", "font-size:20px;");

         reactions_div.childNodes[3].innerText = 0;

      }

      
   })
   

   new_article.childNodes[1].addEventListener("click", ()=> {
      openModal({name: playlist_name, imageUrl: playlist_art, all_songs: songs})
   })

   document.getElementById("main_section").appendChild(new_article)

   
}

// JavaScript for Opening and Closing the Modal
var modal = document.getElementById("playlistModal");
var span = document.getElementsByClassName("close")[0];

function openModal(festival) {
   document.getElementById('playlistName').innerText = festival.name;
   document.getElementById('playlistImage').src = festival.imageUrl;

   let all_playlist_songs = festival.all_songs;
   
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


   document.getElementsByClassName("shuffle")[0].addEventListener("click", ()=>{
      let list_songs = document.querySelector("ul");

      for (let i = list_songs.children.length; i>=0; i--){
         list_songs.appendChild(list_songs.children[Math.random()*i | 0]);
      }
              
   })

   
}

// for testing Modal, comment out when done
let playlist_art = all_playlists[0].playlist_art;
let playlist_name =  all_playlists[0].playlist_name;
let creator_name =  all_playlists[0].playlist_creator;
let songs = all_playlists[0].songs;
let likes = all_playlists[0].likeCount;

// openModal({name: playlist_name, imageUrl: playlist_art, all_songs: songs})

span.onclick = function() {
   modal.style.display = "none";
}
window.onclick = function(event) {
   if (event.target == modal) {
      modal.style.display = "none";
   }
}

// event listender for featured page
document.getElementById("go_to_featured").addEventListener("click", ()=> {
   let link_home = document.createElement("a");
   link_home.setAttribute("href", "featured.html");

   link_home.click()
})
