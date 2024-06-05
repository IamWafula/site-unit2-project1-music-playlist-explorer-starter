

let all_playlists = data["playlists"];

for (let playlist in all_playlists){
   console.log(all_playlists[playlist]);

   let playlist_art = all_playlists[playlist].playlist_art;
   let playlist_name =  all_playlists[playlist].playlist_name;
   let creator_name =  all_playlists[playlist].playlist_creator;
   let songs = all_playlists[playlist].songs;
   let likes = all_playlists[playlist].likeCount;



   let new_article = document.createElement("article")
   new_article.innerHTML = `
      <div id="play_image" style="background-image: url(` + playlist_art + `);"></div>

               <div id="playlist_det">
                  <div id="play_name">
                        <h3>`+playlist_name+`</h3>
                        <p>`+creator_name+`</p>  
                  </div>
                                 
                  <div id="reactions">
                        <i class="fa fa-heart" style="font-size:20px; color:red"></i>
                        <p>`+ likes +`</p>
                  </div>
               </div>             
      `

   new_article.addEventListener("click", ()=> {
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

