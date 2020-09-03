// Loading animation and Intro animation

const water = document.getElementsByClassName("water")[0];
const loadContainer = document.getElementsByClassName("onLoad")[0];
let waterHeight = 0;

const loading = document.getElementsByClassName("loading")[0];

const loadAnimation = new loader(loading);

window.addEventListener("load", (e) => {
  loadContainer.style = "display:none";
});

// Cursor on mousemove

const cursor = document.getElementsByClassName("cursor")[0];
const body = document.getElementsByTagName("body")[0];

const cursorFollowed = new followMouse(cursor, body);

document.addEventListener("mousemove", (e) => {
  cursorFollowed.follow(e);
});

// Music playing functionality

const playlist = [
  "../aud/Darker_Beat_Alertion_[Prod by KatwaveBeats].mp3",
  "../aud/I'm Blessed (Prod by Katwave) Mastered.mp3",
  "../aud/Igohard2.mp3",
  "../aud/Love Song (Prod by Katwave).mp3",
  "../aud/Makunye99Originalmix.mp3",
  "../aud/R&B Bryson tiller X Belly Type beat_switch.mp3",
  "../aud/StayAwakeProdbyKatwave.mp3",
];

const coverImage = ["../img/blessed.jpg", "../img/know.jpg"];

const audio = new Audio();
audio.preload = "metadata";
audio.src = playlist[0];

const seek = document.getElementById("seek");
const repeat = document.getElementById("repeat");
const unrepeat = document.getElementById("unrepeat");
const previous = document.getElementById("previous");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const next = document.getElementById("next");
const volume = document.getElementById("volume");
const mute = document.getElementById("mute");
const unmute = document.getElementById("unmute");
const coverArt = document.getElementById("coverArt");
const download = document.getElementById("download");

download.href = playlist[0];

const playlistContainer = document.getElementsByClassName("playlistItems");
const songTitle = document.getElementsByClassName("song-title")[0];
const playlistSongTitle = [
  "Katwave - Darker_Beat_Alertion_ (Prod by Katwave)",
  "Katwave - Blessed (Prod by Katwave)",
  "Charles Nave - I go hard (Prod by Katwave)",
  "Katwave - Love song (Prod by Katwave)",
  "Katwave - Makunye (Prod by Katwave)",
  "Katwave - Bryson Tiller Type Beat (Prod by Katwave)",
  "Katwave - Stay Awake (Prod by Katwave)",
];

const audioSettings = new AudioSettings();
audioSettings.seekPosition();
audioSettings.loopAudio("#fff", "rgb(0,60,255)");
audioSettings.unLoopAudio("rgb(0,60,255)");
audioSettings.muteAudio();
audioSettings.unMuteAudio();
audioSettings.playAudio();
audioSettings.pauseAudio();
audioSettings.timeUpdating();
audioSettings.volumeChange();
audioSettings.playlist(
  playlist,
  playlistContainer,
  download,
  songTitle,
  playlistSongTitle,
  coverArt,
  coverImage
);
audioSettings.nextSong(
  playlist,
  next,
  download,
  songTitle,
  playlistSongTitle,
  coverArt,
  coverImage
);
audioSettings.previousSong(playlist, previous, download, coverArt, coverImage);

// Ham menu widget

// ham menu buttons
const openMenu = document.getElementsByClassName("hamBTN-open")[0];
const closeMenu = document.getElementsByClassName("hamBTN-close")[0];
// Ham menu container
const hamContainer = document.getElementsByClassName("navigation")[0];

openMenu.addEventListener("click", () => {
  closeMenu.style = "display: block";
  openMenu.style = "display: none";
  hamContainer.style = "display:flex";
});
closeMenu.addEventListener("click", () => {
  closeMenu.style = "display: none";
  openMenu.style = "display: block";
  hamContainer.style = "display:none";
});
