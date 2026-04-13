let nombre = document.getElementById("nombrePokemon").value;
let nombrePokemon = document.getElementById("nombre");
let imagenPokemon = document.getElementById("imagenPokemon");
const pokemonActual = null;
const url = " https://pokeapi.co/api/v2/pokemon";


/* Funcion Buscar pokemón*/
function searchPokemon() {
  fetch(url + nombre)
    .then(function (response) {
        if (response) {
             return response.json();
        }
        else {
            alert("Pokémon no encontrado")
        }
    })
    .then(function (data) {
      // Datos del Pokémon aquí
      nombrePokemon.textContent =  data.name;
      imagenPokemon.textContent =  data.sprites.front_default;

      console.log(data);
    })
    .catch(function (error) {
      alert("¡Error! Pokémon no encontrado");
    });
}

searchPokemon();
