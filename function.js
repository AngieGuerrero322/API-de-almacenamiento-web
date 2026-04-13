let nombre = document.getElementById("nombrePokemon").value;
let nombrePokemon = document.getElementById("nombre");
let imagenPokemon = document.getElementById("imagenPokemon");
const pokemonActual = null;
const url = " https://pokeapi.co/api/v2/pokemon";

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



function saveFavorite() {
  if (!pokemonActual) {
    alert("Busca un Pokemon");
    return;
  }

  const favoritos = obtenerFavorites();

  const existe = favoritos.some(p => p.name === pokemonActual.name);

  if (existe) {
    alert("Ya esta en favoritos");
    return;
  }

  favoritos.push(pokemonActual);
  setearFavoritos(favoritos);

  mostrarFavoritos();
}


function obtenerFavorites() {
  return JSON.parse(localStorage.getItem("favoritos")) || [];
}

function setearFavoritos(favoritos) {
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

function mostrarFavoritos() {
  const contenedor = document.getElementById("favoritos");
  container.innerHTML = "";

  const favoritos = obtenerFavorites();

  favoritos.forEach(pokemon => {
    const div = document.createElement("div");

    div.innerHTML = `
      <p>${pokemon.name}</p>
      <img src="${pokemon.image}" width="80">
    `;

    contenedor.appendChild(div);
  });
}