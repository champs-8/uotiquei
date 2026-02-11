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
    let pergunta = document.createElement('h1');
    let inputMyPass =  document.createElement('input');

    pergunta.textContent = 'Digite a sua senha:';
    inputMyPass.className = 'input-my-pass';
    inputMyPass.inputMode = 'numeric';
    inputMyPass.maxLength = 10;
    inputMyPass.min = 3;
    inputMyPass.id = 'input-my-pass';

    
    myPass.appendChild(pergunta);
    myPass.appendChild(inputMyPass);
    
    //=========================
    //botão para confirmar a senha do jogador
    
    let confirmMyPassButton = document.createElement('button');
    confirmMyPassButton.id = 'confirm-my-pass-button';
    confirmMyPassButton.textContent = 'Confirmar';
    myPass.appendChild(confirmMyPassButton);
    
    confirmMyPassButton.addEventListener("click", () => {
        let senhaPropria = inputMyPass.value; //variavel para armazenar a senha digitada pelo jogador
        build(qtd); //chama a função para construir a interface do jogo, passando a quantidade de numeros da senha escolhida
    
        //criar div para mostrar a senha do proprio jogador
        //não pode ser no build porque fica repetindo a cada rodada, tem que ser só uma vez
        let senhaMyDiv = document.createElement('div');
        senhaMyDiv.id = 'senha-propria';
        senhaMyDiv.innerHTML = `Sua senha: <span> ${senhaPropria} </span>`;
        tentativas.insertBefore(senhaMyDiv, listTentativas); //insere a div da senha do jogador antes da div de tentativas
    });
}

const confirmPlayButton = document.createElement('button');
confirmPlayButton.id = 'confirm-play-button';
confirmPlayButton.textContent = 'Anotar Tentativa';

let contagemDeTentativas = 0; //variavel para aumentar o id da div de jogada

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
    listTentativas.scrollIntoView({
    block: 'start',
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
    
    confirmPlayButton.addEventListener("click", nextRodada);
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
