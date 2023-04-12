const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
  return`
    <div class="card ${pokemon.type} mb-3 col-5 col-md-3 col-lg-2 mx-2">
      <div class="card-body d-flex flex-column justify-content-between">
        <div>
          <div class="d-flex flex-wrap justify-content-between align-items-baseline">
            <h5 class="card-title">${pokemon.name}</h5>
            <h6>#${pokemon.number}</h6>
          </div>
          <div>
            ${pokemon.types.map((type) => `<a href="#" class="btn rounded-pill btn-sm ${type}">${type.toUpperCase()}</a>`).join(' ')}       
          </div>
        </div>
        <div class="row">
          <div class="pt-2 col-10 col-md-8 ms-auto ">
            <img width="100%" height="120px" src="${pokemon.photo}" alt="${pokemon.name}">
          </div>
        </div>
      </div>
    </div>
  `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})