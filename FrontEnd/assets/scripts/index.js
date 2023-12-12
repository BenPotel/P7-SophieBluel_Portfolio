import { fetchCategories, fetchWorks } from "./api.js";

//..............................................//
//              Filter Section                  //
//..............................................//

const portfolio = document.getElementById("portfolio");

// Adding the filter div to the Html//
const FilterSection = document.createElement("div");
FilterSection.classList.add("filters");
portfolio.appendChild(FilterSection);

//Creating the "tous" (all) button//
const buttonAll = document.createElement("button");
buttonAll.textContent = "Tous";
buttonAll.classList.add("btnFilter");
FilterSection.appendChild(buttonAll);

//Making this button, the default filter ,adding the appropriate CSS class, event listener and making the filter functional//
let DefaultFilter = document.querySelector(".btnFilter");
DefaultFilter.classList.add("active");
buttonAll.addEventListener("click", () => {
  const GalleryContainer = document.querySelector(".gallery");
  GalleryContainer.innerHTML = "";
  fetchWorks().then((works) => {
    displayGallery(works);
  });
  setActiveFilter(buttonAll);
});

fetchCategories()
  .then((categories) => {
    displayFilters(categories);
  })
  .catch((error) => console.error("Erreur lors de la requête:", error));

function displayFilters(categories) {
  categories.forEach((category) => {
    const FilterName = document.createElement("button");
    FilterName.classList.add("btnFilter");
    FilterName.innerHTML = category.name;
    FilterName.addEventListener("click", () => {
      FilterWorks(category.id);
      setActiveFilter(FilterName);
    });
    FilterSection.appendChild(FilterName);
  });
}

function setActiveFilter(button) {
  const buttons = document.querySelectorAll(".btnFilter");
  buttons.forEach((btn) => {
    if (btn === button) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

//filtering function, using categories and works fetched in the API//
function FilterWorks(categoryId) {
  fetchWorks().then((works) => {
    const selectWorks = works.filter(
      (works) => works.categoryId === categoryId
    );
    GalleryContainer.innerHTML = "";
    displayGallery(selectWorks);
  });
}

//....................................//
//          Gallery Section           //
//....................................//

fetchWorks()
  .then((works) => {
    displayGallery(works);
  })
  .catch((error) => console.error("Erreur lors de la requête:", error));

// Adding the Gallery element to later modify the Html//
let GalleryContainer = document.createElement("div");
GalleryContainer.classList.add("gallery");
portfolio.appendChild(GalleryContainer);

// Creating the gallery from the retrieved data, dynamically adding the different elements //
function displayGallery(works) {
  works.forEach((work) => {
    const workElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.alt = work.alt;
    const titleElement = document.createElement("h3");
    titleElement.innerHTML = work.title;

    GalleryContainer.appendChild(workElement);
    workElement.appendChild(imageElement);
    workElement.appendChild(titleElement);
  });
}

//.......................................//
//           Logged in Display           //
//.......................................//
let modal = null;
function TokenCheck() {
  const token = localStorage.getItem("token");
  const stylesheetLink = document.getElementById("defaultStylesheet");

  if (token) {
    // If token is present, activate the "edition mode" stylesheet
    stylesheetLink.href = "./assets/edit.css";
    Editmode();
  } else {
    // If token is not present, use the default stylesheet
    stylesheetLink.href = "./assets/style.css";
  }
}

// Call the function when the page loads
window.onload = TokenCheck;

function Editmode() {
  const headerElement = document.querySelector("body");

  // Show the black EdidMode header
  const editHeaderElement = document.createElement("div");
  editHeaderElement.className = "header_edit";
  editHeaderElement.innerHTML =
    '<img src="./assets/icons/modifW.svg" alt=""><p>Mode édition</p>';
  headerElement.insertBefore(editHeaderElement, headerElement.firstChild);

  // Transform the login nav link to a logout link
  const logoutLinkElement = headerElement.querySelector(".login_out");
  logoutLinkElement.href = "#";
  logoutLinkElement.innerText = "logout";
  logoutLinkElement.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default `<a href="#">` behaviour
    disconnected();
  });

  //create the modify button to add/delete projects from the gallery (modal)//
  const projects = document.getElementById("projects");
  const editbutton = document.createElement("div");
  editbutton.className = "edit_btn js-modal";
  editbutton.innerHTML =
    '<img src="./assets/icons/modifB.svg" alt=""><p>modifier</p>';
  projects.appendChild(editbutton);
  const dialog = document.getElementById("modal");
  editbutton.addEventListener("click", function () {
    dialog.showModal();
  });
}

function disconnected() {
  // deleting date in the local storage
  localStorage.clear();
  // reloading page
  location.reload();
}
