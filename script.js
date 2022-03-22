

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




const ticTacToe = (() => {
	
	//make a reference to gameBoard using factory fxn & concatenative Inheritance/cloning
	const getBoard = Object.assign({}, gameBoard, {board: ''});
	
	const cells = document.querySelectorAll('.cell');

	//make a reference to human player
	let human = Object.assign({}, players, {human: 'O'});
	let huPlayer = human.huPlayer();

	//make a reference to ai player
	let robot = Object.assign({}, players, {robot: 'X'});

	const startGame = () => {
		document.querySelector(".endgame").style.display = "none";

		theBoard = getBoard.origBoard();

		origBoard = Array.from(Array(9).keys());
		for (var i = 0; i < cells.length; i++) {
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
		console.log("it works")
	}




	
	return {
	  startGame,
	  turnClick,
	  turn,
	  
	};
  })();
  

  document.onload = ticTacToe.startGame();