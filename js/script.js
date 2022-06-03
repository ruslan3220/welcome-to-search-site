// HTML elementlarini chaqirib olish 
let elForm = document.querySelector(".form")
let elSearchInput = document.querySelector(".search-input")
let elWrapper = document.querySelector("#wrapper")
let elWrapperNew = document.querySelector(".modal-body")
let elMoreBtn = document.querySelector(".more-button")
let elTemplate = document.querySelector("#template").content;
let elNewTemplate = document.querySelector("#new-template").content;

// Brauzerga render qilish

function renderFetch(array, wrapper) {
    let elFragment = document.createDocumentFragment();
    wrapper.innerHTML = null
    array.articles.forEach(item => {
        let newTemplate = elTemplate.cloneNode(true)
        
        newTemplate.querySelector(".card-img-top").src = item.urlToImage
        newTemplate.querySelector(".card-title").textContent = item.title
        newTemplate.querySelector(".card-text").textContent = item.author
        let splitted = item.publishedAt.split("").splice(0, 10).join("")
        newTemplate.querySelector(".movies-time").textContent = splitted
        elFragment.appendChild(newTemplate)
    })
    wrapper.appendChild(elFragment)
}

// Sarchni eshitish 

elForm.addEventListener("input", (evt) =>{ 
    evt.preventDefault()
    let inputValue = elSearchInput.value;
    if (inputValue) {
           (async function () {
               let responce = await fetch(
                   `https://newsapi.org/v2/everything?q=${inputValue}&from=2022-06-02&sortBy=popularity&apiKey=72c46977680a4705a32815a1056a579b`
                   );
                   let data = await responce.json();
                   renderFetch(data, elWrapper)
               })();
       }
    })

// More infoga render qilish

    function sortNewBooks(booksArray, wrapper) {

        let elFragmentNew = document.createDocumentFragment()

        booksArray.articles.forEach(item => {
        
        let modalTemplate = elNewTemplate.cloneNode(true)
       
        modalTemplate.querySelector(".modal-author").textContent = item.title
        modalTemplate.querySelector(".modal-title").textContent = item.content
        modalTemplate.querySelector(".modal-text").textContent = item.description
        elFragmentNew.appendChild(modalTemplate)
        });
        wrapper.appendChild(elFragmentNew)
        }
        
        // More infoga render qilishni eshitish
    elWrapper.addEventListener("click", () =>{
        let inputValue = elSearchInput.value; 
        if(inputValue){
            (async function () {
                let responce = await fetch(
                    `https://newsapi.org/v2/everything?q=${inputValue}&from=2022-06-02&sortBy=popularity&apiKey=72c46977680a4705a32815a1056a579b`
                    );
                    let data = await responce.json();
                    console.log(data);
                    sortNewBooks(data, elWrapperNew)
                })();
        }
        })
    


