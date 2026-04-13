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

buscarPokemon.addEventListener("click", function (){
    resultado.style.display ="block";
});

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

function saveFavorite() {
  if (!pokemonGlobal) {
    alert("Busca un Pokemon");
    return;
  }
  const favoritos = obtenerFavorites();
  const existe = favoritos.some((p) => p.name === pokemonActual.name);
  if (existe) {
    alert("Ya esta en favoritos");
    return;
  }
  console.log("click en favorito", pokemonGlobal);
  
  favoritos.push(pokemonGlobal);
  setearFavoritos(favoritos);
  updateFavoritesList();

  function obtenerFavorites() {
    return JSON.parse(localStorage.getItem("favoritos")) || [];
  }
  function setearFavoritos(favoritos) {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }
}

btnGuardar.addEventListener("click", saveFavorite)

/* Función 3: Mostrar favoritos */
function updateFavoritesList() {
  let guardados = localStorage.getItem("favoritos");
  let lista = guardados ? JSON.parse(guardados) : [];

  document.getElementById("favoritos").innerHTML = "";

  lista.forEach(function (pokemon) {
    let tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";
    tarjeta.innerHTML =
      "<img src='" + pokemon.imagen + "'>" + "<p>" + pokemon.nombre + "</p>";
    document.getElementById("favoritos").appendChild(tarjeta);
  });
}

document.getElementById("btnBuscar").addEventListener("click", searchPokemon);
document.getElementById("btnGuardar").addEventListener("click", saveFavorite);

updateFavoritesList();
