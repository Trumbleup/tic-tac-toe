const displayController = (() => {
	const setGameBoard = () => {
		const container = document.getElementById('container');
		const gameBoard = document.createElement('div');
		gameBoard.setAttribute('id', 'gameBoard');
		gameBoard.style.width = '900px';
		gameBoard.style.height = '900px';
		container.appendChild(gameBoard);
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
	return {
		setGameBoard
	}		
})();

const Player = (symbol, turn) => {
	let isTurn = turn;
	let playerSymbol = symbol;
	const selectedTiles = [];
	const getTurn = () => isTurn;
	const getScore = () => selectedTiles;
	const getSymbol = () => playerSymbol;
	const setTurn = (newTurn) => {
		isTurn = newTurn
	}
	const addScore = (value) => {
		selectedTiles.push(value)
	}
	return {setTurn, getTurn, getScore, addScore, getSymbol}
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
	const handleWin = (currentPlayer) => {
		if ( checkScore(currentPlayer.getScore()) == true ) {
			removeAllListeners();
			console.log(currentPlayer.getSymbol(), 'wins');
		} else {
			return
		}
	};
	const handlePlayers = (currentPlayer, nextPlayer, tileValue) => {
		currentPlayer.addScore(tileValue);
		currentPlayer.setTurn(false);
		nextPlayer.setTurn(true);
		handleWin(currentPlayer);
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
	return {
		player1,
		player2,
		setListener
	}
})();






displayController.setGameBoard();
gameboard.setListener(gameboard.player1, gameboard.player2);





