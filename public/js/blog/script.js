const form = document.getElementsByTagName("form")[0];
const input = document.getElementById("search");
const btn = document.getElementById("searchBTN");

btn.addEventListener("click", (e) => {
  if (input.value.trim() == "") {
    e.preventDefault();
    form.action = "";
  } else {
    form.action = "/search-results";
  }
});
