const popNovoJogador = document.getElementById('popupJogador')

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
});

const closePopup = () => {
    popNovoJogador.style.display = 'none'
    popNovoJogador.classList.add('hidden')
}

const btnNovoJogador = () => {
    let nomeNovoJogador = document.querySelector('input[type=text]').value;
    nomeNovoJogador != '' ? closePopup() : 0;
    nomeNovoJogadorFormatado = nomeNovoJogador.trim('')
    localStorage.setItem("nomeJogador", nomeNovoJogadorFormatado);
    localStorage.setItem("pontosJogador", 0);

    return 1

}

function limparLocalStorageEAtualizar(){
    localStorage.clear();
}