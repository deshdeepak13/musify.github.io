console.log("Welcome to Musify")

let currentSong=new Audio();
let songs;
// console.log(songs)
let currFolder;

async function getSongs(folder) {
    
    currFolder=folder
    // console.log(currFolder)
    let stringnew = `${folder}`;
    console.log(stringnew)  
    let a = await fetch(`/${folder}`);
    // console.log(a)
    let response  = await a.text();
    // console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    // console.log(as)
    songs=[]
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        // console.log(element)
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
            
        }
        
    }

                                                        // Adding songs to library

let songUL=document.querySelector(".songList").getElementsByTagName("ul")[0]
songUL.innerHTML=""
for (const song of songs) {
    songUL.innerHTML += `<li> 
            <img src="svg/song.svg" alt="" class="invert">
            <div class="info">
                <div>${song.replaceAll("%20"," ").split("-")[0]} </div>
                <div>${song.replaceAll("%20"," ").split("-")[1]} </div>
            </div>
            <div class="playnow flex">
                <div>Play Now</div>
                <svg class="invert" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                    <path d="M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z" fill="currentColor" />
                </svg>
            </div>  </li>` ;
    
}


Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click",element=>{
        let x = e.querySelector(".info").getElementsByTagName("div")[0].innerHTML;
        let y = e.querySelector(".info").getElementsByTagName("div")[1].innerHTML;
        let z = `${x.slice(0,x.length-1)}-${y}`;
        // console.log(z)
        playMusic(z)

    })
    
})


return songs


}


const playMusic=(track,pause=false)=>{
    // let audio = new Audio(`/songs/${track}`);
    currentSong.src = `/${currFolder}/` + track
    if(!pause){

        currentSong.play();
        playsong.src="svg/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"


}


function formatTime(seconds) {

    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    // Ensure the input is an integer
    seconds = Math.floor(seconds);

    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Pad the minutes and seconds with leading zeros if needed
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(remainingSeconds).padStart(2, '0');

    // Return the formatted time
    return `${paddedMinutes}:${paddedSeconds}`;
}

// Example usage:
// console.log(formatTime(12));    // Output: "00:12"
// console.log(formatTime(75));    // Output: "01:15"
// console.log(formatTime(3600));  // Output: "60:00"


// // Example usage:
// console.log(formatTime(12));    // Output: "00:12"
// console.log(formatTime(75));    // Output: "01:15"
// console.log(formatTime(3600));  // Output: "60:00"


async function displayAlbums(){
    let a = await fetch("/songs");
    // console.log(a)
    let response  = await a.text();
    // console.log(response)
    // console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".card-container")
    let array = Array.from(as);
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
        
        
        if ((element.href.includes("/songs"))  && (!(element.href.endsWith("/songs")))  && (!element.href.includes(".htaccess"))) {
            // songs.push(element.href.split(`/songs/`)[1])
            let folder = element.href.split("/").slice(-1)[0]
            // console.log(folder)
            // get metadata of folder 
            let a = await fetch(`/songs/${folder}/info.json`);
            let response  = await a.json();
            // console.log(response)
            cardContainer.innerHTML += `<div data-folder=${folder} class="card rounded">
            <div id="play">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                style="width: 40%; height: 40%"
              >
                <path
                  d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
                />
              </svg>
            </div>
            <img
              src="/songs/${folder}/cover.jpeg"
              alt=""
            />
            <h2>${response.title}</h2>
            <p>${response.description}</p>
          </div>`

            
        }
    }


     // Load playlists when card is clicked
     Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item=>{
            console.log(item.currentTarget.dataset.folder)
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
            playMusic(songs[0]);
            // let screen = window.matchMedia("(max-width: 500px)")
            // if(screen.matches){
            //     document.querySelector(".left").style.left = "0";
            //     document.querySelector(".hamburger").display= "none";
            // }
            // else{}
            
            
        })
        
    });
    
        

}







