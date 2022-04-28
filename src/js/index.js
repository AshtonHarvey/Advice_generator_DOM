import "../scss/index.scss";

//store input component
let textInput = document.getElementById("text-input");

//store button component
let buttonInput = document.getElementById("button-input");

// store advice urls for seperate use
let stringSearchUrl = `https://api.adviceslip.com/advice/search/`;
let idSearchUrl = `https://api.adviceslip.com/advice/`;
let randomSearchUrl = `https://api.adviceslip.com/advice`;

//store html container element
let cardContainer = document.getElementById("card-container");

// store search result info element
let searchInfo = document.getElementById("result-text");

// listen for button input
buttonInput.onclick = (input) => {
  clearCardContainer();
  ProcessInput(textInput.value.trim());
};

// match data type with proper api url
function ProcessInput(input) {
  console.log(input);

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

//is the returned adviceObject a list?
function isSearchObject(adviceObject) {
  // if adviceObject has the total results property then it is a search adviceObject
  return adviceObject.hasOwnProperty("total_results");
}

// is the returned adviceObject an error message?
function isMessageObject(adviceObject) {
  // if adviceObject has the type property then it is a message adviceObject
  return adviceObject.hasOwnProperty("type");
}

//destructures returned adviceObject and
function DestructureObject(adviceObject) {
  //check if we received a search error(message adviceObject)
  if (isMessageObject(adviceObject)) {
    //   create card with error info
    GenerateCardHtml(adviceObject.message.type, adviceObject.message.text);
  } else if (!isSearchObject(adviceObject)) {
    //   create card and add too DOM
    GenerateCardHtml(adviceObject.slip.id, adviceObject.slip.advice);
  } else if (isSearchObject(adviceObject)) {
    //   itterated through array making cards for each advice
    console.log(adviceObject);
    Object.entries(adviceObject.slips).forEach((slip) => {
      GenerateCardHtml(adviceObject.slip.id, adviceObject.slip.advice);
      //   object array has changed read console log and adjust accessing data
    });
  }
}

// generates html and inserts advice into DOM
function GenerateCardHtml(title, text) {
  console.log(`title ${title} text ${text}`);

  cardContainer.innerHTML += `
      <div className="card">
            <p class"card__title">Advice: ${title}</p>
            <p class"card__text">${text}</p>
        </div>;
    `;
}

// clear card container
function clearCardContainer() {
  cardContainer.innerHTML = "";
}
