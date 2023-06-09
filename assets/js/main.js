const pokemonsList = document.querySelector("#orderedPokemonsLi");
const loadMoreButton = document.querySelector("#loadMoreButton");
const maxRecords = 151;
const limit = 9;
let offset = 0;

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        (pokemon) => `
      <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
          <ol class="types">
            ${pokemon.types
              .map((type) => `<li class="type ${type}">${type}</li>`)
              .join("")}
          </ol>

          <img src="${pokemon.photo}"
                alt="${pokemon.name}">
        </div>
      </li>
    
    `
      )
      .join("");
    pokemonsList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;

  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    return loadMoreButton.parentElement.removeChild(loadMoreButton);
  }

  return loadPokemonItens(offset, limit);
});
