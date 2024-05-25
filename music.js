const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const playerContainer = document.getElementById("player-container");
const author = document.getElementById("author");
let volume = document.getElementById("volume");
let volumeRange = document.getElementById("volume-range");
let volumeIcon = document.querySelector(".volume-icon");
let progressContainer = document.querySelector(".progress-container");
let progress = document.querySelector(".progress");
let endTime = document.getElementById("end");
let startTime = document.getElementById("start");

const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

audio.volume = 0.5;
volumeRange.textContent = "50";
const songs = [
  "The_Weeknd-Blinding_Lights",
  "Alice_Merton-NoRoots",
  "Ava_Max-Salt",
  "Dharia-Sugar&Brownies",
  "The_Chainsmokers_feat.Halsey-Closer",
];

let curSong = 0;
const songPlaying = (song) => {
  cover.src = `./images/${song}.jpeg`;
  audio.src = `./audios/${song}.mp3`;
  let authorAndTitle = song.split("-");
  author.textContent = authorAndTitle[0].replaceAll("_", " ");
  title.textContent = authorAndTitle[1].replaceAll("_", " ");
  playerContainer.style.background = `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)),url(./images/${song}.jpeg) `;
  playerContainer.style.backgroundRepeat = "no-repeat";
  playerContainer.style.backgroundSize = "cover";
};

const playMusic = () => {
  playerContainer.classList.add("play");
  cover.classList.add("animated");
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  audio.play();
};

const pauseMusic = () => {
  playerContainer.classList.remove("play");
  cover.classList.remove("animated");
  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  audio.pause();
};

songPlaying(songs[curSong]);
const play = () => {
  const state = playerContainer.classList.contains("play");
  if (state) {
    pauseMusic();
  } else {
    playMusic();
  }
};

const next = () => {
  if (curSong > songs.length - 2) {
    curSong = 0;
  } else {
    curSong++;
  }
  songPlaying(songs[curSong]);
  playMusic();
};
const prev = () => {
  if (curSong == 0) {
    curSong = songs.length - 1;
  } else {
    curSong--;
  }
  songPlaying(songs[curSong]);
  playMusic();
};

const changeVolume = () => {
  audio.volume = volume.value / 100;
  volumeRange.textContent = volume.value;
  if (volume.value == 0) {
    volumeIcon.innerHTML = '<i class="fa-solid fa-volume-off"></i>';
  } else if (volume.value > 70) {
    volumeIcon.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  } else if (volume.value < 50) {
    volumeIcon.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
  }
};

const changeTime = (e) => {
  let curTime = e.target.currentTime;
  let duration = e.target.duration;
  progress.style.width = `${(curTime / duration) * 100}%`;

  //   let progressWidth=progressContainer.offsetWidth
};
const timeUpdate = function (e) {
  let curWidth = (e.offsetX / e.target.clientWidth) * audio.duration;
  audio.currentTime = curWidth;
};
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const updateDuration = () => {
  endTime.textContent = formatTime(audio.duration);
  setInterval(() => {
    startTime.textContent = formatTime(audio.currentTime);
  });
};

// events
playBtn.addEventListener("click", play);
nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);
volume.addEventListener("input", changeVolume);
audio.addEventListener("timeupdate", changeTime);
volumeIcon.addEventListener("click", () => {
  volume.style.visibility = "visible";
  setTimeout(() => {
    volume.style.visibility = "hidden";
  }, 15000);
  volumeRange.style.visibility = "visible";
  setTimeout(() => {
    volumeRange.style.visibility = "hidden";
  }, 15000);
});
progressContainer.addEventListener("click", timeUpdate);
audio.addEventListener("loadedmetadata", updateDuration);
