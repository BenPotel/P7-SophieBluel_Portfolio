// creating the function to fetch the categories from the API //
async function fetchCategories () {
  return new Promise ((resolve, reject) => {
    fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categories) => resolve(categories))
    .catch((error) => reject(error))
  })
}  
// creating the function to fetch the gallery data from the API //
async function fetchWorks () {
  return new Promise ((resolve,reject) => {
    fetch ("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => resolve(works))
    .catch((error) => reject(error))
  })
}  

//..............................................//
//              Filter Section                  //
//..............................................//

const portfolio = document.getElementById("portfolio")

// Adding the filter div to the Html//
const FilterSection = document.createElement ("div")
  FilterSection.classList.add ("filtres")
  portfolio.appendChild(FilterSection)

//Creating the "tous" (all) button//
const buttonAll = document.createElement("button")
  buttonAll.textContent ="Tous"
  buttonAll.classList.add("btnFilter")
  FilterSection.appendChild(buttonAll)

  //Making this button, the default filter ,adding the appropriate CSS class, event listener and making the filter functional//    
let DefaultFilter = document.querySelector(".btnFilter")
  DefaultFilter.classList.add("active")
  buttonAll.addEventListener("click", () => {
      const GalleryContainer = document.querySelector(".gallery")
      GalleryContainer.innerHTML = ""
      fetchWorks ()
        .then(works => {
        displayGallery(works)
      })
      .catch(error => console.error('Erreur lors de la requête:', error))
      setActiveFilter(buttonAll)
    })  

fetchCategories () 
  .then(categories => {
    displayFilters(categories)
  })
  .catch(error => console.error('Erreur lors de la requête:', error))

function displayFilters(categories) {
  categories.forEach(category => {
    const FilterName = document.createElement("button")
    FilterName.classList.add("btnFilter")
    FilterName.innerHTML = category.name
    FilterName.addEventListener ("click", ()  => {
      FilterWorks(category.id)
      setActiveFilter(FilterName)    
    })
    FilterSection.appendChild(FilterName)
  })
}

function setActiveFilter(button) {
  const buttons = document.querySelectorAll(".btnFilter")
  buttons.forEach((btn) => {
    if (btn === button) {
      btn.classList.add("active")
    } else {
      btn.classList.remove("active")
    }
  })
}

//filtering function, using categories and works fetched in the API//
function FilterWorks(categoryId) {
  fetchWorks ()
    .then((works) => {
        const selectWorks = works.filter(
        (works) => works.categoryId === categoryId
      )
      GalleryContainer.innerHTML = ""
      displayGallery(selectWorks)  
    })
    .catch(error => console.error('Erreur lors de la requête:', error))
}

//....................................//
//          Gallery Section           //
//....................................//

fetchWorks ()
    .then(works => {
        displayGallery(works)
    })
    .catch(error => console.error('Erreur lors de la requête:', error))

// Adding the Gallery element to later modify the Html//
let GalleryContainer = document.createElement ("div")
GalleryContainer.classList.add ("gallery")
portfolio.appendChild(GalleryContainer)

// Creating the gallery from the retrieved data, dynamically adding the different elements //
function displayGallery(works) {
    works.forEach(work => {
        const workElement = document.createElement("figure")
        const imageElement = document.createElement("img")
        imageElement.src = work.imageUrl
        imageElement.alt = work.alt
        const titleElement = document.createElement("h3")
        titleElement.innerHTML = work.title

        GalleryContainer.appendChild(workElement)
        workElement.appendChild(imageElement)
        workElement.appendChild(titleElement)
    })
}


