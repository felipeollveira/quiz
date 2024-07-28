// Seleção de elementos do DOM
const menuInicial = document.getElementById('header');
const gameStart = document.getElementById('main');
const quiz = document.getElementById('quiz-name');
const modal = document.querySelector('.modal');
const final = document.getElementById('final');
const nameJogadorElement = document.getElementById('nameJogador');
const avatarElement = document.getElementById('avatar');
const popNovoJogador = document.getElementById('popupJogador'); // Certifique-se de ter este elemento no HTML
const questao = document.querySelector('.questao');
const instrucoes = document.getElementById('inst');
const nQuestao = document.querySelector('#nQuestao');
const pergunta = document.querySelector('#pergunta');
const a = document.querySelector('#a');
const b = document.querySelector('#b');
const c = document.querySelector('#c');
const d = document.querySelector('#d');
const e = document.querySelector('#e');
const numero = document.querySelector('#numero');
const total = document.querySelector('#total');
const placar = document.querySelector('#placar');
const pontosview = document.getElementById('pontos');
const bar = document.getElementById("progress");

// Variáveis globais
let indiceQuestaoAtual = 1;
let pontos = 0;
let dadosQuiz = null;
let nomeJogador = localStorage.getItem("nomeJogador") || undefined;

// URL do arquivo JSON do quiz
const url = './js/data.json';

// Define o nome do jogador na interface
nameJogadorElement.textContent = nomeJogador ? `Olá, ${nomeJogador}` : "Escolha um quiz";
avatarElement.textContent = nomeJogador ? nomeJogador[0] : undefined;

// Define o título do quiz
quiz.textContent = document.querySelector('#bra').textContent;

// Função para exibir o modal de fim de jogo
function exibirModalFinal() {
  modal.style.display = 'flex';
  final.style.display = 'grid';
}

// Função para lidar com o clique no botão "Jogar"
function iniciarQuiz() {
  if (!nomeJogador) {
    popNovoJogador.style.display = 'grid';
    return;
  }

  menuInicial.style.display = 'none';
  gameStart.style.display = 'grid';

  carregarDadosQuiz();
}

// Função para carregar os dados do quiz
function carregarDadosQuiz() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        console.error("Erro ao acessar o JSON");
        return;
      }
      dadosQuiz = data;
      iniciarJogo();
    })
    .catch(error => {
      console.error("Erro ao buscar dados:", error);
    });
}

// Função para iniciar o jogo após carregar os dados do quiz
function iniciarJogo() {
  indiceQuestaoAtual = 1;
  pontos = 0;
  atualizarInterface();
  total.textContent = dadosQuiz.questoes.length;
  bar.style.width = '0%'; // Reinicia a barra de progresso
}

// Função para atualizar a interface do jogo
function atualizarInterface() {
  const questaoAtual = dadosQuiz.questoes[indiceQuestaoAtual];

  nQuestao.textContent = `${indiceQuestaoAtual + 1}/${dadosQuiz.questoes.length}`;
  pergunta.textContent = questaoAtual.pergunta;
  a.textContent = questaoAtual.alternativaA;
  b.textContent = questaoAtual.alternativaB;
  c.textContent = questaoAtual.alternativaC;
  d.textContent = questaoAtual.alternativaD;
  e.textContent = questaoAtual.alternativaE;
  //numero.textContent = indiceQuestaoAtual + 1;

  document.getElementById('correct').value = questaoAtual.correta;
}

// Função para lidar com a resposta do jogador
function verificarResposta(resposta) {
  const respostaCorreta = dadosQuiz.questoes[indiceQuestaoAtual].correta;

  if (resposta === respostaCorreta) {
    pontos += 10;
  }

  proximaQuestao();
}

// Função para atualizar a barra de progresso
function atualizarBarraProgresso() {
  const progresso = ((indiceQuestaoAtual) / dadosQuiz.questoes.length) * 100;
  bar.style.width = `${progresso}%`;
}

// Função para avançar para a próxima questão
function proximaQuestao() {
  indiceQuestaoAtual++;
  atualizarBarraProgresso();
  console.log(indiceQuestaoAtual)
// < por que tem 11 questões contando com a template de indice 0
  if (indiceQuestaoAtual < dadosQuiz.questoes.length) {
    atualizarInterface();
  } else {
    finalizarQuiz();
  }
}

// Função para finalizar o quiz
function finalizarQuiz() {
  exibirModalFinal();
  salvarPontuacao()
  // pontuação final
  placar.textContent = `Você fez ${pontos} de ${dadosQuiz.questoes.length * 10 - 10}`;

}

// Carrega as pontuações do jogador no modal
function carregarPontuacoes() {
  const scoreTableBody = document.getElementById("scoreTableBody");
  scoreTableBody.innerHTML = ''; // Limpa a tabela

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key !== "nomeJogador") { // Ignora a chave "nomeJogador"
      const pontuacao = localStorage.getItem(key);
      const row = scoreTableBody.insertRow();
      const cell1 = row.insertCell();
      const cell2 = row.insertCell();
      cell1.textContent = key; 
      cell2.textContent = pontuacao; 
    }
  }
}

function salvarPontuacao() {
  const nomeQuiz = document.querySelector('#bra p').textContent; // Obtém o nome do quiz
  localStorage.setItem(nomeQuiz, pontos); // Salva a pontuação com o nome do quiz como chave
  carregarPontuacoes(); // Atualiza a tabela de pontuações no modal
}

// Função para reiniciar o quiz
function reiniciarQuiz() {
  iniciarJogo();
  modal.style.display = 'none';
  final.style.display = 'none';
}

// Função para voltar à tela inicial
function voltarAoInicio() {
  location.reload();
}

// Event Listeners para os botões
const botaoIniciar = document.getElementById('iniciarQuiz'); 
botaoIniciar.addEventListener('click', iniciarQuiz);


const botaoVoltarInicio = document.getElementById('voltarInicio'); 
botaoVoltarInicio.addEventListener('click', voltarAoInicio);

// Event Listeners para as alternativas
a.addEventListener('click', () => verificarResposta('a'));
b.addEventListener('click', () => verificarResposta('b'));
c.addEventListener('click', () => verificarResposta('c'));
d.addEventListener('click', () => verificarResposta('d'));
e.addEventListener('click', () => verificarResposta('e'));
