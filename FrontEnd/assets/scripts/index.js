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
import { TokenCheck } from "./authdisplay.js";

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

// Call the function when the page loads
window.onload = TokenCheck();
