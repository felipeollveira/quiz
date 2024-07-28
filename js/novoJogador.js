//const popNovoJogador = document.getElementById('popupJogador')

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
});

const modalDigiteNickname = () => {
    popNovoJogador.style.display = 'grid' 

}

const closePopup = () => {
    popNovoJogador.style.display = 'none'
    popNovoJogador.classList.add('hidden')
}

const btnNovoJogador = () => {
    let nomeNovoJogador = document.querySelector('input[type=text]').value;
    nomeNovoJogadorFormatado = nomeNovoJogador.trim('')
    localStorage.setItem("nomeJogador", nomeNovoJogadorFormatado);
    localStorage.setItem("pontosJogador", 0);

    setTimeout(() => {
        location.reload();
        nomeNovoJogador != '' ? closePopup() : 0;

    }, 300);

}



function limparLocalStorageEAtualizar(){
    localStorage.clear();
}