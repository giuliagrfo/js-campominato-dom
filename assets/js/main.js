/* L'utente clicca su un bottone che genererà una griglia di gioco quadrata. Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata. */



// Creare una griglia 10x10 con js

// Seleziono elemento della DOM in cui inserire le celle con queryselector
const containerEl = document.querySelector('.container');

// Definisco una variabile con il markup per creare una cella
// const cellEl = `<div class="cell"></div>`;
// console.log(cellEl);

// Salvo in una variabile il numero delle celle 
const cellsNumber = 100;
// let cellsNumber = document.querySelector('.levels').value
// let rows = Math.sqrt(cellsNumber)
// console.log(rows);

const buttonEl = document.querySelector('button');
const titleEl = document.querySelector('.title')

buttonEl.addEventListener('click', function () {
    campGenerator(cellsNumber, containerEl)
    buttonEl.classList.add('none');
    titleEl.classList.add('show')
})

// utilizzare una funzione per creare le celle
function cellGenerator(n) {
    const cellEl = document.createElement('div');
    cellEl.className = "cell";
    cellEl.innerText = n;
    return cellEl
}

// utilizzare una funzione e il ciclo for per inserire tutte le celle nel markup
function campGenerator(max, markupEl) {
    let tries = 0
    for (let i = 1; i <= cellsNumber; i++) {
        const currentCell = `${i}`;
        const cellElement = cellGenerator(currentCell);
        markupEl.insertAdjacentElement('beforeend', cellElement);
        cellGenerator(i)
        // rendo le caselle cliccabili
        cellElement.addEventListener('click', function () {
            console.log('Ho cliccato sulla casella');

            if (is_bomb(i, bombs)) {
                //bombs.includes(i) 
                console.log('hai pestato una bomba');
                this.style.backgroundColor = 'red'
                this.innerText = 'BOOM!💥'
                markupEl.innerHTML = 'Game Over! ' + 'Score: ' + tries

            } else {
                this.style.backgroundColor = 'blue'
                tries++
            }

            if (tries == max - 16) {
                console.log('Hai Vinto! ' + tries + ' Punti fatti!');
                wrapperElement.innerHTML = 'Hai Vinto! ' + tries + ' Punti fatti!'
            }
            console.log(i);

        })
    }
}


// GENERARE BOMBE
const bombs = generateBombs(1, cellsNumber)

// Il computer deve generare 16 numeri casuali
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateBombs(min, max) {
    const bombs = []
    while (bombs.length !== 16) {

        const bomb = generateRandomNumber(min, max)


        if (!bombs.includes(bomb)) {
            bombs.push(bomb)
        }
    }
    return bombs
}

console.log(bombs);

console.log(bombs[1]);


function is_bomb(n, list) {
    if (list.includes(n)) {
        return true
    }
    return false
}