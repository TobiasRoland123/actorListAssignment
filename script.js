const actorListUrl = "json/actors.json";
const template = document.querySelector("template").content;
const main = document.querySelector(".actor_container");
const filterButton = document.querySelectorAll("nav ul li button");
const popUpContainer = document.querySelector("#popup");

let actors;
let filter = "All movies";

window.addEventListener("load", function () {
  getData();
});

async function getData() {
  const respons = await fetch(actorListUrl);

  actors = await respons.json();

  console.log(actors);
  filterButton.forEach((button) => button.addEventListener("click", filterActors));
  showActors();
}

function filterActors() {
  filter = this.dataset.categories;
  console.log(filter);
  document.querySelector(".chosen").classList.remove("chosen");
  this.classList.add("chosen");

  showActors();
}

function showActors() {
  main.textContent = "";
  actors.forEach((actor) => {
    if (filter == actor.movie || filter == "All movies") {
      const klon = template.cloneNode(true);
      klon.querySelector(".name").textContent = actor.fullname;

      klon.querySelector(".movie").textContent = actor.movie;

      klon.querySelector(".actor").addEventListener("click", () => showDetails(actor));

      main.appendChild(klon);
    }
  });
}

function showDetails(actor) {
  popUpContainer.style.display = "flex";

  popUpContainer.querySelector(".name_popup").textContent = actor.fullname;
  popUpContainer.querySelector(".movie_popup").textContent = actor.movie;

  document.querySelector("#popup").addEventListener("click", () => (popup.style.display = "none"));
}
