// Variable global para guardar el Pokémon encontrado
let nombrePokemonActual = null;
let imagenPokemon = document.getElementById("imagenPokemon");
let nombrePokemon = document.getElementById("nombre");
const url = "https://pokeapi.co/api/v2/pokemon/";


// ================================
// FUNCIÓN 1: BUSCAR EL POKÉMON
// ================================
function searchPokemon() {

    // ✅ Obtiene el nombre del input
    let nombre = document.getElementById("nombrePokemon").value;
    nombre = nombre.toLowerCase();

    // ✅ Usa fetch para pedir datos a la PokéAPI
    fetch(url + nombre)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                alert("Pokémon no encontrado.");
            }
        })
        .then(function(data) {
            // ✅ Guarda los datos en la variable global
            nombrePokemonActual = data;

            // ✅ Muestra imagen y nombre en el div de resultados
            nombrePokemon.textContent = data.name;
            imagenPokemon.src = data.sprites.front_default;
        })
        .catch(function(error) {
            // ✅ Si no existe, muestra alert
            alert("Pokémon no encontrado.");
            nombrePokemonActual = null;
        });
}


// ================================
// FUNCIÓN 2: GUARDAR FAVORITO
// ================================
function saveFavorite() {

    // ✅ Verifica que la variable global tenga datos
    if (nombrePokemonActual === null) {
        alert("Primero busca un Pokémon.");
        return;
    }

    // ✅ Obtiene la lista de localStorage, si no hay crea array vacío
    let guardados = localStorage.getItem("favoritos");
    let lista = guardados ? JSON.parse(guardados) : [];

    // ✅ Añade solo si no está repetido
    let yaExiste = lista.some(function(p) {
        return p.nombre === nombrePokemonActual.name;
    });
    if (yaExiste) {
        alert("Este Pokémon ya está en tus favoritos.");
        return;
    }

    let nuevoFavorito = {
        nombre: nombrePokemonActual.name,
        imagen: nombrePokemonActual.sprites.front_default
    };
    lista.push(nuevoFavorito);

    // ✅ Guarda con JSON.stringify()
    localStorage.setItem("favoritos", JSON.stringify(lista));

    // ✅ Llama a updateFavoritesList()
    updateFavoritesList();
    alert("¡" + nombrePokemonActual.name + " guardado!");
}


// ================================
// FUNCIÓN 3: MOSTRAR FAVORITOS
// ================================
function updateFavoritesList() {

    // ✅ Lee favoritos con JSON.parse()
    let guardados = localStorage.getItem("favoritos");
    let lista = guardados ? JSON.parse(guardados) : [];

    // ✅ Borra el contenido anterior
    document.getElementById("favoritos").innerHTML = "";

    // ✅ Por cada Pokémon crea un div con imagen y nombre
    lista.forEach(function(pokemon) {
        let tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta";
        tarjeta.innerHTML =
            "<img src='" + pokemon.imagen + "'>" +
            "<p>" + pokemon.nombre + "</p>";
        document.getElementById("favoritos").appendChild(tarjeta);
    });
}

document.getElementById("btnBuscar").addEventListener("click", searchPokemon);
document.getElementById("btnGuardar").addEventListener("click", saveFavorite);

// ✅ Al cargar la página muestra los favoritos guardados
updateFavoritesList();