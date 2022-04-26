import "../scss/index.scss";

document.getElementById("cards").innerHTML = `
${createCard()};
${createCard()};
${createCard()};
${createCard()};
${createCard()};
${createCard()};
${createCard()};
${createCard()};

`;
// flexwrap and flex grow for wide display to use specific number of colunms
function createCard(){
    return `<div class="card">
    <p class="card__title">Advice #3</p>
    <p class="card__text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est iusto quis explicabo excepturi quae temporibus odit minus officia provident odio?</p>
    </div>`
}
//gradient randomizer for the cards rather than images
//emmet only works with tab or ctr space in js

