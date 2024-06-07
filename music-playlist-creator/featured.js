// get random song function
let playlists = data["playlists"];
let random_playlist = playlists[ Math.floor( Math.random() * playlists.length) ]
console.log(random_playlist)

document.getElementById("featured_image").setAttribute("src", random_playlist["playlist_art"])
document.getElementById("featured_name").textContent = random_playlist["playlist_name"];

let all_playlist_songs = random_playlist["songs"]

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

    document.getElementById("featuredSongs").appendChild(new_div);

 }

 // more appropriate would be to check if button exists
 try {
   // event listender for featured page
   document.getElementById("go_to_home").addEventListener("click", ()=> {
      let link_home = document.createElement("a");
      link_home.setAttribute("href", "index.html");

      link_home.click()
   })
 } catch (error) {
   
 }

 