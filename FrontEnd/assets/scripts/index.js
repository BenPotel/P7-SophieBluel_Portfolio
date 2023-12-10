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

function CheckingToken() {
  const token = localStorage.getItem("token");
  const stylesheetLink = document.getElementById("defaultStylesheet");

  if (token) {
    // If token is present, activate the "edit" stylesheet
    stylesheetLink.href = "./assets/edit.css";
    Editmode();
  } else {
    // If token is not present, use the default stylesheet
    stylesheetLink.href = "./assets/style.css";
  }
}

// Call the function when the page loads
window.onload = CheckingToken;

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
    // Do logout and reload the page
    disconnected();
  });

  //create the modify button to add/delete projects from the gallery (modale)//
  const projects = document.getElementById("projects");
  const editbutton = document.createElement("div");
  editbutton.className = "edit_btn";
  editbutton.innerHTML =
    '<img src="./assets/icons/modifB.svg" alt=""><p>modifier</p>';
  projects.appendChild(editbutton);
}
/*   // Allow edit Works
  const worksActionElement = document.querySelector(".actions");
  const editWorksElement = document.createElement("a");
  editWorksElement.href = "#";
  editWorksElement.className = "edit-works";
  editWorksElement.innerHTML =
    '<i class="fa-regular fa-pen-to-square"></i> <span>modifier</span>'; // TODO: Use i18n here
  editWorksElement.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default `<a href="#">` behaviour
    showEditWorksModal();
  });
  worksActionElement.append(editWorksElement);

  // Remove definitively the categories filters
  const filtersElement = document.querySelector(".filters");
  filtersElement.remove();
}   */

function userDisconnected() {
  const logout = document.getElementById("Contact");
  logout.addEventListener("click", (event) => {
    event.preventDefault();
    disconnected();
  });
}

function disconnected() {
  // suppression des data dans le localStorage
  localStorage.clear();
  // rechargement de la page
  location.reload();
}

userDisconnected();
