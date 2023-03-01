'use strict';

//constantes y variables

const buttonSearch = document.querySelector('.js-button-search');
const inputSearch = document.querySelector('.js-input-search');
const ulElement = document.querySelector('.js-search-list');
const ulFavElement = document.querySelector('.js-fav-list');
const placeHoldImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=Sorry%20we%20don%C2%B4t%20have%20a%20picture%20for%20this%20:(';
const buttonLog = document.querySelector('.js-button-log');

let coctails = [];
let favCoctails = [];


//MOSTRAR MARGARITAS
function fetchMargaritas() {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`)
    .then(response => response.json())
    .then((data) => {
      coctails = data.drinks.map((drinks) => ({
        id: drinks.idDrink,
        name: drinks.strDrink,
        image: drinks.strDrinkThumb,
        instructions: drinks.strInstructions,
      }));
      renderCoctails();
    });
}


// // Marcar si está en favoritos

  ////  si el coctails está en favoritos marcalo con la clase favourties, si no está si alguno de los coatils de la busqueda está en la lista de favoritos entonces añade le la clase favourtires

  // comparame la busqueda de coctails con la lista de favoritos, si coincide ponme la clase favourties en el coctail de la lista de busqueda y pintala lista  sino coincide pues solo pinta la busqueda


//Borrar búsqueda anterior y PINTAR COCTAILS *****
function renderCoctails() {
  ulElement.innerHTML = '';
  for (const oneDrink of coctails) {
    const indexCoctail = favCoctails.findIndex(drinks => drinks.id === oneDrink.id);

    //creo variable con clase

    ulElement.innerHTML += `
    <li class="js-list-item" id="${oneDrink.id}">
    <img src= "${oneDrink.image ? oneDrink.image : placeHoldImage}" alt= "${oneDrink.name}"/>
    ${oneDrink.name}
    <p>${oneDrink.instructions}</p>
    </li>`;

  }
  addEventToCoctails();
}

function renderFavList() {
  ulFavElement.innerHTML = '';
  for (const oneDrink of favCoctails) {
    ulFavElement.innerHTML += `
    <li class="js-list-item" id="${oneDrink.id}">
    <img src= "${oneDrink.image ? oneDrink.image : placeHoldImage}" alt= "${oneDrink.name}"/>
    ${oneDrink.name}
    <p>${oneDrink.instructions}</p>
    </li>`;
  }
}


//BUSQUEDA COCTAIL
function handleClickSearch(event) {
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
        coctails = data.drinks.map((drinks) => ({
          id: drinks.idDrink,
          name: drinks.strDrink,
          image: drinks.strDrinkThumb,
          instructions: drinks.strInstructions,
        }));
        renderCoctails();
      });

  }
}

//Añadir cocteles FAVORITOS

function handleClickFav(ev) {
  ev.currentTarget.classList.toggle('favourites');
  const favDrink = coctails.find(drinks => drinks.id === ev.currentTarget.id);
  const indexCoctail = favCoctails.findIndex(drinks => drinks.id === ev.currentTarget.id);
  console.log(favCoctails);

  if (indexCoctail === -1) {
    favCoctails.push(favDrink);
  }else{
    favCoctails.splice(indexCoctail,1);
  }
  localStorage.setItem('favCoctails',JSON.stringify(favCoctails));
  renderFavList();
}


function addEventToCoctails() {
  const liElementList = document.querySelectorAll('.js-list-item');
  for (const li of liElementList) {
    li.addEventListener('click', handleClickFav);
  }
}

//Local storage get
const FavCoctailsStored = JSON.parse(localStorage.getItem('favCoctails'));
if (FavCoctailsStored) {
  //existe el listado de coctails en el local storage
  favCoctails = FavCoctailsStored;
  console.log(favCoctails);
  // vuelve a pintar el listado
  renderFavList();
}

function handleLog (ev) {
  ev.preventDefault();
for (const oneDrink of coctails) {
  
console.log(oneDrink.name)

}

}


//EVENTOS
buttonSearch.addEventListener('click', handleClickSearch);
buttonLog.addEventListener('click', handleLog);


//LLAMADAS DE FUNCIONES
fetchMargaritas();
addEventToCoctails();

