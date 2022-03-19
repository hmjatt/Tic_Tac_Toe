//script for Tic Tac Toe



//script for Tic Tac Toe


//put everything in private scope

/*
We store our game status element here to allow us to more easily 
use it later on 
*/

/*
Here we declare some variables that we will use to track the 
game state throught the game. 
*/
/*
We will use gameActive to pause the game in case of an end scenario
*/

/*
We will store our current player here, so we know whos turn 
*/

/*
We will store our current game state here, the form of empty strings in an array
 will allow us to easily track played cells and validate the game state later on
*/

/*
Here we have declared some messages we will display to the user during the game.
Since we have some dynamic factors in those messages, namely the current player,
we have declared them as functions, so that the actual message gets created with 
current data every time we need it.
*/

/*
We set the inital message to let the players know whose turn it is
*/


const gameController = (() => {

    const statusDisplay = document.getElementById('game-status');

    

    let currentPlayer = "X";

    let gameActive = true;

    let gameState = ["", "", "", "", "", "", "", "", ""];


    const winningMessage = () => `Player ${currentPlayer} has won!`;
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

    statusDisplay.innerHTML = currentPlayerTurn();


    // works
    const clickedCell = (clickedCellEvent) =>{
        let clicked = clickedCellEvent.target;
        let clickedAttr = (parseInt(clicked.getAttribute('data-cell-index')));
        if (gameState[clickedAttr] == "" && gameActive == true) {
            
            gameState[clickedAttr] = currentPlayer;
            clicked.innerHTML = currentPlayer;
            handleResultValidation();
            
        } else if (gameState[clickedAttr] !== "" || !gameActive) {
           
            return;
        }


    };

        

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



    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break
            }
        }
        if (roundWon) {
                statusDisplay.innerHTML = winningMessage();
                gameActive = false;
                return;
            }
        /* 
        We will check weather there are any values in our game state array 
        that are still not populated with a player sign
        */
            let roundDraw = !gameState.includes("");
            if (roundDraw) {
                statusDisplay.innerHTML = drawMessage();
                gameActive = false;
                return;
            }
        /*
        If we get to here we know that the no one won the game yet, 
        and that there are still moves to be played, so we continue by changing the current player.
        */
            handlePlayerChange();
            function handlePlayerChange() {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                statusDisplay.innerHTML = currentPlayerTurn();
            }
        

        
    
    };

    


        

    
        
    
    return {
        clickedCell,
        
    };


})();


















/*
And finally we add our event listeners to the actual game cells, as well as our 
restart button
*/
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', (currentCell) => {
    gameController.clickedCell(currentCell);
        
        
    }));
// document.querySelector('.game--restart').addEventListener('click', handleRestartGame);




















