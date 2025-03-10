
const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart-button');
const cardValues = ['🐶', '🦴', '🏀', '👻', '🐺', '🐼', '🚀', '🎮', '🐶', '🦴', '🏀', '👻', '🐺', '🐼', '🚀', '🎮'];

let flippedCards = [];
let matchedCards = [];
let isGameOver = false;

// Codigo de creacion del tablero de juego
function createBoard() {
    const shuffledValues = shuffleArray(cardValues);
    gameBoard.innerHTML = '';

    shuffledValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', value);
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });
}

// Codigo pa manejar el clik en una tarjeta
function handleCardClick(event) {
    if (isGameOver) return;

    const clickedCard = event.target;
    if (clickedCard.classList.contains('flipped') || flippedCards.length === 2) return;

    clickedCard.classList.add('flipped');
    clickedCard.textContent = clickedCard.getAttribute('data-value');
    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Cosa para comprobar si las dos cartas coinciden
function checkForMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.getAttribute('data-value') === card2.getAttribute('data-value')) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);

        if (matchedCards.length === cardValues.length) {
            isGameOver = true;
            alert('¡✨Felicidades, has ganado el juego🎉!') + sonidoCorrecto;
            
        }

        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

// Codigo para mezclar las cartas
function shuffleArray(array) {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

// Funcion para reiniciar el juego
function restartGame() {
    isGameOver = false;
    flippedCards = [];
    matchedCards = [];
    createBoard();
}

// Cosa/evento para reiniciar el juego al presionar el botón
restartButton.addEventListener('click', restartGame);

// Crear el tablero al cargar la página
createBoard();

const sonidoCorrecto = new Audio("./piglevelwin2mp3-148000.mp3");





