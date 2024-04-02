const popNovoJogador = document.getElementById('popupJogador')

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
});

const closePopup = () => {
    popNovoJogador.style.display = 'none'
}

const btnNovoJogador = () => {
    let nomeNovoJogador = document.querySelector('input[type=text]').value;
    nomeNovoJogador != '' ? closePopup() : 0;

    localStorage.setItem("nomeJogador", nomeNovoJogador);
    localStorage.setItem("pontosJogador", 0);

    return 1

}