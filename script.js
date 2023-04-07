
const intro = document.getElementById('header')
const desen = document.getElementById('main')
const img = document.getElementById('img')
/* titulo do quiz */
const title = document.querySelector('#bra').textContent;
const quiz = document.getElementById('quiz-name');
quiz.textContent = title;
let modal = document.querySelector('.modal')
function displiz(){
    let final = document.getElementById('final')
    
    modal.style.display='flex'
    final.style.display='grid'
 }

function quizBR(){
    intro.style.display = 'none'
    desen.style.display = 'grid'
         
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

// ENDERECO DO ARQUIVO JSON
const url = 'data.json'

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
}

// COMECAR O QUIZ
let questaoAtual = 1
pegarDados(1)

function proximaQuestao(numQuestao) {
  let proxima = parseInt(numQuestao)
  pegarDados(proxima)
}

function verificarSeAcertou(nQuestao, resposta) {

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

}

function fimDoJogo() {

    placar.textContent ='Acertos: '+pontos+'/100'
    if (pontos == 0) {
        console.log("Você não acertou nenhuma questão.")
    } else {
        console.log("É...")
    } if(pontos == 100){
        console.log('UAU!') 
    }
  
      
    } function rei(){
        pontos = 0 // zerar placar
      proximaQuestao(1) }

    function toHome(){
        intro.style.display = 'grid'
        desen.style.display = 'none'
        final.style.display ='none'
        modal.style.display = 'none'
        rei()
    }