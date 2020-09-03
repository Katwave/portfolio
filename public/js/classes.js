class loader {
  constructor(loading) {
    this.loading = loading;
  }
  load() {
    loading.style = "display:flex";
  }
  unload() {
    loading.style = "display:none";
  }
  startLoading() {
    setTimeout(this.load, 0);
  }
  stopLoading() {
    setTimeout(this.unload, 5500);
  }
}

// Cursor widget

class followMouse {
  constructor(cursor, body) {
    this.cursor = cursor;
    this.body = body;
  }
  follow(e) {
    let x = e.clientX;
    let y = e.clientY;

    if (x <= this.body.clientWidth - 20) {
      this.cursor.style.left = `${x}px`;
      this.cursor.style.top = `${y}px`;
    } else {
      this.cursor.style.left = `${x - 20}px`;
      this.cursor.style.top = `${y - 20}px`;
    }
  }
}

// Audio widgets class

class AudioSettings {
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
      audio.muted = true;
      unmute.style = "display:inline-flex";
      mute.style = "display:none";
    });
  }
  unMuteAudio() {
    unmute.addEventListener("click", () => {
      audio.muted = false;
      unmute.style = "display:none";
      mute.style = "display:inline-flex";
      console.log("unmuted");
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
  loopAudio(background, color) {
    repeat.addEventListener("click", () => {
      if (audio.loop == false) {
        audio.loop = true;
        repeat.style = `display:none`;
        unrepeat.style = `display:flex; background: ${background}; color: ${color}`;
      }
    });
  }
  unLoopAudio(background, color) {
    unrepeat.addEventListener("click", () => {
      if (audio.loop == true) {
        audio.loop = false;
        repeat.style = `display:flex; background: ${background}`;
        unrepeat.style = `display:none`;
      }
    });
  }
  songLength(element) {
    element.innerText = `${audio.duration}`;
  }

  // Playlist
  playlist(
    playlistTracks,
    playlistContainer,
    download,
    songTitle,
    playlistSongTitle,
    albumCover,
    image
  ) {
    for (let i = 0; i < playlistTracks.length; i++) {
      playlistContainer[i].addEventListener("click", () => {
        audio.src = playlist[i];
        play.style = "display:none";
        pause.style = "display:flex";
        audio.play();
        download.href = playlistTracks[i];
        songTitle.innerText = playlistSongTitle[i];
        albumCover.src = image[1];
        console.log(i);
        if (i == 1) {
          albumCover.src = image[0];
        }
      });
    }
  }

  nextSong(
    playlistTracks,
    next,
    download,
    songTitle,
    playlistSongTitle,
    albumCover,
    image
  ) {
    for (let i = 0; i < playlistTracks.length; i++) {
      next.addEventListener("click", () => {
        if (i >= playlistTracks.length - 1) i = -1;
        i++;
        audio.src = playlistTracks[i];
        audio.play();
        download.href = playlistTracks[i];
        songTitle.innerText = playlistSongTitle[i];
        albumCover.src = image[1];
        console.log(i);
        if (i == 1) {
          albumCover.src = image[0];
        }
      });
    }
  }

  previousSong(playlistTracks, previous, download, albumCover, image) {
    for (let i = 0; i < playlistTracks.length; i++) {
      previous.addEventListener("click", () => {
        if (i < 0) i = playlistTracks.length;
        i--;
        audio.src = playlistTracks[i];
        audio.play();
        download.href = playlistTracks[i];
        albumCover.src = image[1];
        console.log(i);
        if (i == 1) {
          albumCover.src = image[0];
        }
      });
    }
  }
}
