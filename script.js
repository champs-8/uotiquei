// Div principal do jogo
//vou começar perguntando a quantidade de numeros da senha do amigo

const listTentativas = document.getElementById('list-tentativas'); //div que envolve as tentativas e o botão certo
const keyLength = document.getElementById('keyLength'); //div botoes da quantidade de numeros da senha
const confirmButton = document.getElementById('confirmButton'); //botao de confirmar quantidade de numeros da senha
const tentativas = document.getElementById('tentativas'); //div que envolve as tentativas e o botão certo
const myPass = document.getElementById('myPass'); //div para mostrar a sua propria senha
const app = document.getElementById('app'); //div principal do jogo

//impede que o usuário selecione texto ou elementos da interface, melhorando a experiência de jogo
document.addEventListener('dblclick', e => e.preventDefault());
document.addEventListener('contextmenu', e => e.preventDefault());

//variável para armazenar a versão do aplicativo
const APP_VERSION = "1.2.0";
const versionTag = document.createElement("div");
versionTag.id = "version";
versionTag.textContent = `v${APP_VERSION}`;
document.body.appendChild(versionTag);



let numberEscolhido = 0; //variavel global para armazenar a quantidade de numeros da senha escolhida

// Adicionando os botões para selecionar a quantidade de números da senha do outro jogador
for (let i = 3; i <= 10; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.className = 'length-button';
    button.addEventListener('click', () => {

        numberEscolhido = i; //armazena a quantidade de numeros da senha escolhida

        confirmButton.disabled = false; //habilita o botão de confirmar quando um número é selecionado
        confirmButton.onclick = () => play(numberEscolhido); //chama a função play passando a quantidade de numeros da senha selecionada
    });
    keyLength.appendChild(button);
}

function play(length) {
    
    let containerPasswordLength = document.getElementById('password-length-container');
    containerPasswordLength.style.display = 'none';
    
    MyPass(length);
}

function MyPass(qtd) {

    myPass.style.display = 'flex'; //exibe a div para digitar a propria senha

    let pergunta = document.createElement('h1');
    let inputMyPass =  document.createElement('input');

    pergunta.textContent = 'Digite a sua senha:';
    inputMyPass.className = 'input-my-pass';
    inputMyPass.inputMode = 'numeric';
    inputMyPass.maxLength = 10;
    inputMyPass.min = 3;
    inputMyPass.id = 'input-my-pass';

    //usabilidade para digitar a senha e apertar enter
    inputMyPass.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            confirmMyPassButton.click();
        }
    });


    myPass.appendChild(pergunta);
    myPass.appendChild(inputMyPass);
    
    //=========================
    //botão para confirmar a senha do jogador
    
    let confirmMyPassButton = document.createElement('button');
    confirmMyPassButton.id = 'confirm-my-pass-button';
    confirmMyPassButton.textContent = 'Confirmar';
    confirmMyPassButton.disabled = true; //desabilita o botão de confirmar até que a senha seja digitada
    myPass.appendChild(confirmMyPassButton);

    inputMyPass.addEventListener("input", () => {
        if(inputMyPass.value.length !== 0){ //verifica se a senha do jogador foi digitada
            confirmMyPassButton.disabled = false; //habilita o botão de confirmar quando a senha é digitada
        } else {
            confirmMyPassButton.disabled = true; //desabilita o botão de confirmar quando a senha é apagada
        }
    });

    confirmMyPassButton.addEventListener("click", () => {
        let senhaPropria = inputMyPass.value; //variavel para armazenar a senha digitada pelo jogador
        build(qtd); //chama a função para construir a interface do jogo, passando a quantidade de numeros da senha escolhida
    
        //criar div para mostrar a senha do proprio jogador
        //não pode ser no build porque fica repetindo a cada rodada, tem que ser só uma vez
        let senhaMyDiv = document.createElement('div');
        senhaMyDiv.id = 'senha-propria';
        senhaMyDiv.innerHTML = `Sua senha: &nbsp<span> ${senhaPropria} </span>`;
        tentativas.insertBefore(senhaMyDiv, listTentativas); //insere a div da senha do jogador antes da div de tentativas
        

        //exibe o botão de auxílio para o jogador poder usar a calculadora de certo e errado
        document.getElementById('btn-auxilio').style.display = 'block';
    });
    
    //alterar a largura da div inputNumber conforme a quantidade de numeros da senha escolhida
    //para ficar igual centralizada
    let tentativaLabel = document.getElementById('tentativa-label');
    tentativaLabel.style.width = `${qtd * 50}px`;
}

const confirmPlayButton = document.createElement('button');
confirmPlayButton.id = 'confirm-play-button';
confirmPlayButton.textContent = 'Anotar Tentativa';

let contagemDeTentativas = 0; //variavel para aumentar o id da div de jogada

