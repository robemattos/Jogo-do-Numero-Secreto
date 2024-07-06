//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do Número Secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um Número entre 1 e 10';

let listaDeNumerosSorteados = []; // Cria uma lista vazia aonde serão armazenados os números sorteados
let numeroLimite = prompt('Informe um número máximo inteiro para estabelecer o limite');//10; // Range de números a serem sorteados (Ex: de 1 a 10)
let numeroSecreto = gerarNumeroAleatorio(); // Gera um número secreto aleatório
console.log(numeroSecreto);
let tentativas = 1; // Conta o número de tentativas do jogador

/////////////// Função que fará o controle dos textos exibidos na tela do jogo
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    /////////////// Função que torna o jogo responsivo, ela permite que o programa fale com o usuário.
    /////////////// FSão passados como parâmetro o texto, idioma entre aspas ("" ou '') e a velocidade
    /////////////// de narração do texto, através do método "rate".
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

/////////////// Função que exibe o texto da tela inicial do jogo
function exibirMensagemInicial() {
    //let numeroLimite = prompt(`Informe um número máximo inteiro para estabelecer o limite`);
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', `Escolha um Número entre 1 e ${numeroLimite}`);
}

exibirMensagemInicial();

/////////////// Função que verifica se o número chutado é o número secreto
function verificarChute() {
    let chute = document.querySelector('input').value; // Usa-se (.value) se para pegar o valor do campo
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        document.getElementById('reiniciar').removeAttribute('disabled');
        exibirTextoNaTela('p', mensagemTentativas);
        } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

/////////////// Função que gera um número secreto aleatório e verifica se todos os números do range já foram
/////////////// verificados
function gerarNumeroAleatorio() {
    //return parseInt(Math.random() * 10 + 1);
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { // Método "includes" verifica se o número já consta na lista
        return gerarNumeroAleatorio(); // Essa linha contém uma função  recursiva, ou seja, a função "gerarNumeroAleatorio()" chama ela mesma
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // Método "push" adiciona um elemento no final da lista
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

/////////////// Função que limpa o campo "Chute"
function limparCampo() {
    chute = document.querySelector('input'); // Nesse caso não usamos (.value) pois só precisamos pegar o campo.
    chute.value = ''; // Nesse caso usamos o (.value) porque queremos atribuir o valor vazio ('') ao campo
}

/////////////// Função que reinicia o jogo tota vez que o botão "Novo jogo" é clicado
function reiniciarJogo() {
    
    //numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    numeroLimite = prompt('Informe um número máximo inteiro para estabelecer o limite');
    numeroSecreto = gerarNumeroAleatorio();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}