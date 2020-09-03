const skillsContent = document.getElementsByClassName("skillsContent")[0];
const skills = document.getElementsByClassName("skills")[0];
const position = document.getElementsByClassName("position")[0];
const typeAnimation = document.getElementById("typeAnimation");

const positionText = [
  "_I'm a Web Developer_",
  "_I'm a Web Designer_",
  "_I'm a Music Producer_",
];
console.log(positionText[0].length);

// Projects
const projects = document.getElementsByClassName("projects")[0];

// Resume
const resume = document.getElementsByClassName("resume")[0];

// Animation on scroll

const projectsToAnimate = document.getElementsByClassName("projects")[0];

document.addEventListener("scroll", () => {
  const scrollable = this.scrollY;
  console.log(scrollable);

  if (scrollable >= 100) {
    skillsContent.style = "animation: animateSkills 0.5s linear 1;";
  }
  if (scrollable >= 700) {
    projectsToAnimate.style = "animation: animateSkills 0.5s linear 1;";
  }
  if (scrollable >= 1400) {
    resume.style = "animation: animateSkills 0.5s linear 1;";
  }
});

// Changing text and typing animation
let i = 0;
setInterval(() => {
  if (i >= positionText.length - 1) i = -1;
  i++;

  position.innerHTML = positionText[i];
}, 6000);

// Loading animation and Intro animation

const water = document.getElementsByClassName("water")[0];
const loadContainer = document.getElementsByClassName("onLoad")[0];
let waterHeight = 0;

const loading = document.getElementsByClassName("loading")[0];

const loadAnimation = new loader(loading);

window.addEventListener("load", (e) => {
  loadContainer.style = "display:none";
  // loadAnimation.startLoading();
  // loadAnimation.stopLoading();
});

// Cursor on mousemove

const cursor = document.getElementsByClassName("cursor")[0];
const body = document.getElementsByTagName("body")[0];

const cursorFollowed = new followMouse(cursor, body);

document.addEventListener("mousemove", (e) => {
  cursorFollowed.follow(e);
});

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

// Previous and next buttons in the projects

const prev = document.getElementById("prev");
const next = document.getElementById("next");
const projectsList = document.getElementsByClassName("proj");

let iteratePrev = 0;
let iterateNext = 0;

prev.addEventListener("click", (e) => {
  e.preventDefault();
  if (iteratePrev <= 0) iteratePrev = projectsList.length;
  iteratePrev--;
  // Set all the projects to display: none; first before iterating through them when the previous button is pressed
  projectsList[0].style = "display:none";
  projectsList[1].style = "display:none";
  projectsList[2].style = "display:none";
  projectsList[3].style = "display:none";
  projectsList[iteratePrev].style = "display:flex";
  console.log(iteratePrev);
});

next.addEventListener("click", (e) => {
  e.preventDefault();
  if (iterateNext >= projectsList.length - 1) iterateNext = -1;
  iterateNext++;
  // Set all the projects to display: none; first before iterating through them when the next button is pressed
  projectsList[0].style = "display:none";
  projectsList[1].style = "display:none";
  projectsList[2].style = "display:none";
  projectsList[3].style = "display:none";
  projectsList[iterateNext].style = "display:flex";
  console.log(iterateNext);
});
