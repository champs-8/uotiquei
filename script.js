// Div principal do jogo
//vou começar perguntando a quantidade de numeros da senha do amigo

const gameContainer = document.getElementById('game-container'); //div geral
const keyLength = document.getElementById('keyLength'); //botoes da quantidade de numeros da senha
const confirmButton = document.getElementById('confirmButton'); //botao de confirmar quantidade de numeros da senha


// Adicionando os botões para selecionar a quantidade de números da senha
for (let i = 3; i <= 10; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', () => {
        console.log(`Quantidade de números da senha: ${i}`);
        confirmButton.disabled = false;
        confirmButton.onclick = () => play(i);
    });
    keyLength.appendChild(button);
}

function play(l) { 
    let containerPasswordLength = document.getElementById('password-length-container');
    containerPasswordLength.style.display = 'none';

    build(l);
}

function build(length) {

    //botão para confirmar a jogada
    let confirmPlayButton = document.createElement('button');
    confirmPlayButton.id = 'confirm-play-button';
    confirmPlayButton.textContent = 'V';
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
    gameContainer.appendChild(confirmPlayButton);

    confirmPlayButton.addEventListener('click', () => {
        alert('A senha do amigo é: ' )
    })
}
