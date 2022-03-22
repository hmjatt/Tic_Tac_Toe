

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
	const getBoard = Object.assign({}, gameBoard, {board: ''});
	let origBoard = getBoard.origBoard();
	
	const cells = document.querySelectorAll('.cell');

	//make a reference to human player
	let human = Object.assign({}, players, {human: 'O'});
	let huPlayer = human.huPlayer();

	//make a reference to ai player
	let robot = Object.assign({}, players, {robot: 'X'});

	const startGame = () => {
		document.querySelector(".endgame").style.display = "none";

		

		origBoard = Array.from(Array(9).keys());
		for (let i = 0; i < cells.length; i++) {
			cells[i].innerText = '';
			cells[i].style.removeProperty('background-color');
			cells[i].addEventListener('click', turnClick, false);
		}
	}

	const turnClick =(square) => {
		turn(square.target.id, huPlayer);
	}

	const turn = (squareId, player) => {
		origBoard[squareId] = player;
		document.getElementById(squareId).innerText = player;
		let gameWon = resultValidation.checkWin(origBoard, player);
		if (gameWon) resultValidation.gameOver(gameWon);
	}

	
	return {
	  startGame,
	  turnClick,
	  cells,
	};
  })();


//   create resultValidation using module

const resultValidation = (() => {

	//make a reference to human player
	let human = Object.assign({}, players, {human: 'O'});
	let huPlayer = human.huPlayer();

	let winCombos = gameController.winCombos;
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
	}

	return {
		checkWin,
		gameOver,
		// gameWon,
	};
})();


  

  document.onload = ticTacToe.startGame();