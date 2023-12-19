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

// Adding the Gallery element to later modify the Html//
let GalleryContainer = document.createElement("div");
GalleryContainer.classList.add("gallery");
portfolio.appendChild(GalleryContainer);

const works = await fetchWorks();
displayGallery(works);

// Creating the gallery from the retrieved data, dynamically adding the different elements //
function displayGallery(works) {
  const GalleryContainer = document.querySelector(".gallery");
  GalleryContainer.innerHTML = "";
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

function refreshWorks() {
  fetchWorks().then((data) => {
    const UpdadedWorks = data;
    displayGallery(UpdadedWorks);
    displayModalGallery(UpdadedWorks);
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
    <form class="upload_img_form">
      <label class="photo_file_section">
			<img  src="./assets/icons/landscape.svg">
			<input type="file" name="image" id="add_Photo">
			<span class="file_selection"> + Ajouter photo</span>
			<img src="#" alt="Aperçu de l'image" class="file_miniature">
			<p>jpg,png : 4Mo max</p>
      </label>
      </label>
      <label for="title">Titre</label>
        <input type="text" id="title" name="title">
      <label for="categories">Catégories</label>
        <select name="categories" id="categories">
        </select>
    <hr> 
			<input type="submit" class="form_submit_btn" disabled value="Valider" >
    </form>
  </div>
`;
  // Append the modal to the body
  document.body.appendChild(modal);
  selectCategory(categories);
  const fileInput = modal.querySelector("#add_Photo");
  fileInput.addEventListener("change", previewImage);
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
        <form action="#" method="dialog" >
            <div class="close_div">
                <button class="close_btn"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <h3>Galerie photo</h3>
            <div class="modal_gallery"></div>
            <hr>
                <input type="submit" class="add_Photo_Btn submit_btn" value="Ajouter une photo">
        </form>
    </div>
    `;

  // Append the modal to the body
  document.body.appendChild(modal);
}

createModal();
switchModal();
closeModal();
displayModalGallery(works);

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
  const AddPhoto = document.querySelector(".add_Photo_Btn");
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

function displayModalGallery(works) {
  const galleryContainer = document.querySelector(".modal_gallery");
  // Clear existing gallery content
  galleryContainer.innerHTML = "";

  works.forEach((img) => {
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery_item");

    const blackSquare = document.createElement("p");
    blackSquare.classList.add("black_square");
    galleryItem.appendChild(blackSquare);

    const image = document.createElement("img");
    image.src = img.imageUrl;
    image.alt = img.title;
    image.dataset.id = img.id;
    galleryItem.appendChild(image);

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete_icon");
    deleteIcon.dataset.id = img.id;
    deleteIcon.addEventListener("click", deleteWork);
    galleryItem.appendChild(deleteIcon);

    galleryContainer.appendChild(galleryItem);
  });
}

async function deleteWork(e) {
  let id = this.dataset.id;

  await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "*/*",
      Authorization: "Bearer " + localStorage.user,
    },
  }).then((response) => {
    if (response.ok) {
      e.target.parentElement.remove();
      refreshWorks();
    } else {
      if (response.status === 401) {
        console.error("Unauthorized. Check the validity of your token.");
      } else {
        console.error(
          `Failed to delete work with ID ${id}. Status: ${response.status}`
        );
      }
    }
  });
}

//Adding projects to the gallery with the modal

// Function to preview the uploaded image
function previewImage(event) {
  const input = event.target;
  const preview = document.querySelector(".file_miniature");
  const labelSection = input.closest(".photo_file_section");
  const maxSizeMB = 4; // Maximum allowed file size in megabytes

  const file = input.files[0];

  // Check if a file is selected
  if (!file) {
    // No file selected, hide the preview and show other elements
    preview.style.display = "none";
    labelSection.querySelectorAll("img, span, p").forEach((element) => {
      element.style.display = "block";
    });
    return;
  }

  // Check file type (PNG, JPEG,or JPG)
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (!allowedTypes.includes(file.type)) {
    alert(
      `Ce type de document n'est pas accepté. Veuillez selectionner une image JPEG, PNG ou JPG.`
    );
    resetForm(input);

    return;
  }

  // Check file size
  if (file.size > maxSizeMB * 1024 * 1024) {
    alert("Votre fichier dépasse la taille maximale autorisée (4Mo)");
    resetForm(input);

    return;
  }

  // Toggle the visibility of other elements in the label section if the previous criterias are met
  labelSection.querySelectorAll("img, span, p").forEach((element) => {
    element.style.display = "none";
  });

  const reader = new FileReader();

  reader.onload = function (e) {
    // Toggle the visibility of the image preview
    preview.style.display = "block";
    preview.src = e.target.result;
  };

  reader.readAsDataURL(file);
}
// Function to reset the form (if incorrect format/size or after succesfully adding a project)
function resetForm(element) {
  const form = element.closest("form.upload_img_form");
  if (form) {
    const fileInput = form.querySelector("#add_Photo");
    if (fileInput) {
      fileInput.value = "";
    }
    form.reset();
    // Clear the image preview and toggle visibility
    const preview = document.querySelector(".file_miniature");
    const labelSection = fileInput.closest(".photo_file_section");
    labelSection.querySelectorAll("img, span, p").forEach((element) => {
      element.style.display = "block";
    });
    preview.style.display = "none";
    preview.src = "";
  } else {
    console.error("Form is null or undefined");
  }
}

function checkForm() {
  const titleInput = document.getElementById("title");
  const categoryInput = document.getElementById("categories");
  const fileInput = document.getElementById("add_Photo");
  const SubmitBtn = document.querySelector(".form_submit_btn");
  const formSubmit = document.querySelector(".upload_img_form");
  function formSubmitBtn() {
    if (
      titleInput.value !== "" &&
      categoryInput.value !== "default" &&
      fileInput.files.length > 0
    ) {
      SubmitBtn.style.background = "#1D6154";
      SubmitBtn.disabled = false;
    } else {
      SubmitBtn.disabled = true;
      SubmitBtn.style.background = "#A7A7A7";
    }
  }

  if (titleInput !== null) {
    titleInput.addEventListener("input", formSubmitBtn);
    categoryInput.addEventListener("input", formSubmitBtn);
    fileInput.addEventListener("input", formSubmitBtn);
    formSubmit.addEventListener("submit", addProject);
  }
}

checkForm();

async function addProject(event) {
  event.preventDefault();
  const titleInput = document.getElementById("title");
  const categoryInput = document.getElementById("categories");
  const fileInput = document.getElementById("add_Photo");

  const formData = new FormData();
  formData.append("image", fileInput.files[0]);
  formData.append("title", titleInput.value);
  formData.append("category", categoryInput.value);

  await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.user,
    },
    body: formData,
  }).then((response) => {
    if (response.ok) {
      alert("Votre projet a bien été ajouté à la galerie.");
      refreshWorks();
      resetForm(document.getElementById("add_Photo"));
    } else if (response.status == "401") {
      alert("La requête a rencontré une erreur, veuillez vous reconnecter");
      document.location.href = "login.html";
    }
  });
}

//.......................................//
//           Logged in Display           //
//.......................................//

function TokenCheck() {
  const stylesheetLink = document.getElementById("defaultStylesheet");
  const token = localStorage.getItem("token");
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