//label para mostrar o rotulo tentativa
let labelTentativas = document.createElement("div");
labelTentativas.className = "tentativa-label";
labelTentativas.id = "tentativa-label";
labelTentativas.textContent = `Tentativas`;

//label para mostrar os icones de certo e errado
let labelCertoErrado = document.createElement("div");
labelCertoErrado.className = "certo-errado-label";
labelCertoErrado.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" id="certo-icon" width="30"  height="30"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2.5"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M20 6L9 17l-5-5"/></svg> 
<svg xmlns="http://www.w3.org/2000/svg" id="quase-icon" width="28"  height="28"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2.5"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>   <line x1="12" y1="9" x2="12" y2="13"/>   <line x1="12" y1="17" x2="12" y2="17"/></svg>`;

let rotulos = document.createElement("div");
rotulos.className = "rotulos";
rotulos.appendChild(labelCertoErrado);
rotulos.appendChild(labelTentativas);
listTentativas.prepend(rotulos); //insere os rótulos antes da primeira tentativa


function build(length) {

    tentativas.style.display = 'flex'; //exibe a div de tentativas quando a primeira rodada for construída
    myPass.style.display = 'none'; //esconde a div de digitar a propria senha quando a primeira rodada for construída


    //construir nova div game-container a cada rodada
    let gameContainer = document.createElement('div');
    gameContainer.className = 'game-container';
    gameContainer.id = `game-container-${contagemDeTentativas}`; //id para cada rodada, incrementa a cada rodada
    contagemDeTentativas++;
    listTentativas.appendChild(gameContainer); //insere a div do jogo dentro da div de tentativas

    //faz a rolagem automática para a última rodada criada
    listTentativas.scrollTo({
    top: listTentativas.scrollHeight,
    behavior: 'smooth'
});

    confirmPlayButton.disabled = true;
    
    //div de anotações ao lado dos inputs
    let anotations = document.createElement('div');
    anotations.id = 'anotations';
    
    //botões de quantidade de certo ou errado
    for (let i = 0; i < 2; i++) {
        let certoOuErrado = document.createElement('input');
        
        // definindo atributos dos inputs
        certoOuErrado.className = 'digit-info';
        certoOuErrado.inputMode = 'numeric';
        certoOuErrado.maxLength = 1;
        certoOuErrado.min = 0;
        certoOuErrado.id = `certo-ou-errado-${i+1}`;
        anotations.appendChild(certoOuErrado);

        // garantir numeros de 0 a 9 e apenas 1 digito
        certoOuErrado.addEventListener("input", () => {
            certoOuErrado.value = certoOuErrado.value.replace(/\D/g, "").slice(0, 1);
        });
        
    }
    gameContainer.appendChild(anotations);
    
//==========================

    let numberDiv = document.createElement('div');
    numberDiv.id = 'number';
    
    for (let i = 0; i < length; i++) {
        const input = document.createElement('input');
        
        //definindo atributos dos inputs
        input.className = 'digit-input';
        input.type = 'text';
        input.inputMode = 'numeric';
        input.maxLength = 1;
        input.min = 0;
        input.id = `digit-${i+1}`;
        numberDiv.appendChild(input);
        
        
        // garantir numeros de 0 a 9 e apenas 1 digito
        input.addEventListener("input", () => {
            input.value = input.value.replace(/\D/g, "").slice(0, 1);
            
            
            //valida se os inputs estão vazios quando clicados
            const inputsAll = document.querySelectorAll(".digit-input");
            const todosPreenchidos = [...inputsAll].every(i => i.value !== "");
            confirmPlayButton.disabled = !todosPreenchidos;
            
            //focus automático -
            // pula pro próximo
            // se digitou 1 número, vai para o próximo
            if (input.value.length === 1 && i < length - 1) {
                numberDiv.children[i + 1].focus();
            }
            
            // Se é o último e todos estão preenchidos → vai pro botão
            if (input.value && i === length - 1 && todosPreenchidos) {
                confirmPlayButton.focus();
            }
        });

        // backspace volta pro anterior
        input.addEventListener("keydown", e => {
            if (e.key === "Backspace" && input.value === "" && i > 0) {
                numberDiv.children[i - 1].focus();
            }
        });
    }

    //backspace para voltar pro input anterior
    confirmPlayButton.addEventListener("keydown", e => {
        if (e.key === "Backspace") {
            const inputs = numberDiv.querySelectorAll(".digit-input");
            inputs[inputs.length - 1].focus();
        }
    });


    gameContainer.appendChild(numberDiv);
    numberDiv.children[0].focus(); //foca automaticamente no primeiro input da rodada quando ela for criada
    
    //==========================
    
    //insere os inputs para digitar os numeros da senha
    app.appendChild(confirmPlayButton); //insere o botão de Certo abaixo dos inputs
    
    confirmPlayButton.onclick = nextRodada;

    let senhaPropria = document.getElementById('input-my-pass').value; //variavel para armazenar a senha digitada pelo jogador, precisa ser declarada aqui para pegar o valor atualizado da senha do jogador a cada rodada
    criarAuxilio(length,senhaPropria);
}

