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
                <input type="submit" id="addPhotoBtn" value="Ajouter une photo">
            </div>
        </form>
    </div>
    `;

  // Append the modal to the body
  document.body.appendChild(modal);
}

createModal();

const myDialog = document.getElementById("modal");
myDialog.addEventListener("click", () => myDialog.close());

const myDiv = document.querySelector(".modal_container");
myDiv.addEventListener("click", (event) => event.stopPropagation());
