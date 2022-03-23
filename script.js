

//create gameBoard using factory fxn & concatenative Inheritance/cloning
const gameBoard = {

	
	origBoard: function origBoard() {
		return this.board;
	}
	
};


// create players using factory fxn & concatenative Inheritance/cloning
const players = {

	huPlayer: function huPlayer() {
		return this.human;
	},

	aiPlayer: function aiPlayer() {
		return this.robot;
	}

}




const gameController = (() => {

	const winCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[6, 4, 2]
	]


	return {
		winCombos,
	};
})();



// create tic tac toe game using module
const ticTacToe = (() => {
	
	//make a reference to gameBoard using factory fxn & concatenative Inheritance/cloning
	const getBoard = Object.assign({}, gameBoard, {board: [0, 1, 2, 3, 4, 5, 6, 7, 8]});
	let origBoard = getBoard.origBoard();

	// console.log(typeof(origBoard), origBoard);
	
	const cells = document.querySelectorAll('.cell');

	//make a reference to human player
	let human = Object.assign({}, players, {human: 'O'});
	let huPlayer = human.huPlayer();

	let playingVsPlayer = false;




	//make a reference to ai player
	let robot = Object.assign({}, players, {robot: 'X'});
	let aiPlayer = robot.aiPlayer();


	const player2IsHuman = () => {
		playingVsPlayer = true;
	}

	const startGame = () => {
		document.querySelector(".endgame").style.display = "none";

		

		origBoard = Array.from(Array(9).keys());
		for (let i = 0; i < cells.length; i++) {
			cells[i].innerText = '';
			cells[i].style.removeProperty('background-color');
			cells[i].addEventListener('click', turnClick, false);
		}
		console.log(typeof(origBoard), origBoard);

	}

	const turnClick =(square) => {
		// turn(square.target.id, huPlayer);

		if (typeof origBoard[square.target.id] == 'number') {
			if(playingVsPlayer === true) {
				turn(square.target.id, huPlayer);
				
				if (!resultValidation.checkWin(origBoard, huPlayer) && !resultValidation.checkTie()) {
					huPlayer = huPlayer === "X" ? "O" : "X";
				}
				
			}else if(playingVsPlayer === false){
				turn(square.target.id, huPlayer)
				if (!resultValidation.checkWin(origBoard, huPlayer) && !resultValidation.checkTie()) turn(bestSpot(), aiPlayer);
			}
			
		}
	}

	const turn = (squareId, player) => {
		origBoard[squareId] = player;
		document.getElementById(squareId).innerText = player;
		let gameWon = resultValidation.checkWin(origBoard, player);
		if (gameWon) resultValidation.gameOver(gameWon);
	}


	const emptySquares = () => {
		let x = origBoard.filter(s => typeof s == 'number');
		return x;
	}
	
	const bestSpot= () => {
		return minimax(origBoard, aiPlayer).index;
	}



	const minimax = (newBoard, player) => {
		var availSpots = emptySquares();
	
		if (resultValidation.checkWin(newBoard, huPlayer)) {
			return {score: -10};
		} else if (resultValidation.checkWin(newBoard, aiPlayer)) {
			return {score: 10};
		} else if (availSpots.length === 0) {
			return {score: 0};
		}
		var moves = [];
		for (var i = 0; i < availSpots.length; i++) {
			var move = {};
			move.index = newBoard[availSpots[i]];
			newBoard[availSpots[i]] = player;
	
			if (player == aiPlayer) {
				var result = minimax(newBoard, huPlayer);
				move.score = result.score;
			} else {
				var result = minimax(newBoard, aiPlayer);
				move.score = result.score;
			}
	
			newBoard[availSpots[i]] = move.index;
	
			moves.push(move);
		}
	
		var bestMove;
		if(player === aiPlayer) {
			var bestScore = -10000;
			for(var i = 0; i < moves.length; i++) {
				if (moves[i].score > bestScore) {
					bestScore = moves[i].score;
					bestMove = i;
				}
			}
		} else {
			var bestScore = 10000;
			for(var i = 0; i < moves.length; i++) {
				if (moves[i].score < bestScore) {
					bestScore = moves[i].score;
					bestMove = i;
				}
			}
		}
	
		return moves[bestMove];
	}




	
	return {
	  startGame,
	  turnClick,
	  cells,
	  emptySquares,
	  player2IsHuman,
	};
  })();


//   create resultValidation using module

const resultValidation = (() => {

	//make a reference to human player
	let human = Object.assign({}, players, {human: 'O'});
	let huPlayer = human.huPlayer();

	let winCombos = gameController.winCombos;
	// console.log(typeof(winCombos), winCombos);
	let cells = ticTacToe.cells;

	const checkWin = (board, player) => {
		let plays = board.reduce((a, e, i) => 
			(e === player) ? a.concat(i) : a, []);
		let gameWon = null;
		for (let [index, win] of winCombos.entries()) {
			if (win.every(elem => plays.indexOf(elem) > -1)) {
				gameWon = {index: index, player: player};
				break;
			}
		}
		return gameWon;
	}
	
	const gameOver = (gameWon) => {
		for (let index of winCombos[gameWon.index]) {
			document.getElementById(index).style.backgroundColor =
				gameWon.player == huPlayer ? "blue" : "red";
		}
		for (var i = 0; i < cells.length; i++) {
			cells[i].removeEventListener('click', ticTacToe.turnClick, false);
		}
		declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose.");
	}


	const checkTie = () => {
		if (ticTacToe.emptySquares().length == 0) {
			for (var i = 0; i < cells.length; i++) {
				cells[i].style.backgroundColor = "green";
				cells[i].removeEventListener('click', ticTacToe.turnClick, false);
			}
			declareWinner("Tie Game!")
			return true;
		}
		return false;
	}

	const declareWinner = (who) => {
		document.querySelector(".endgame").style.display = "block";
		document.querySelector(".endgame .text").innerText = who;
	}

	return {
		checkWin,
		gameOver,
		checkTie,
	};
})();




  

  document.onload = ticTacToe.startGame();