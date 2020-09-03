// Ham menu widget

// ham menu buttons
const openMenu = document.getElementsByClassName("hamBTN-open")[0];
const closeMenu = document.getElementsByClassName("hamBTN-close")[0];
// Ham menu container
const hamContainer = document.getElementsByClassName("ham-menu")[0];

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

// Search widget

// search buttons
const search = document.getElementById("search");
const closeSearch = document.getElementById("closeSearch");
// Search text box
const searchTextBox = document.getElementById("searchTextBox");
// search container
const searchCont = document.getElementsByClassName("searchCont")[0];
// Button for showing the search container
const showSearch = document.getElementById("showSearch");

searchTextBox.addEventListener("keyup", () => {
  if (searchTextBox.value) {
    search.style = "display:block";
    closeSearch.style = "display:none";
  } else {
    search.style = "display:none";
    closeSearch.style = "display:block";
  }
});

search.addEventListener("click", (e) => {
  e.preventDefault();
  searchCont.style = "display:none";
});
closeSearch.addEventListener("click", (e) => {
  e.preventDefault();
  searchCont.style = "display:none";
});

showSearch.addEventListener("click", (e) => {
  e.preventDefault();
  searchCont.style = "display: flex";
});

// Audio widgets class

class AudioSettins {
  constructor(volume, seek, timeUpDate, mute, unmute) {
    this.volume = volume;
    this.seek = seek;
    this.timeUpDate = timeUpDate;
    this.mute = mute;
    this.unmute = unmute;
  }
  volumeChange() {
    volume.addEventListener("change", () => {
      audio.volume = volume.value / 100;
    });
  }
  seekPosition() {
    seek.addEventListener("change", () => {
      const seeker = audio.duration * (seek.value / 100);
      audio.currentTime = seeker;
    });
  }
  timeUpdating() {
    audio.addEventListener("timeupdate", () => {
      const seekTime = audio.currentTime * (100 / audio.duration);
      seek.value = seekTime;
    });
  }
  muteAudio() {
    mute.addEventListener("click", () => {
      audio.muted = false;
      unmute.style = "display:inline-flex";
      mute.style = "display:none";
    });
  }
  unMuteAudio() {
    unmute.addEventListener("click", () => {
      audio.muted = true;
      unmute.style = "display:none";
      mute.style = "display:inline-flex";
      console.log("hdhdh");
    });
  }
  playAudio() {
    play.addEventListener("click", () => {
      if (audio.pause) {
        audio.play();
        play.style = "display:none";
        pause.style = "display:flex";
      }
      console.log("Play");
    });
  }
  pauseAudio() {
    pause.addEventListener("click", () => {
      if (audio.play) {
        audio.pause();
        play.style = "display:flex";
        pause.style = "display:none";
      }
      console.log("Pause");
    });
  }
  loopAudio(background, backgroundTwo) {
    repeat.addEventListener("click", () => {
      if (audio.loop == false) {
        audio.loop = true;
        repeat.style = `display:none`;
        unrepeat.style = `display:flex`;
        repeat.style = `background: ${background}`;
      }
    });
  }
  unLoopAudio(background) {
    unrepeat.addEventListener("click", () => {
      if (audio.loop == true) {
        audio.loop = false;
        repeat.style = `display:flex`;
        unrepeat.style = `display:none`;
        unrepeat.style = `background: ${background}`;
      }
    });
  }
  songLength(element) {
    element.innerText = `${audio.duration}`;
  }
}

// Scroll fading class

class ScrollEffect {
  constructor(el, pos, anime) {
    this.el = el;
    this.pos = pos;
    this.anime = anime;
  }

  fade() {
    let scrollable = window.scrollY;
    console.log(scrollable);

    if (scrollable >= this.pos) {
      this.el.style = `display:flex; animation: fade 0.5s linear 1`;
    } else {
      this.el.style = `display:none; animation:none`;
    }
  }
}

// Loading widget

class PageLoad {
  constructor(el, timer) {
    this.el = el;
    this.timer = timer;
  }
  load() {
    setTimeout(() => {
      this.el.style = "display:flex;  z-index: 110";
    }, 0);
  }
  unload() {
    setTimeout(() => {
      this.el.style = "display:none;  z-index: 0";
    }, 6000);
  }
}
