const avatart = document.getElementById("modalAvatar");

const nameView = document.getElementById("modalName")
const nome = localStorage.getItem("nomeJogador");

nameView.innerHTML = nome && nome.length > 1 ? nome : "";


const localStorageLength = () => {
  localStorage.length < 1 ? 1:0;
}

function openPlayerModal(){
  localStorage.length < 1 ? modalDigiteNickname() : 
  buildModal(localStorage)
}

 function closePlayerModal() {
      document.getElementById("playerModal").style.display = "none";
}

function deletePlayer(){
  localStorage.clear();
  setTimeout(() => {
location.reload()    
  }, 300);
}

const buildModal= (data) => {
  document.getElementById("playerModal").style.display = "grid"
  const scoreTableBody = document.getElementById("scoreTableBody")

    scoreTableBody.textContent = data.pontosJogador

}
