import { fetchCategories, fetchWorks } from "./api.js";

//..............................................//
//              Filter Section                  //
//..............................................//

function FiltersCreation() {
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
}
FiltersCreation();

const categories = await fetchCategories();
displayFilters(categories);

function displayFilters(categories) {
  categories.forEach((category) => {
    const FilterSection = document.querySelector(".filters");
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
    const GalleryContainer = document.querySelector(".gallery");
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

//.........................................//
//               Modals                    //
//.........................................//

function ModalAdd() {
  const modal = document.createElement("dialog");
  modal.id = "modalAdd";

  // Set the inner HTML content
  modal.innerHTML = `
  <div class=modal_container2>
    <div class="close_div">
      <button class="back_arrow"><i class="fa-solid fa-arrow-left"></i></button>
			<button class="close_btn"><i class="fa-solid fa-xmark"></i></button>
		</div>
    <h3>Ajout photo</h3>
    <form class="form_upload_img">
      <label id="zoneAjoutPhoto">
			<i class="fa-regular fa-image"></i>
			<input type="file" name="image" id="ajoutPhoto">
			<button id="btnChoixFichier"> +Ajouter une image</button>
			<img src="#" alt="Aperçu de l'image selectionner" id="fichierSelectionner">
			<p>jpg,png : 4Mo max</p>
      </label>
        <span class="format_picture">jpg, png: 4mo max</span>
      </label>
      <label for="title">Titre</label>
        <input type="text" id="title" name="title">
      <label for="categories">Catégories</label>
        <select name="categories" id="categories">
        </select>
    <hr>
    <div class="modal_btn">
			<input type="submit" class="submit_btn" disabled value="Valider" >
		</div>
    </form>
  </div>
`;
  // Append the modal to the body
  document.body.appendChild(modal);
  selectCategory(categories);
}

function selectCategory(categories) {
  const categorySelect = document.getElementById("categories");

  categorySelect.innerHTML = `
 <option value ="default" selected></option>
  `;
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
}

ModalAdd();

function createModal() {
  // Create a new dialog element
  const modal = document.createElement("dialog");
  modal.id = "modal";

  // Set the inner HTML content
  modal.innerHTML = `
    <div class="modal_container">
        <form action="#" method="dialog" id="modal_gallery">
            <div class="close_div">
                <button class="close_btn"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <h3>Galerie photo</h3>
            <div class="modalGallery"></div>
            <hr>
            <div class="modal_btn">
                <input type="submit" id="add_Photo_Btn" value="Ajouter une photo">
            </div>
        </form>
    </div>
    `;

  // Append the modal to the body
  document.body.appendChild(modal);
}

createModal();
switchModal();
closeModal();

function closeModal() {
  //Making sure the modal closes when the user click outside
  const myDialog = document.getElementById("modal");
  myDialog.addEventListener("click", () => myDialog.close());

  const close_modal_btn = document.querySelector(".close_btn");
  close_modal_btn.addEventListener("click", () => myDialog.close());
  close_modal_btn.addEventListener("click", () => myDialog2.close());

  const modalDiv = document.querySelector(".modal_container");
  modalDiv.addEventListener("click", (event) => event.stopPropagation());

  //Same principle for the second modal, creating secondary classes to avoid conflicts
  const myDialog2 = document.getElementById("modalAdd");
  myDialog2.addEventListener("click", () => myDialog2.close());
  close_modal_btn.addEventListener("click", () => myDialog2.close());

  const modalDiv2 = document.querySelector(".modal_container2");
  modalDiv2.addEventListener("click", (event) => event.stopPropagation());
}

function switchModal() {
  //Making the AddPhotoBtn show the second Modal
  const AddPhoto = document.getElementById("add_Photo_Btn");
  const modalAdd = document.getElementById("modalAdd");
  AddPhoto.addEventListener("click", function () {
    modalAdd.showModal();
  });
  //Making the Back Arrow on the second Modal take the user back to the first Modal
  const back_arrow = document.querySelector(".back_arrow");
  const modal1 = document.getElementById("modal");
  const modal2 = document.getElementById("modalAdd");
  back_arrow.addEventListener("click", function () {
    modal2.close();
    modal1.showModal();
  });
}

//.......................................//
//           Logged in Display           //
//.......................................//

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
window.onload = TokenCheck();

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
