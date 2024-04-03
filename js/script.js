
const menuInicial = document.getElementById('header')
const gameStart = document.getElementById('main')
const img = document.getElementById('img')
/* titulo do quiz */
const title = document.querySelector('#bra').textContent;
const quiz = document.getElementById('quiz-name');
quiz.textContent = title;
let modal = document.querySelector('.modal')
let nameJogador = document.getElementById('nameJogador');

function displiz(){
    let final = document.getElementById('final')
    modal.style.display='flex'
    final.style.display='grid'
 }
//localStorage.clear()

const nomeJogador = localStorage.getItem("nomeJogador");
nomeJogador !== null ? nameJogador.textContent = `Escolha um quiz` : nameJogador.textContent = 'Bem-vindo';
let avatar = document.getElementById('avatar').textContent = nomeJogador[0]

function clicouNoQuiz(){

  if (!nomeJogador) {
      popNovoJogador.style.display = 'grid' 
      return 0;
  } 
   
    //console.log(localStorage)
    
    menuInicial.style.display = 'none'
    gameStart.style.display = 'grid'
  
    pegarDados(1)
}

/* App JS com JSON */
// article da questao
let questao = document.querySelector('.questao')
let instrucoes = document.getElementById('inst')
let nQuestao = document.querySelector('#nQuestao')
let pergunta = document.querySelector('#pergunta')

let a = document.querySelector('#a')
let b = document.querySelector('#b')
let c = document.querySelector('#c')
let d = document.querySelector('#d')
let e = document.querySelector('#e')

let numero = document.querySelector('#numero')
let total  = document.querySelector('#total')

let totalDeQuestoes = 0
numero.textContent  = 1

let pontos = 0
let placar = document.querySelector('#placar')

 
 // VERFICAÇÃO DO ENDERECO DO ARQUIVO JSON
 const url = './js/data.json'
//FIM DA VERFICAÇÃO

function pegarDados(i) {
    fetch(url).then(response =>{
          return response.json();
        }).then(data => {
          if(data.erro) {
            console.log("Erro ao acessar o JSON")
            return
          }
           // passar o quantidade de questoes para a variavel
          let qtdQuestoes = (data.questoes.length)-1
          // escrver a qtdQuestoes para total
          total.textContent = parseInt(qtdQuestoes)
          // passe o valor de i no parametro
          atribuirDados(data, i)
  
        })
  } // fim pegarDados

function atribuirDados(data, i) {
  if(i >= data.questoes.length) {
    i = 1
    
  }
    let qtdQuestoes = (data.questoes.length)-1
    nQuestao.textContent = data.questoes[i].numQuestao + '/' + qtdQuestoes
    pergunta.textContent = data.questoes[i].pergunta

    a.textContent = data.questoes[i].alternativaA
    b.textContent = data.questoes[i].alternativaB
    c.textContent = data.questoes[i].alternativaC
    d.textContent = data.questoes[i].alternativaD
    e.textContent = data.questoes[i].alternativaE
    
    numero.textContent = data.questoes[i].numQuestao
    
    let certa = document.querySelector('#correct')
    certa.value = data.questoes[i].correta
    //console.log(resposta)
    return 0;
}

let bar = document.getElementById("progress");
let ba = 0

function progresso() {
    ba = ba + 10;
    bar.style.width = ba + "%"
   }



// COMECAR O QUIZ

function proximaQuestao(numQuestao) {
  let proxima = parseInt(numQuestao)
  pegarDados(proxima)
  }

function verificarSeAcertou(nQuestao, resposta) {
  progresso()
  let numeroDaQuestao = nQuestao.value
  //console.log("Questão " + numeroDaQuestao)

  let respostaEscolhida = resposta.textContent
  //console.log("" + respostaEscolhida)

  // usar o fetch para pegar os dados
  pegarDados(numeroDaQuestao)

  let respostaCorrect = correct.value
  //console.log(respostaCorrect)

  if(respostaEscolhida == respostaCorrect) {
      //console.log("Acertou")
      pontos += 10 // pontos = pontos + 10
  } else {
      //console.log("Errou!")
 }

  quantidadeDeQuestoes = parseInt(total.textContent)
  //console.log("Total " + quantidadeDeQuestoes)

  proxima = parseInt(numero.textContent)+1
  //console.log("Próxima " + proxima)

 

  setTimeout(function() {
    
    if(proxima > quantidadeDeQuestoes) {
      displiz()
      
        fimDoJogo() 
        
    } else {
        proximaQuestao(proxima)
    }
  }, 50)
  return 0;
}

function fimDoJogo() {
      
   
    if (pontos == 0) {
      placar.textContent =+pontos+' de 100'
    } else {
      placar.textContent =`${nomeJogador} você acertou : `+pontos+' de 100'
    } if(pontos > 70){
      placar.textContent =`Parabéns ${nomeJogador}! Acertou `+pontos+' de 100'
    }
     
    localStorage.setItem("pontosJogador", pontos);



    
  } 
  
  const pontosArmazenados = localStorage.getItem("pontosJogador");
const pontosview = document.getElementById('pontos');
pontosview.textContent = `${pontosArmazenados ? pontosArmazenados : 0}/100`;

    
    function rei(){
        pontos = 0 // zerar placar
      proximaQuestao(1) }

    function toHome(){
      location.reload();
    }




    function mood(){
      alert('Ok')
    }

  