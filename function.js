let buscarPokemon = document.getElementById("btnBuscar");
let nombrePokemon = document.getElementById("nombre");
let imagenPokemon = document.getElementById("imagenPokemon");
let resultado = document.getElementById("resultadoPokemon");
let btnGuardar = document.getElementById("btnGuardar");
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

buscarPokemon.addEventListener("click", function () {
  resultado.style.display = "block";
  searchPokemon();
});


function obtenerFavorites() {
  return JSON.parse(localStorage.getItem("favoritos")) || [];
}
function setearFavoritos(favoritos) {
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

function saveFavorite() {
  if (!pokemonGlobal) {
    alert("Busca un Pokemon");
    return;
  }
  const favoritos = obtenerFavorites();
  const existe = favoritos.some((p) => p.name === pokemonGlobal.name);
  if (existe) {
    alert("Ya esta en favoritos");
    return;
  }
  console.log("click en favorito", pokemonGlobal);

  favoritos.push(pokemonGlobal);
  setearFavoritos(favoritos);

  updateFavoritesList();

  console.log("click en favorito22", favoritos);

  obtenerFavorites();
  setearFavoritos(favoritos);
  updateFavoritesList();
}

btnGuardar.addEventListener("click", saveFavorite);

  console.log("click en favorito22", favoritos);
/* Función 3: Mostrar favoritos */
function updateFavoritesList() {
  let guardados = localStorage.getItem("favoritos");
  let lista = guardados ? JSON.parse(guardados) : [];

  document.getElementById("favoritos").innerHTML = "";

  lista.forEach(function (pokemon) {
    let tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";
    tarjeta.innerHTML =
      "<img src='" + pokemon.sprites.front_default + "'>" + "<p>" + pokemon.name + "</p>";
    document.getElementById("favoritos").appendChild(tarjeta);
  });
}

updateFavoritesList();
