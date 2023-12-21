// Creating the gallery from the retrieved data, dynamically adding the different elements //
export function displayGallery(works) {
  const GalleryContainer = document.querySelector(".gallery");
  GalleryContainer.innerHTML = "";
  works.forEach((work) => {
    const workElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;
    const titleElement = document.createElement("h3");
    titleElement.innerHTML = work.title;

    GalleryContainer.appendChild(workElement);
    workElement.appendChild(imageElement);
    workElement.appendChild(titleElement);
  });
}

export function createGalleryContainer() {
  const portfolio = document.getElementById("portfolio");

  // Adding the Gallery element to later modify the Html//
  const GalleryContainer = document.createElement("div");
  GalleryContainer.classList.add("gallery");
  portfolio.appendChild(GalleryContainer);
}
