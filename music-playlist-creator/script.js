

let all_playlists = data["playlists"];

// add a heart on click

document.getElementById("reactions").addEventListener("click", () => {
   alert("clicked")
})

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
   console.log(all_playlist_songs);
   

   for (let i = 0; i < all_playlist_songs.length; i++){
      let single_song = all_playlist_songs[i];

      let new_div = document.createElement("div");

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
}

span.onclick = function() {
   modal.style.display = "none";
}
window.onclick = function(event) {
   if (event.target == modal) {
      modal.style.display = "none";
   }
}