async function main() {

    

    await getSongs("songs");
    console.log(currFolder)
    // console.log(songs);
    // playMusic(songs[0],true)



    // Display Albums

    await displayAlbums()
    console.log(currFolder)
    // getSongs("songs/Album-1")



    
    // time update 

    currentSong.addEventListener("timeupdate",()=>{
        // console.log(currentSong.currentTime, currentSong.duration)
        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime)/(currentSong.duration) * 100 +"%"

    })

    document.querySelector(".seekbar").addEventListener("click",e=>{
        // console.log(e.offsetX);
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100 ;
        document.querySelector(".circle").style.left = percent + "%" ; 
        currentSong.currentTime = ((currentSong.duration)*percent )/100 ;
    })


    // event listenter to hamburger

    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left = "0"
        document.querySelector(".hamburger").display= "none"

            // document.querySelector(".left").style.left = "-100%"
    })
    
    
    document.querySelector(".close-ham").addEventListener("click",()=>{
        // document.querySelector(".left").style.left = "0"
            document.querySelector(".left").style.left = "-150%"
    })


    

    
                                            // play song event listener 

playsong.addEventListener("click",()=>{
    if(currentSong.paused){
         currentSong.play()
        playsong.src="svg/pause.svg"
    }
    else{
         currentSong.pause()
        playsong.src="svg/play.svg"
    }
})



    // event listener to next and prev 

    nextsong.addEventListener("click",()=>{
        // console.log(songs);
        let index = (songs.indexOf(currentSong.src.split("/").slice(-1)[0]));
        currentSong.pause();
        playsong.src="svg/play.svg"

        if((index+1) < songs.length){
            playMusic(songs[index+1])
        }
        
    })
    
    
    prevsong.addEventListener("click",()=>{
        let index = (songs.indexOf(currentSong.src.split("/").slice(-1)[0]));
        currentSong.pause()
        playsong.src="svg/play.svg"
        
        if((index-1) >= 0){
            playMusic(songs[index-1])
        }
    })
    
    
    
    // event listener to volume
    
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
        console.log(e.target.value);
        currentSong.volume = parseInt(e.target.value) / 100
        
    })

    
                                                    // MUTE                 

    
    document.querySelector(".volume>img").addEventListener("click",(e)=>{
        // console.log(e.target);
        // console.log(e.target.src);
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg","mute.svg");
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
            currentSong.volume = 0;
            
        }
        else{
            e.target.src = e.target.src.replace("mute.svg","volume.svg");
            // e.target.src="svg/volume.svg";
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
            currentSong.volume = 0.1;

        }

    })

    let screen = window.matchMedia("(max-width: 500px)")
    if(screen.matches){
        document.querySelector(".signupbtn").innerHTML =`<img src="svg/signup.svg" alt="">`
        document.querySelector(".loginbtn").innerHTML =`<img src="svg/user.svg" alt="">`
        document.querySelector(".loginbtn").style.padding= "15px 15px";
        document.querySelector(".signupbtn").style.padding= "15px 15px";
    }
    else{
        document.querySelector(".signupbtn").innerHTML =`SignUp`
        document.querySelector(".loginbtn").innerHTML =`Log In`
        document.querySelector(".loginbtn").style.padding= "15px 30px";
        document.querySelector(".signupbtn").style.padding= "15px 30px";
    }
    screen.addEventListener("change",(e)=>{
        if(e.matches){
            document.querySelector(".signupbtn").innerHTML =`<img src="svg/signup.svg" alt="">`
            document.querySelector(".loginbtn").innerHTML =`<img src="svg/user.svg" alt="">`
            document.querySelector(".loginbtn").style.padding= "15px 15px";
            document.querySelector(".signupbtn").style.padding= "15px 15px";
        }
        else{
            document.querySelector(".signupbtn").innerHTML =`SignUp`
            document.querySelector(".loginbtn").innerHTML =`Log In`
            document.querySelector(".loginbtn").style.padding= "15px 30px";
            document.querySelector(".signupbtn").style.padding= "15px 30px";
        }

    })



    // // darkmode - lightmode 

    // ldmode.addEventListener("click",()=>{
    //     var root = document.querySelector(":root");
    //     if(ldmode.src == "svg/light.svg"){
    //     root.style.setProperty('--c', "black");
    //     root.style.setProperty('--d', "white");
    //     ldmode.src = "svg/dark.svg"
    // }
    // else{
    //     root.style.setProperty('--c', "white");
    //     root.style.setProperty('--d', "black");
    //     ldmode.src = "svg/light.svg"
    // }
    // })




}

main()
