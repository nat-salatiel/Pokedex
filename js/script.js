// Seleciona os elementos do DOM (HTML) que vão ser manipulados
const pokemonName = document.querySelector('.pokemon__name');     // Nome do Pokémon
const pokemonNumber = document.querySelector('.pokemon__number'); // Número do Pokémon
const pokemonImage = document.querySelector('.pokemon__image');   // Imagem do Pokémon

const form = document.querySelector('.form');            // Formulário de busca
const input = document.querySelector('.input__search');  // Campo de input para buscar o Pokémon

const buttonPrev = document.querySelector('.btn-prev');  // Botão "anterior"
const buttonNext = document.querySelector('.btn-next');  // Botão "próximo"

// Variável que guarda o ID do Pokémon atualmente exibido
let searchPokemon = 1;

// Função assíncrona para buscar dados da PokéAPI
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    // Faz uma requisição à PokéAPI usando o nome ou número do Pokémon

    if (APIResponse.status == 200) {
        // Se a resposta for OK (código 200)
        const data = await APIResponse.json(); // Converte a resposta para JSON
        return data; // Retorna os dados do Pokémon
    }
}

// Função para exibir os dados na interface
const renderPokemon = async (pokemon) => {
    // Exibe "Loading..." enquanto busca os dados
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon); // Busca os dados do Pokémon

    if (data) {
        // Se encontrar o Pokémon:
        pokemonName.innerHTML = data.name; // Mostra o nome
        pokemonNumber.innerHTML = data.id; // Mostra o número

        // Mostra a imagem animada da 5ª geração, versão preto e branco
        pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated['front_default'];

        input.value = ""; // Limpa o campo de input
        searchPokemon = data.id; // Atualiza a variável com o ID atual
        pokemonImage.style.display = 'block'; // Garante que a imagem apareça caso estivesse escondida
    } else {
        // Se não encontrar:
        pokemonImage.style.display = 'none'; // Esconde a imagem
        pokemonName.innerHTML = 'Not found'; // Mensagem de erro
        pokemonNumber.innerHTML = '';        // Limpa o número
        input.value = "";                    // Limpa o campo de busca
    }
}

// Evento de envio do formulário (busca por nome ou número)
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede que o formulário recarregue a página
    renderPokemon(input.value.toLowerCase()); // Busca o Pokémon pelo nome (minúsculo)
});

// Evento do botão "anterior"
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1; // Vai para o Pokémon anterior
        renderPokemon(searchPokemon); // Atualiza a tela
    }
});

// Evento do botão "próximo"
buttonNext.addEventListener('click', () => {
    searchPokemon += 1; // Vai para o próximo Pokémon
    renderPokemon(searchPokemon); // Atualiza a tela
});

// Mostra o primeiro Pokémon ao carregar a página
renderPokemon(searchPokemon);
