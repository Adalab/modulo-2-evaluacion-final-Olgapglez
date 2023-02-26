'use strict';

//constantes y variables

const buttonSearch = document.querySelector('.js-button-search');
const inputSearch = document.querySelector('.js-input-search');
const ulElement = document.querySelector ('.js-search-list');
let coctails = [];
const placeHoldImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=Sorry%20we%20don%C2%B4t%20have%20a%20picture%20for%20this%20:(';




//MOSTRAR MARGARITAS CUANDO ABRES PÁGINA
function fetchMargaritas() {
fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`)
  .then(response => response.json())
  .then((data) => {
    coctails = data.drinks.map((drinks)=>({
      name: drinks.strDrink,
      image: drinks.strDrinkThumb,
    }));
    rendercoctails();
  });
}



//PINTAR COCTAIL
function rendercoctails() {
  ulElement.innerHTML='';
  for (const oneDrink of coctails) {
    ulElement.innerHTML += `
    <li class="js-list-item">
    <img src= "${oneDrink.image ? oneDrink.image : placeHoldImage}" alt= "${oneDrink.name}"/>
    ${oneDrink.name}
    </li>`;
  }
}

//BUSQUEDA COCTAIL
function handleClick(event) {
  event.preventDefault();
  let inputValue = inputSearch.value;

if (inputValue === '') {
  fetchMargaritas();
  console.log('No hay búsqueda');
  
} else {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`)
  .then(response => response.json())
  .then((data) => {
    console.log(data.drinks);
    coctails = data.drinks.map((drinks)=>({
      name: drinks.strDrink,
      image: drinks.strDrinkThumb,
    }));
    rendercoctails();
    console.log(coctails);
  });
  
};}

//EVENTOS
buttonSearch.addEventListener("click", handleClick);


//LLAMADAS DE FUNCIONES
fetchMargaritas();


