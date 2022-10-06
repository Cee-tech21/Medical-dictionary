// dictionaryapi: https://dictionaryapi.com/account/my-keys

// Create some variables
const someWords = ["cytoplasm", "fatigue", "entrails", "lethargic",
                    "limb", "endoplasm", "zit", "plasma", "biohazard"]

// Get elements from DOM
const wordOfDayEl = document.querySelector("#word-of-day-el");
const searchWordInput = document.querySelector("#search-el");
const searchBtn = document.querySelector("#search-btn");
const displaySearchedWordEl = 
            document.querySelector("#display-searched-word-el");
const displayRandomWordBtn = 
        document.querySelector("#display-random");
const displayDefsDiv = document.querySelector("#display-defs-div");

let theSearch;
let randomNumber = Math.floor(Math.random() * someWords.length);
let dictionaryUri; 
        // "https://dictionaryapi.com/api/v3/references/" + "medical" +
        //  "/json/" + ($word) + "?key=" + "1f4f1500-c7c7-4dad-8e3c-28577244a069";
  
// Manipulate Document
wordOfDayEl.textContent = someWords[randomNumber];
displayRandomWordBtn.addEventListener("click", getRandWord)
searchBtn.addEventListener("click", callApiUseResult)

searchWordInput.addEventListener("keypress", function(e){
    if(e.keyCode === 13){
        e.preventDefault()
        // console.log(e)
        callApiUseResult()
    }
})


async function callApiUseResult(){
    let toSearch = searchWordInput.value
    let promiseRes = await callApi(toSearch)
    console.log("the promise result:",promiseRes)
    useSearchResult(promiseRes)
}

async function useSearchResult(data){
    if(!data[0].shortdef){
        alert("looks like your search hasn't " +
                "returned a medical definition")
        return
    }

    if(data[0].shortdef){
            const definitions = data[0].shortdef;
            const wordType = data[0].fl; 
            const searchTerm = searchWordInput.value           
            let count = 0;
            
            console.log("the data: ", data[0]);
            
            //console.log("the definition: ", data[0].shortdef) 
            displayDefsDiv.innerHTML = `
                                        <h1 class="">
                                        <span id="display-searched-word-el"
                                        class="fst-italic ">
                                            ${searchTerm}
                                        </span> 
                                        </h1>
                                        <span>${wordType} </span>  
                                        `;
            definitions.forEach(element => {
                count ++
                displayDefsDiv.innerHTML += `<p class="lead">
                                            ${count}) ${element}
                                        </p>`;                                

            });                                           
        } 
}

async function callApi(theSearch){
    if(!theSearch){
        alert("Please make sure you entered a search term")
        return
    }
    if(theSearch){
            //displaySearchedWordEl.textContent = theSearch;
        let dictionaryUri = "https://dictionaryapi.com/api/v3/references/" + "medical" +
             "/json/" + theSearch + "?key=" + "ba6c7c4f-2162-44ac-bce4-c4d0b7701454";

        let response = await fetch(dictionaryUri)
        let data = await response.json()
        return data
    } else{ alert("looks like your search hasn't returned a result!")}  

}


function getRandWord (){ 
    randomNumber = Math.floor(Math.random() * someWords.length)
    wordOfDayEl.textContent = someWords[randomNumber]
}
