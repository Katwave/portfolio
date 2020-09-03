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

// Input fields animation
const input = document.getElementsByTagName("input");
const label = document.getElementsByTagName("label");

for (let i = 0; i < input.length; i++) {
  input[i].addEventListener("click", () => {
    label[i].style = "top: 0%";
  });
}

// Submitting the form

const submit = document.getElementById("submit");
const form = document.getElementsByTagName("form")[0];
const emailRegx = /@/;
submit.addEventListener("click", (e) => {
  if (emailRegx.test(input[1].value)) {
    input[1].style = "border-bottom: 3px solid green";
    form.action = "/thank-you";
  } else if (!emailRegx.test(input[1].value)) {
    e.preventDefault();
    input[1].style = "border-bottom: 3px solid red";
  } else {
    form.action = "/thank-you";
  }
});

// Dsiplaying and hiding E-mail container

const emailContainer = document.getElementsByClassName("emailSection")[0];
const closeContainer = document.getElementById("closeContainer");
const openContainer = document.getElementById("openContainer");

openContainer.addEventListener("click", (e) => {
  e.preventDefault();
  emailContainer.style = "display:flex";
});

closeContainer.addEventListener("click", (e) => {
  e.preventDefault();
  emailContainer.style = "display:none";
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
