import "../scss/index.scss";

//store input component
let textInput = document.getElementById("text-input");

//store button component
let buttonInput = document.getElementById("button-input");

// store result counter component
let resultText = document.getElementById("result-text");

// store advice urls for seperate use
let stringSearchUrl = `https://api.adviceslip.com/advice/search/`;
let idSearchUrl = `https://api.adviceslip.com/advice/`;
let randomSearchUrl = `https://api.adviceslip.com/advice`;

//store html container element
let cardContainer = document.getElementById("card-container");

// store search result info element
let searchInfo = document.getElementById("result-text");

// listen for button click
buttonInput.onclick = () => {
  ProcessInput(textInput.value.trim());
};

// listen for enter press
textInput.onkeydown = (event) => {
  //   console.log(event.key);
  if (event.key === "Enter") {
    ProcessInput(textInput.value.trim());
  }
};

// match data type with proper api url
function ProcessInput(input) {
  clearCardContainer();

  // if is null
  if (input == "") {
    // search for random advice
    randomSearch();
  }

  // else if is not a number
  else if (isNaN(input)) {
    // search using string
    stringSearch(input);
  }
  // else if is a number
  else if (!isNaN(input)) {
    // parse and check if greater than 1
    let num = parseInt(input, 10);
    if (num >= 1) {
      IdSearch(input);
    }
  }
  // else
  else {
    // search for random advice
    // unable to find {user input}
    GenerateCardHtml(
      `Input error`,
      `Please use letter and numbers only. Leave blank for random advice`
    );
  }
}

//fetching using the url for search
function stringSearch(string) {
  fetchAdvice(string, stringSearchUrl);
}

// fetching using the url for id
function IdSearch(integer) {
  fetchAdvice(integer, idSearchUrl);
}

// fetching using the url to get a random advice
function randomSearch() {
  fetchAdvice("", randomSearchUrl);
}

// takes in specific url for each type then fetches data
function fetchAdvice(input = "", url) {
  fetch(`${url}${input}`)
    .then((response) => {
      return response.json();
    })
    .then((adviceObject) => {
      console.log(adviceObject);
      DestructureObject(adviceObject);
    });
}

//is this search object?
function isSearchObject(object) {
  // if adviceObject has the total results property then it is a search adviceObject
  return object.hasOwnProperty("total_results");
}

// is a slip object?
function isSlipObject(object) {
  // if adviceObject has the type property then it is a message adviceObject
  return object.hasOwnProperty("slip");
}

// is this a message object?
function isMessageObject(object) {
  return object.hasOwnProperty("message");
}

//destructures returned adviceObject
function DestructureObject(adviceObject) {
  if (isMessageObject(adviceObject)) {
    // create card with error info
    GenerateCardHtml(adviceObject.message.type, adviceObject.message.text);
    ClearResultCount();
  }
  if (isSlipObject(adviceObject)) {
    //     //   create card and add too DOM
    GenerateCardHtml(adviceObject.slip.id, adviceObject.slip.advice);
    ClearResultCount();
  }

  if (isSearchObject(adviceObject)) {
    //  itterated through array making cards for each advice
    Object.entries(adviceObject.slips).forEach((arrayObject) => {
      GenerateCardHtml(arrayObject[1].id, arrayObject[1].advice);
      UpdateResultCount(adviceObject.total_results);
    });
  }
}

// generates html and inserts advice into DOM
function GenerateCardHtml(title, text) {
  cardContainer.innerHTML += `
      <div class="card">
            <p class"card__title">Advice: ${title}</p>
            <p class"card__text">${text}</p>
        </div>
    `;
}
// updates result counter
function UpdateResultCount(results) {
  resultText.innerHTML = `results found: ${results}`;
}

// clear result count component
function ClearResultCount() {
  resultText.innerHTML = "";
}

// clear card container
function clearCardContainer() {
  cardContainer.innerHTML = "";
}
