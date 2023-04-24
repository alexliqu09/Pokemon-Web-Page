const carousel = document.querySelector('.carousel');
const slide = carousel.querySelector('.slide');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let currentSlide = 1;

const pokemonColors = {
  black: '#262626',
  blue: '#1995d3',
  brown: '#a8692e',
  gray: '#919191',
  green: '#3ab43a',
  pink: '#ee7ca4',
  purple: '#7e1d81',
  red: '#ed1c24',
  white: '#ffffff',
  yellow: '#ffcb05'
};

function showSlide(slideIndex) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${slideIndex}/`)
    .then(response => response.json())
    .then(data => {
      slide.src = data.sprites.front_default;
      slide.alt = data.name;
      slide.setAttribute('data-pokemon-name', data.name);
      slide.setAttribute('data-pokemon-id', data.id);
      slide.setAttribute('data-pokemon-abilities', data.abilities.map(ability => ability.ability.name).join(', '));
      slide.setAttribute('data-pokemon-height', data.height);
      slide.setAttribute('data-pokemon-weight', data.weight);
      slide.setAttribute('data-pokemon-types', data.types.map(type => type.type.name).join(', '));
    })
    .catch(error => console.error(error));
}

function setColor(color) {
  document.body.style.backgroundColor = color;
}

function getPokemonColor(pokemonIndex) {
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`)
    .then(response => response.json())
    .then(data => {
      const color = data.color.name;
      setColor(pokemonColors[color]);
    })
    .catch(error => console.error(error));
}

function showStats() {
  const pokemonName = slide.getAttribute('data-pokemon-name');
  const pokemonId = slide.getAttribute('data-pokemon-id');
  const pokemonAbilities = slide.getAttribute('data-pokemon-abilities');
  const pokemonHeight = slide.getAttribute('data-pokemon-height');
  const pokemonWeight = slide.getAttribute('data-pokemon-weight');
  const pokemonTypes = slide.getAttribute('data-pokemon-types');

  alert(`Nombre: ${pokemonName}
	ID: ${pokemonId}
	Habilidades: ${pokemonAbilities}
	Altura: ${pokemonHeight} cm
	Peso: ${pokemonWeight} kg
	Tipos: ${pokemonTypes}`);
}

showSlide(currentSlide);
getPokemonColor(currentSlide);

prevButton.addEventListener('click', () => {
  if (currentSlide === 1) {
    currentSlide = 649;
  } else {
    currentSlide--;
  }
  showSlide(currentSlide);
  getPokemonColor(currentSlide);
});

nextButton.addEventListener('click', () => {
  if (currentSlide === 649) {
    currentSlide = 1;
  } else {
    currentSlide++;
  }
  showSlide(currentSlide);
  getPokemonColor(currentSlide);
});

slide.addEventListener('click', () => {
  showStats();
});
