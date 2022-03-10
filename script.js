//script for Tic Tac Toe



/*

We will store our current player here, so we know whos turn 
*/
let currentPlayer = "X";



/*
We set the inital message to let the players know whose turn it is
*/
// statusDisplay.innerHTML = currentPlayerTurn();

//create gameboard using module
const gameBoard = (() => {
    
    /*
    We will store our current game state here, the form of empty strings in an array
    will allow us to easily track played cells and validate the game state later on
    */

    let gameState = ["", "", "", "", "", "", "", "", ""];


    return {
        gameState,
        
    };
})();


    



//create gameController using module

const gameController = (() => {
    // We will save the clicked html element in a variable for easier further use
    const clickedCell = (clickedCellEvent) => (clickedCellEvent.target);

    //Here we will grab the 'data-cell-index' attribute from the clicked cell to identify where that cell is in our grid. 
    //Please note that the getAttribute will return a string value. Since we need an actual number we will parse it to an 
    //integer(number)

    const clickedCellAttr = (cellAttr) => (parseInt(cellAttr.path[0].getAttribute('data-cell-index')));

    // use clickedCellAttr to get element in array(it works)
    const getArrIndex = (arrIndex) => (gameBoard.gameState[clickedCellAttr(arrIndex)]);



    // Next up we need to check whether the call has already been played, 
    // or if the game is paused. If either of those is true we will simply ignore the click.
    //   
  
    let gameActive = true;

   
    // (it works)
    const alreadyClicked = (cell) => {
        if (getArrIndex(cell) !== "" || !gameActive) {
            return(console.log("already clicked"));
        }
    };

    // (it works)
    const cellPlayed = (cell) => {
        
        /*
        We update our internal game state to reflect the played move, 
        as well as update the user interface to reflect the played move
        */
    
        gameBoard.gameState[clickedCellAttr(cell)] = currentPlayer;
        cell.target.innerHTML = currentPlayer;

        
       
        
        
    };

    return {
        clickedCell,
        clickedCellAttr,
        alreadyClicked,
        getArrIndex,
        cellPlayed,
    };
})();



//create validateResults using module
const validateResults = (() => {

    //array that defines condition required to win the game
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const currentPlayerTurn = () => {
        `It's ${currentPlayer}'s turn`;
    };

    /*
    We store our game status element here to allow us to more easily 
    use it later on 
    */
    const statusDisplay = document.querySelector('.game-status');

    //determines if any player won (Works)
    const validate = () => {
        let roundWon = false;
        
        
        /*
        Here we have declared some messages we will display to the user during the game.
        Since we have some dynamic factors in those messages, namely the current player,
        we have declared them as functions, so that the actual message gets created with 
        current data every time we need it.
        */
        const winningMessage = () => `Player ${currentPlayer} has won!`;
        const drawMessage = () => `Game ended in a draw!`;
        
      
        // it works
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = gameBoard.gameState[winCondition[0]];
            let b = gameBoard.gameState[winCondition[1]];
            let c = gameBoard.gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                console.log("won");
                break
            }
        }

        // shows a message if someone won and stop the game
        // it works
        if (roundWon) {
            statusDisplay.innerHTML = winningMessage();
            gameActive = false;
            return;
        }
        /* 
        We will check weather there are any values in our game state array 
        that are still not populated with a player sign
        */
        // (it works)
        let roundDraw = Object.values(!gameBoard.gameState).includes("");
        if (roundDraw) {
            console.log("draw");
            statusDisplay.innerHTML = drawMessage();
            
            gameActive = false;
            return;
        }
        
    };

    return {
        validate,
        currentPlayerTurn,
        statusDisplay,
    };
})();




//create using factories

/*
If we get to here we know that the no one won the game yet, 
and that there are still moves to be played, so we continue by changing the current player.
*/
const changePlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    validateResults.statusDisplay.innerHTML = validateResults.currentPlayerTurn();
};





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
    gameController.alreadyClicked(currentCell);
    gameController.getArrIndex(currentCell);
    gameController.cellPlayed(currentCell);
    validateResults.validate();
    changePlayer();
}));
// document.querySelector('.game-restart').addEventListener('click', handleRestartGame);