function nextRodada() {

    blockInputs(); //bloqueia os inputs da rodada atual para não poder mais editar
    amareloOuVerde(); //ativa a função para alterar cor do botão de anotação
    build(numberEscolhido); // constrói a próxima rodada com a mesma quantidade de números da senha
}

function blockInputs() { //função para bloquear os inputs da rodada atual
    const inputs = document.querySelectorAll(".digit-input"); //direita
    const inputsInfo = document.querySelectorAll(".digit-info"); //esquerda
    inputs.forEach(input => {
        input.classList.add('bloqueado-number'); //adiciona classe para alterar o cursor e dar feedback visual
        input.setAttribute("readonly", "true"); //bloqueia o input para não poder mais editar
    });
    inputsInfo.forEach(input => {
        input.classList.add('bloqueado');
        // input.setAttribute("readonly", "true");
        // //decidi não bloquear os inputs de anotação para permitir que o jogador
        // possa corrigir suas anotações mesmo após confirmar a jogada
    });
}

function amareloOuVerde(){
    // código para alterar cor do botão para quando achar que o numero está no lugar certo ou errrado.
    const inputsBloqueados = document.querySelectorAll('.bloqueado-number');

    inputsBloqueados.forEach(input => {
    input.addEventListener('click', () => {

            if (input.classList.contains('verde')) {
                input.classList.remove('verde');
                input.classList.add('amarelo');

            } else if (input.classList.contains('amarelo')) {
                input.classList.remove('amarelo');

            } else {
                // primeiro clique
                input.classList.add('verde');
            }
        });
    });
}

// == div para criar o botão auxilio ==
// esse botão servirá para quando o adversário
// informar a tentativa dele, o usuário
// possa informar corretamente o que está
// certo e errado

const painel = document.createElement("div");
const footer = document.querySelector("footer");
painel.id = "painel-auxilio";
painel.style.display = "none"; //esconde o painel de auxílio inicialmente
footer.before(painel);

const btnAuxilio = document.createElement("button");
btnAuxilio.textContent = "🔐 Auxílio";
btnAuxilio.style.position = "fixed";
btnAuxilio.style.bottom = "2em";
btnAuxilio.style.right = "2em";
btnAuxilio.id = "btn-auxilio";

document.body.appendChild(btnAuxilio);

btnAuxilio.addEventListener("click", () => {
    painel.style.display =
        painel.style.display === "none" ? "block" : "none";


        // quando o painel de auxílio for aberto,
        // limpa os inputs para o usuário poder digitar a tentativa do
        // adversário e analisar o que está certo ou errado
        if(painel.style.display === "block"){
            document.getElementById("input-auxilio").value = "";
            document.getElementById("resultado-auxilio").textContent = "";
        }

        //foca automaticamente no input do painel de auxílio quando ele for aberto
        document.getElementById("input-auxilio").focus();
});


//auxilio na tela tentativas
function criarAuxilio(tamanhoSenha, senha) {

    console.log(`tamanho:${tamanhoSenha}`);
    console.log(`mypass:${senha}`);

    const input = document.createElement("input");
    input.id = "input-auxilio";
    input.maxLength = tamanhoSenha;

    
    const resultado = document.createElement("div");
    resultado.id = "resultado-auxilio";
    
    const btn = document.createElement("button");
    btn.textContent = "Conferir";
    btn.id = "btn-conferir-auxilio";
    
    btn.onclick = () => {
        const tentativa = input.value;
        const analise = analisarTentativa(senha, tentativa);
        
        resultado.textContent =
        `Certos: ${analise.certos} | Fora: ${analise.errados}`;
    };

    painel.appendChild(input);
    painel.appendChild(btn);
    painel.appendChild(resultado);
}

function analisarTentativa(senha, tentativa) {

    // transformar em arrays
    const senhaArray = senha.split('');
    const tentativaArray = tentativa.split('');

    let certos = 0;
    let errados = 0;

    // arrays para controlar o que já foi usado
    const usadosSenha = new Array(senhaArray.length).fill(false);
    const usadosTentativa = new Array(tentativaArray.length).fill(false);

    // Primeiro passo: contar os que estão na posição correta
    for (let i = 0; i < senhaArray.length; i++) {
        if (tentativaArray[i] === senhaArray[i]) {
            certos++;
            usadosSenha[i] = true;
            usadosTentativa[i] = true;
        }
    }

    // Segundo passo: contar os corretos fora da posição
    for (let i = 0; i < tentativaArray.length; i++) {

        if (usadosTentativa[i]) continue;

        for (let j = 0; j < senhaArray.length; j++) {

            if (usadosSenha[j]) continue;

            if (tentativaArray[i] === senhaArray[j]) {
                errados++;
                usadosSenha[j] = true;
                break;
            }
        }
    }

    return { certos, errados };
}

