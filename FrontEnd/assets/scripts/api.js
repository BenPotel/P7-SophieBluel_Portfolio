// creating the function to fetch the categories from the API //
export async function fetchCategories () {
  return new Promise ((resolve, reject) => {
    fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categories) => resolve(categories))
    .catch((error) => reject(error))
  })
}  
// creating the function to fetch the gallery data from the API //
export async function fetchWorks () {
  return new Promise ((resolve,reject) => {
    fetch ("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => resolve(works))
    .catch((error) => reject(error))
  })
}  
