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

//Making sure the modal closes when the user click outside or press the escape key
const myDialog = document.getElementById("modal");
myDialog.addEventListener("click", () => myDialog.close());
myDialog.addEventListener("Keydown", (event) => {
  if (event.key === "Escape" || event.key === "Esc") {
    myDialog.close();
  }
});
const close_modal_btn = document.querySelector(".close_btn");
close_modal_btn.addEventListener("click", () => myDialog.close());

const myDiv = document.querySelector(".modal_container");
myDiv.addEventListener("click", (event) => event.stopPropagation());
