import { fetchWorks } from "./api.js";
import { displayGallery } from "./gallery.js";

export function FiltersCreation() {
  const portfolio = document.getElementById("portfolio");
  //   const portfolio = document.getElementById("portfolio");
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

export function displayFilters(categories) {
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

export function setActiveFilter(button) {
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
export function FilterWorks(categoryId) {
  const GalleryContainer = document.querySelector(".gallery");
  fetchWorks().then((works) => {
    const selectWorks = works.filter((works) => works.categoryId === categoryId);
    GalleryContainer.innerHTML = "";
    displayGallery(selectWorks);
  });
}
