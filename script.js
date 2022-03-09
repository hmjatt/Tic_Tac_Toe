//script for Tic Tac Toe

/*
We store our game status element here to allow us to more easily 
use it later on 
*/
const statusDisplay = document.querySelector('.game-status');
/*
Here we declare some variables that we will use to track the 
game state throught the game. 
*/
/*

We will store our current player here, so we know whos turn 
*/
let currentPlayer = "X";


/*
Here we have declared some messages we will display to the user during the game.
Since we have some dynamic factors in those messages, namely the current player,
we have declared them as functions, so that the actual message gets created with 
current data every time we need it.
*/
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
/*
We set the inital message to let the players know whose turn it is
*/
statusDisplay.innerHTML = currentPlayerTurn();

//create gameboard using module
const gameBoard = (() => {
    
    /*
    We will store our current game state here, the form of empty strings in an array
    will allow us to easily track played cells and validate the game state later on
    */

    // let gameState = ["0", "", "", "", "", "", "", "", ""];

    let gameState = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    

    document.querySelectorAll('.cell').forEach(function(node) {
        //assign array to elements 
        for (let index = 0; index < gameState.length; index++) {
            // console.log("index", index);
            let x = gameState[index];
            console.log(x);
        }
        console.log(node.innerHTML = x);
    });

    

    return {
        gameState,
        
    };
})();



//create gameController using module


// function handleCellClick(clickedCellEvent) {
//     /*
//     
//     */    
//     const clickedCell = clickedCellEvent.target;
//     /*
//     
//     */
//     const clickedCellIndex = parseInt(
//         clickedCell.getAttribute('data-cell-index')
//     );
//     /* 
//     Next up we need to check whether the call has already been played, 
//     or if the game is paused. If either of those is true we will simply ignore the click.
//     */
//     if (gameState[clickedCellIndex] !== "" || !gameActive) {
//         return;
//     }
//     /* 
//     If everything if in order we will proceed with the game flow
//     */    
//     handleCellPlayed(clickedCell, clickedCellIndex);
//     handleResultValidation();


    

//     const calculator = (() => {
//         const add = (a, b) => a + b;
//         const sub = (a, b) => a - b;
//         const mul = (a, b) => a * b;
//         const div = (a, b) => a / b;
//         return {
//           add,
//           sub,
//           mul,
//           div,
//         };
//       })();
      
//       calculator.add(3,5); // 8
//       calculator.sub(6,2); // 4
//       calculator.mul(14,5534); // 77476
// }

const gameController = (() => {
    // We will save the clicked html element in a variable for easier further use
    // const clickedCell = (clickedCellEvent) => clickedCellEvent.target;
    const clickedCell = (clickedCellEvent) => (clickedCellEvent.target);
    // const clickedCellIndex = () => parseInt(clickedCell.getAttribute('data-cell-index'));

    //Here we will grab the 'data-cell-index' attribute from the clicked cell to identify where that cell is in our grid. 
    //Please note that the getAttribute will return a string value. Since we need an actual number we will parse it to an 
    //integer(number)

    const clickedCellAttr = (cellAttr) => console.log(cellAttr, (parseInt(cellAttr.path[0].getAttribute('data-cell-index'))));


    const getArrIndex = (arrIndex) => console.log(arrIndex.path[0].innerHTML);
    // Next up we need to check whether the call has already been played, 
    // or if the game is paused. If either of those is true we will simply ignore the click.
    //   
  
    let gameActive = true;

   

    const alreadyClicked = (cell) => {
        if (gameBoard.gameState[clickedCellIndex(cell)] !== "" || !gameActive) {
            return;
        }
    };


    const cellPlayed = (cell) => {
        
        /*
        We update our internal game state to reflect the played move, 
        as well as update the user interface to reflect the played move
        */

        // gameBoard.gameState[clickedCellIndex(cell)] = currentPlayer;
        // clickedCell.innerHTML = currentPlayer;

        
       gameBoard.gameState[clickedCellAttr(cell)];
    //    console.log(x);
    //     x = currentPlayer;
    //     // console.log(x, gameBoard.gameState);
    //     let y = clickedCell.innerHTML;
    //     y = currentPlayer;
        
        
    };
       
    // handleCellPlayed(clickedCell, clickedCellIndex);
    // handleResultValidation();

    


    return {
        clickedCell,
        clickedCellAttr,
        alreadyClicked,
        getArrIndex,
    };
})();





    

//create using module

function handleCellPlayed() {

}

//create using factories
function handlePlayerChange() {

}

//create using module
function handleResultValidation() {

}



//create using module
function handleRestartGame() {

}
/*
And finally we add our event listeners to the actual game cells, as well as our 
restart button
*/
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', (currentCell) => {
    gameController.clickedCell(currentCell);
    gameController.clickedCellAttr(currentCell);
    // gameController.alreadyClicked(currentCell);
    gameController.getArrIndex(currentCell);
}));
// document.querySelector('.game-restart').addEventListener('click', handleRestartGame);