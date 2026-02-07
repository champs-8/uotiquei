// Div principal do jogo
//vou começar perguntando a quantidade de numeros da senha do amigo

const listTentativas = document.getElementById('list-tentativas'); //div que envolve as tentativas e o botão certo
const keyLength = document.getElementById('keyLength'); //div botoes da quantidade de numeros da senha
const confirmButton = document.getElementById('confirmButton'); //botao de confirmar quantidade de numeros da senha
const tentativas = document.getElementById('tentativas'); //div que envolve as tentativas e o botão certo


let numberEscolhido = 0; //variavel global para armazenar a quantidade de numeros da senha escolhida

// Adicionando os botões para selecionar a quantidade de números da senha
for (let i = 3; i <= 10; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.className = 'length-button';
    button.addEventListener('click', () => {
        console.log(`Quantidade de números da senha: ${i}`);

        numberEscolhido = i; //armazena a quantidade de numeros da senha escolhida

        confirmButton.disabled = false; //habilita o botão de confirmar quando um número é selecionado
        confirmButton.onclick = () => play(numberEscolhido); //chama a função play passando a quantidade de numeros da senha selecionada
    });
    keyLength.appendChild(button);
}

function play(l) {
    let containerPasswordLength = document.getElementById('password-length-container');
    containerPasswordLength.style.display = 'none';

    build(l);
}


const botaoCerto = document.createElement('button');
botaoCerto.id = 'confirm-play-button';
botaoCerto.textContent = 'V';


let contagemDeTentativas = 0; //variavel para aumentar o id da div de jogada

function build(length) {

    //construir nova div game-container a cada rodada
    let gameContainer = document.createElement('div');
    gameContainer.className = 'game-container';
    gameContainer.id = `game-container-${contagemDeTentativas}`; //id para cada rodada, incrementa a cada rodada
    contagemDeTentativas++;
    listTentativas.appendChild(gameContainer); //insere a div do jogo dentro da div de tentativas


    //botão para confirmar a jogada
    let confirmPlayButton = botaoCerto;
    confirmPlayButton.disabled = true;
    
    //div de anotações ao lado dos inputs
    let anotations = document.createElement('div');
    anotations.id = 'anotations';
    
    //botões de quantidade de certo ou errado
    for (let i = 0; i < 2; i++) {
        let certoOuErrado = document.createElement('input');
        
        // definindo atributos dos inputs
        certoOuErrado.className = 'digit-info';
        certoOuErrado.type = 'number';
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
        input.type = 'number';
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
        });
    }

    gameContainer.appendChild(numberDiv);
    
    //==========================
    
    //insere os inputs para digitar os numeros da senha
    tentativas.appendChild(confirmPlayButton); //insere o botão de Certo abaixo dos inputs

    confirmPlayButton.addEventListener("click", nextRodada); //chama função para pegar a quantidade de numeros da senha 

    
}

function nextRodada() {
    build(numberEscolhido); // constrói a próxima rodada com a mesma quantidade de números da senha
}