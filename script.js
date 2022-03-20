//script for Tic Tac Toe





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
            // verify if player won
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

                if(currentPlayer == "O") {
                    console.log("its ai turn");
                    //if its ai turn make ai decision based apon its difficulty
                    // /*
                    //  * Constructs an AI player with a specific level of intelligence
                    //  * @param level [String]: the desired level of intelligence
                    //  */
                    // let ai = function(level) {

                    //     //private attribute: level of intelligence the player has
                    //     var levelOfIntelligence = level;

                    //     //private attribute: the game the player is playing
                    //     var game = {};

                    //     /*
                    //      * private recursive function that computes the minimax value of a game state
                    //      * @param state [State] : the state to calculate its minimax value
                    //      * @returns [Number]: the minimax value of the state
                    //      */
                    //     function minimaxValue(state) { ... }

                    //     /*
                    //      * private function: make the ai player take a blind move
                    //      * that is: choose the cell to place its symbol randomly
                    //      * @param turn [String]: the player to play, either X or O
                    //      */
                    //     function takeABlindMove(turn) { ... }

                    //     /*
                    //      * private function: make the ai player take a novice move,
                    //      * that is: mix between choosing the optimal and suboptimal minimax decisions
                    //      * @param turn [String]: the player to play, either X or O
                    //      */
                    //     function takeANoviceMove(turn) { ... }

                    //     /*
                    //      * private function: make the ai player take a master move,
                    //      * that is: choose the optimal minimax decision
                    //      * @param turn [String]: the player to play, either X or O
                    //      */
                    //     function takeAMasterMove(turn) { ... }


                    //     /*
                    //      * public method to specify the game the ai player will play
                    //      * @param _game [Game] : the game the ai will play
                    //      */
                    //     this.plays = function(_game){
                    //         game = _game;
                    //     };

                    //     /*
                    //      * public function: notify the ai player that it's its turn
                    //      * @param turn [String]: the player to play, either X or O
                    //      */
                    //     this.notify = function(turn) {
                    //         switch(levelOfIntelligence) {
                    //             //invoke the desired behavior based on the level chosen
                    //             case "blind": takeABlindMove(turn); break;
                    //             case "novice": takeANoviceMove(turn); break;
                    //             case "master": takeAMasterMove(turn); break;
                    //         }
                    //     };
                    // };

                }else if(currentPlayer == "X") {
                    console.log("its player turn");
                }

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




















