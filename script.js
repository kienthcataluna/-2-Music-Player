const image = document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artist'),
currentTimeEl = document.getElementById('current-time'),
durationEl = document.getElementById('Duration'),
Progress = document.getElementById('progress'),
playerProgress = document.getElementById('player-Progress'),
prevBtn = document.getElementById('prev'),
nextBtn = document.getElementById('next'),
playBtn = document.getElementById('play'),
background = document.getElementById('bg-img');

const music = new Audio();

const song = [
    {
        path: 'assets/1.mp3',
        displayName: 'Blinding Lights',
        cover: 'assets/blind.jpg',
        artist: 'The Weeknd',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'MILLION DOLLAR BABY',
        cover: 'assets/richman.jpg',
        artist: 'Tommy Richman',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Runaway Baby',
        cover: 'assets/run.jpg',
        artist: 'Bruno Mars',
    }

];

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic(){
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + song.length) % song. length;
    loadMusic(song[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime} = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.tyle.width = '${progressPercent}%';

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime( duration / 60)}:${formatTime(duration % 60)}`;
    currentTimenElo.textContent = `${formatTime( currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar (e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);