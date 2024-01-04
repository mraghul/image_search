const accessKey = "kbbiOvG-mmwjkRQGFXwHZBV9BAu5G6w02dN4f7XLEXs";

const formEl = document.querySelector("form")
const inputEl = document.getElementById("search-input")
const searcResults = document.querySelector(".search-resultts")
const showMore = document.getElementById("show-more")

let inputData = "";
let page = 1;

async function searchImage() {
    inputData = inputEl.value;
    console.log(inputData);

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url)
    const data = await response.json()

    const results = data.results;

    if(page === 1){
        searcResults.innerHTML = "";
    }

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement("a")
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        searcResults.appendChild(imageWrapper);
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
    });

    page++
    if(page > 1){
        showMore.style.display = "block";
    }

}

formEl.addEventListener ("submit" , (e)=>{
    e.preventDefault()
    page = 1;
    searchImage()
})

showMore.addEventListener ("click" , ()=>{
    searchImage()
})