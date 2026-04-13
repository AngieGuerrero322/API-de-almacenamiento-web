let buscarPokemon = document.getElementById("btnBuscar");
let nombrePokemon = document.getElementById("nombre");
let imagenPokemon = document.getElementById("imagenPokemon");
let pokemonGlobal = null;
const url = " https://pokeapi.co/api/v2/pokemon/";

/* Funcion Buscar pokemón*/
function searchPokemon() {
  const nombre = document.getElementById("nombrePokemon").value.trim();

     
  fetch(url + nombre)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        alert("Pokémon no encontrado");
        return;
      }
    })
    .then(function (data) {
      // Datos del Pokémon aquí
      nombrePokemon.textContent = data.name;
      imagenPokemon.src = data.sprites.front_default;
      pokemonGlobal = data;
      console.log(pokemonGlobal);
    })
    .catch(function (error) {
      alert("¡Error! Pokémon no encontrado");
    });
}

buscarPokemon.addEventListener("click", searchPokemon)