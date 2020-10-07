
const Player = (symbol, turn) => {
	let isTurn = turn;
	let playerSymbol = symbol;
	let selectedTiles = [];
	const getTurn = () => isTurn;
	const getScore = () => selectedTiles;
	const getSymbol = () => playerSymbol;
	const setTurn = (newTurn) => {
		isTurn = newTurn
	}
	const addScore = (value) => {
		selectedTiles.push(value)
	}
	const resetScore = () => {
		selectedTiles = [];
	}
	return {setTurn, getTurn, getScore, addScore, getSymbol, resetScore}
};

const gameboard = (() => {
	const player1 = Player('x', true);
	const player2 = Player('o', false);
	const checkScore = (score) => {
		if (score.includes('1') && score.includes('2') && score.includes('3')) {
			return true
		}
		if (score.includes('1') && score.includes('4') && score.includes('7')) {
			return true
		}
		if (score.includes('1') && score.includes('5') && score.includes('9')) {
			return true
		}
		if (score.includes('4') && score.includes('5') && score.includes('6')) {
			return true
		}
		if (score.includes('7') && score.includes('8') && score.includes('9')) {
			return true
		}
		if (score.includes('2') && score.includes('5') && score.includes('8')) {
			return true
		}
		if (score.includes('3') && score.includes('6') && score.includes('9')) {
			return true
		}
		if (score.includes('3') && score.includes('5') && score.includes('7')) {
			return true
		} else {
			return false
		}
	}
	const removeListener = (tile, listener) => {
		const selectedTile = document.querySelector(`[value='${tile.target.getAttribute('value')}']`);
		selectedTile.removeEventListener('click', listener);
	};
	const removeAllListeners = () => {
		const tiles = document.querySelectorAll('.tile');
		tiles.forEach(tile => tile.removeEventListener('click', handleTurn));
	};
	const markTile = (currentPlayer, tileValue) => {
		const selectedTile = document.querySelector(`[value='${tileValue}']`);
		const mark = document.createElement('img');
		const imageSrc = document.createAttribute('src');
		if (currentPlayer.getSymbol() == 'x') {
			imageSrc.value = './tictactoe_x.png';
		} else {
			imageSrc.value = './tictactoe_o.jpg';
		}
		mark.setAttributeNode(imageSrc);
		selectedTile.appendChild(mark);
	}
	const handleWin = (currentPlayer) => {
		if ( checkScore(currentPlayer.getScore()) == true ) {
			displayController.displayResults(currentPlayer.getSymbol());
			removeAllListeners();
		} else if (currentPlayer.getScore().length == 5) {
			displayController.displayResultsTie();
		}
		 else {
			return
		}
	};
	const handlePlayers = (currentPlayer, nextPlayer, tileValue) => {
		currentPlayer.addScore(tileValue);
		currentPlayer.setTurn(false);
		nextPlayer.setTurn(true);
		markTile(currentPlayer, tileValue);
		handleWin(currentPlayer, nextPlayer);
		console.log(currentPlayer.getSymbol(), currentPlayer.getScore());
	};
	const handleTurn = (e) => {
		const tileValue = e.target.getAttribute('value');
		if (player1.getTurn() == true) {
			handlePlayers(player1, player2, tileValue);
		} else if (player2.getTurn() == true) {
			handlePlayers(player2, player1, tileValue);
		}
		removeListener(e, handleTurn);
	};
	const setListener = (player1, player2) => {
		const handleTurnFunc = handleTurn;
		const tiles = document.querySelectorAll('.tile');
		tiles.forEach(tile => tile.addEventListener('click', handleTurnFunc));
	};
	const resetGame = () => {
		const handleTurnFunc = handleTurn;
		const tiles = document.querySelectorAll('.tile');
		tiles.forEach(tile => {	if (tile.firstChild) {tile.removeChild(tile.firstChild) }	
		});
		tiles.forEach(tile => tile.addEventListener('click', handleTurnFunc));
		player1.resetScore();
		player1.setTurn(true);
		player2.resetScore();
		player2.setTurn(false);
		displayController.resetDisplayResults();
	}
	return {
		player1,
		player2,
		setListener,
		resetGame
	}
})();

const displayController = (() => {
	const setGameBoard = () => {
		const container = document.getElementById('container');
		const resultHeading = document.createElement('h1');
		resultHeading.setAttribute('id', 'resultHeading');

		const gameBoard = document.createElement('div');
		gameBoard.setAttribute('id', 'gameBoard');
		gameBoard.style.width = '600px';
		gameBoard.style.height = '600px';

		const resetButton = document.createElement('button');
		resetButton.setAttribute('id', 'resetButton');
		resetButton.innerHTML = 'Reset Game';
		resetButton.addEventListener('click', () => {
			gameboard.resetGame();
		})
		container.appendChild(resultHeading);
		container.appendChild(gameBoard);
		container.appendChild(resetButton);

		for (let x = 1; x <= 9; x++) {
			const tile = document.createElement('div');
			const tileWidth =  ((1/3) * parseInt(gameBoard.style.width)) - 2;
			const tileHeight = ((1/3) * parseInt(gameBoard.style.height)) - 2;
			const valueAttribute = document.createAttribute('value');
			valueAttribute.value = `${x}`;
			tile.setAttributeNode(valueAttribute);
			tile.classList.add('tile');
			tile.style.width =	`${tileWidth}px`;
			tile.style.height = `${tileHeight}px`;
			gameBoard.appendChild(tile);
		};
	}
	const displayResults = (symbol) => {
		const resultHeading = document.getElementById('resultHeading');
		resultHeading.innerHTML = `${symbol} wins!`;
	}
	const displayResultsTie = () => {
		const resultHeading = document.getElementById('resultHeading');
		resultHeading.innerHTML = "Tie";
	}
	const resetDisplayResults = () => {
		const resultHeading = document.getElementById('resultHeading');
		resultHeading.innerHTML = '';
	}
	return {
		setGameBoard,
		displayResults,
		displayResultsTie,
		resetDisplayResults
	}		
})();






displayController.setGameBoard();
gameboard.setListener(gameboard.player1, gameboard.player2);





