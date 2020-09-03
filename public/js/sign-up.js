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

// input animation

const input = document.getElementsByTagName("input");
const label = document.getElementsByTagName("label");

for (let i = 0; i < input.length; i++) {
  input[i].addEventListener("click", () => {
    label[i].style = "top: 0%";
  });
  if (input[i].value) {
    label[i].style = "top: 0%";
  }
}

// Input validation

const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const submit = document.getElementById("submit");
const form = document.getElementsByTagName("form")[0];

const inputFields = [
  document.getElementById("name"),
  document.getElementById("email"),
  document.getElementById("password"),
  document.getElementById("confirmPassword"),
];

const emailRegx = /@/;

submit.addEventListener("click", (e) => {
  const passwordStorage = inputFields[3].value;
  const emailStorage = inputFields[1].value;
  for (let i = 0; i < inputFields.length; i++) {
    if (inputFields[i].value.trim() == "") {
      e.preventDefault();
      inputFields[i].style = "border-bottom: 3px solid red";
    } else if (
      inputFields[2].value.length < 5 ||
      inputFields[3].value.length < 5
    ) {
      e.preventDefault();
      inputFields[2].style = "border-bottom: 3px solid red";
      inputFields[3].style = "border-bottom: 3px solid red";
    } else if (inputFields[2].value != inputFields[3].value) {
      e.preventDefault();
      inputFields[2].style = "border-bottom: 3px solid red";
      inputFields[3].style = "border-bottom: 3px solid red";
    } else if (emailRegx.test(inputFields[1].value)) {
      inputFields[3].style = "border-bottom: 3px solid green";
    } else if (!emailRegx.test(inputFields[1].value)) {
      e.preventDefault();
      inputFields[3].style = "border-bottom: 3px solid red";
    } else {
      form.action = "/thank-you-for-signing-up";
    }
  }
  console.log("pressed...");
  localStorage.setItem("email", emailStorage);
});

inputFields[0].addEventListener("keyup", (e) => {
  if (inputFields[0].value.length < 5) {
    inputFields[0].style =
      "border-bottom: 3px solid red;transition:all 300ms ease-in-out";
  } else {
    inputFields[0].style =
      "border-bottom: 3px solid green; transition:all 300ms ease-in-out";
  }
});
inputFields[1].addEventListener("keyup", (e) => {
  if (emailRegx.test(inputFields[1].value)) {
    inputFields[1].style =
      "border-bottom: 3px solid green;transition:all 300ms ease-in-out";
  } else {
    inputFields[1].style =
      "border-bottom: 3px solid red; transition:all 300ms ease-in-out";
  }
});
inputFields[2].addEventListener("keyup", (e) => {
  if (inputFields[2].value.length < 5) {
    inputFields[2].style =
      "border-bottom: 3px solid red;transition:all 300ms ease-in-out";
  } else {
    inputFields[2].style =
      "border-bottom: 3px solid green; transition:all 300ms ease-in-out";
  }
});
inputFields[3].addEventListener("keyup", (e) => {
  if (inputFields[3].value.length < 5) {
    inputFields[3].style =
      "border-bottom: 3px solid red;transition:all 300ms ease-in-out";
  } else if (inputFields[3].value != inputFields[2].value) {
    ("border-bottom: 3px solid red;transition:all 300ms ease-in-out");
  } else {
    inputFields[3].style =
      "border-bottom: 3px solid green; transition:all 300ms ease-in-out";
  }
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
