import { fetchCategories, fetchWorks } from "./api.js";
import { FiltersCreation, displayFilters } from "./filters.js";
import { displayGallery, createGalleryContainer } from "./gallery.js";
import {
  ModalAdd,
  createModal,
  switchModal,
  closeModal,
  displayModalGallery,
  checkForm,
} from "./modal.js";

const categories = await fetchCategories();
const works = await fetchWorks();

//..............................................//
//              Filter Section                  //
//..............................................//
FiltersCreation();
displayFilters(categories);

//....................................//
//          Gallery Section           //
//....................................//

createGalleryContainer();
displayGallery(works);

//.........................................//
//               Modals                    //
//.........................................//

ModalAdd(categories);
createModal();
switchModal();

closeModal();
displayModalGallery(works);

//Adding projects to the gallery with the modal

checkForm();

//.......................................//
//           Logged in Display           //
//.......................................//
function TokenCheck() {
  const stylesheetLink = document.getElementById("defaultStylesheet");
  const token = localStorage.getItem("token");
  if (token) {
    // If token is present, activate the "edition mode" stylesheet
    stylesheetLink.href = "./assets/css/edit.css";
    Editmode();
  } else {
    // If token is not present, use the default stylesheet
    stylesheetLink.href = "./assets/css/style.css";
  }
}

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

  //create the modify button to open the gallery modal//
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
  // deleting data in the local storage
  localStorage.removeItem("token");
  // reload the page
  location.reload();
}

// Call the function when the page loads
window.onload = TokenCheck();
