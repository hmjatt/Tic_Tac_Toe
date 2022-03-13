//script for Tic Tac Toe





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
    // We will save the clicked html element in an function named clickedCell for easier further use
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
    

    //convert into module and IIFE it
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
    
        gameBoard.gameState[clickedCellAttr(cell)] = validateResults.handlePlayerChange.player1Playing;
        cell.target.innerHTML = validateResults.handlePlayerChange.player1Playing;

        
       
        
        
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

    //array that defines conditions required to win the game
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

    /*
    We store our game status element here to allow us to more easily 
    use it later on 
    */
    const gameResult = document.getElementById('game-result');


    // grab change player element
    const playerChange = document.getElementById('game-turn');

    /*
    We set the inital message to let the players know whose turn it is
    */
    // statusDisplay.innerHTML = currentPlayerTurn();
    

 

    //determines if any player won (Works)
    const validate = () => {
        let roundWon = false;
        
        
        /*
        Here we have declared some messages we will display to the user during the game.
        Since we have some dynamic factors in those messages, namely the current player,
        we have declared them as functions, so that the actual message gets created with 
        current data every time we need it.
        */
       
    
      
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
            //call winningMessage(some condition inside factory)
            //use concatenatice inheritance/cloning to copy properties of one object to other object
            const won = Object.assign({}, resultMessage, {name: `${validateResults.handlePlayerChange.player1Playing}`});
            //assign the method to a variable
            const wonMsg = won.winMessage();
            gameResult.innerHTML = wonMsg;
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
            //call the drawMessage property inside resultMessage factory function
            //use concatenatice inheritance/cloning to copy properties of one object to other object
            const draw = Object.assign({}, resultMessage, {name: `${validateResults.handlePlayerChange.player1Playing}`});
            //assign the method to a variable
            const drawMsg = draw.drawMessage();
            gameResult.innerHTML = drawMsg;
            //set game state(which is inside gameController module) to false
            gameActive = false;
            return;
        }
        
    };

    // (it works)
    const handlePlayerChange= () => {
        
        /*
        We update our internal game state to reflect the played move, 
        as well as update the user interface to reflect the played move
        */

        //make this function call factory changePlayer
    
        let player1Playing = "Player 1";

        let playerTurnMsg = `It's ${player1Playing}'s turn`;
        playerChange.innerHTML = playerTurnMsg;
        
        let player2Playing = "Player 2";
        
        
        const player1Msg = Object.assign({}, changePlayer, {name: `${validateResults.handlePlayerChange.playerPlaying}`});
        const player2Msg = Object.assign({}, changePlayer, {name: `${validateResults.handlePlayerChange.player2Playing}`});
        const player1turnmsg = player1Msg.playerOne();
        const player2turnmsg = player2Msg.playerTwo();
        
        // player1Playing = player1Playing === player1turnmsg ? player2turnmsg : player1turnmsg;
        if(player1Playing === player2turnmsg) {
            player1Playing = player1turnmsg;
        }else if(player1Playing === player1turnmsg) {
            player1Playing = player2turnmsg;
        }
        console.log(player1Playing);
        
        // `It's ${currentPlayer}'s turn`;
        // //assign in to game-turn id
        playerChange.innerHTML = player1Playing;
        // validateResults.statusDisplay.innerHTML = validateResults.currentPlayerTurn();
          
    };

    return {
        validate,
        handlePlayerChange,
        // statusDisplay,
    };
})();


//create result message using factories

//one object
const resultMessage = {
    
    // create a winMessage property and assign a function as its value
    winMessage: function winMessage() {
      return `${ this.name } Won this game!`;
    },

    //create a drawMessage property and assign a function as its value
    drawMessage: function drawMessage() {
        return `This game was a draw!`;
    }
};
  

//create players using factories

/*
If we get to here we know that the no one won the game yet, 
and that there are still moves to be played, so we continue by changing the current player.
*/
const changePlayer = {
    // create a playerOne property and assign a function as its value
    playerOne: function currentPlayer() {
        /*
        put it inside changePlayer Factory, change the state using concatenative inheritance,
        add reference to each player using properties and use function to determine value
        */
        return this.name;
    },

    // create a playerTwo property and assign a function as its value
    playerTwo: function currentPlayer() {
        /*
        put it inside changePlayer Factory, change the state using concatenative inheritance,
        add reference to each player using properties and use function to determine value 
        */
        return this.name;
    },

    

    
};

// // put it inside a function and call it on each click
// //put it inside changePlayer factory
// const currentPlayerTurn = {

//     // currentPlayer = currentPlayer === "X" ? "O" : "X";
//     // `It's ${currentPlayer}'s turn`;
//     // //assign in to game-turn id
//     // validateResults.statusDisplay.innerHTML = validateResults.currentPlayerTurn();
//     player
// };





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
    validateResults.handlePlayerChange();
    // changePlayer();
    console.log(validateResults.handlePlayerChange.player1Playing);
}));
// document.querySelector('.game-restart').addEventListener('click', handleRestartGame);