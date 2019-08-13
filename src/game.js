document.addEventListener("DOMContentLoaded", () => {
	const instructionBtn = document.querySelector(".instruction-btn");
	const instructionPage = document.querySelector(".instructions");
	const startMenu = document.querySelector(".start_menu");
	const startBtn = document.querySelector(".start-btn");
	const correctPage = document.querySelector(".correct");
	const incorrectPage = document.querySelector(".incorrect");
	const playAgainBtnCorrect = document.querySelector(".play_again_corr");
	const playAgainBtnIncorrect = document.querySelector(".play_again_incor");
	const correctText = document.querySelector(".correct-text");
	const incorrectText = document.querySelector(".incorrect-text");
	const btnOne = document.querySelector(".one");
	const btnTwo = document.querySelector(".two");
	const btnThree = document.querySelector(".three");
	const btnFour = document.querySelector(".four");
	const gameContainer = document.querySelector(".game");
	const menuBtn = document.querySelector(".menu_btn");
	const pokemonArray = [];
	let answer = "";
	let selectedAnswer;

	for (var i = 1; i <= 151; i++) {
		pokemonArray.push(i);
	}

	const shuffle = array => {
		let j, x, i;
		for (i = array.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = array[i];
			array[i] = array[j];
			array[j] = x;
		}
		return array;
	};

	const silhoutte = (pokemonId, canvasId, isSilhouette) => {
		let canvas = document.getElementById(canvasId);
		let ctx = canvas.getContext("2d");
		let loadedImage = new Image();
		loadedImage.crossOrigin = "Anonymous";
		loadedImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
		loadedImage.onload = function() {
			canvas.width = loadedImage.width;
			canvas.height = loadedImage.height;
			ctx.drawImage(loadedImage, 0, 0, canvas.width, canvas.height);
			if (isSilhouette) {
				let rawImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
				for (var i = 0; i < rawImage.data.length; i += 4) {
					if (rawImage.data[i + 3] >= 100) {
						rawImage.data[i] = 30;
						rawImage.data[i + 1] = 30;
						rawImage.data[i + 2] = 30;
						rawImage.data[i + 3] = 255;
					} else {
						rawImage.data[i + 3] = 0;
					}
				}

				ctx.putImageData(rawImage, 0, 0);
			}
		};
	};

	const fetchAndPopulateDomPokemonNames = pokeIdArray => {
		for (let i = 0; i < pokeIdArray.length; i++) {
			fetchPokeApi(pokeIdArray[i], i);
		}
	};

	const fetchPokeApi = (pokeId, index) => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
			.then(res => res.json())
			.then(pokemon => {
				menuBtn.children[index].innerHTML = pokemon.name;
			});
	};

	const fetchPokeName = pokeId => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
			.then(res => res.json())
			.then(pokemon => {
				answer = pokemon.name;
			});
	};

	const guess = guess => {
		return guess === answer;
	};

	const correctGuess = () => {
		silhoutte(selectedAnswer, "correct_pokemon", false);
		correctText.innerHTML = `This is ${answer}`;
		gameContainer.style.display = "none";
		correctPage.style.display = "flex";
	};

	const incorrectGuess = () => {
		silhoutte(selectedAnswer, "incorrect_pokemon", false);
		incorrectText.innerHTML = `This is ${answer}`;
		gameContainer.style.display = "none";
		incorrectPage.style.display = "flex";
	};

	instructionBtn.addEventListener("click", () => {
		instruction();
	});

	startBtn.addEventListener("click", () => {
		startGame();
	});

	playAgainBtnCorrect.addEventListener("click", () => {
		startGame();
	});

	playAgainBtnIncorrect.addEventListener("click", () => {
		startGame();
	});

	btnOne.addEventListener("click", e => {
		if (guess(e.target.innerHTML)) {
			correctGuess();
		} else {
			incorrectGuess();
		}
	});

	btnTwo.addEventListener("click", e => {
		if (guess(e.target.innerHTML)) {
			correctGuess();
		} else {
			incorrectGuess();
		}
	});

	btnThree.addEventListener("click", e => {
		if (guess(e.target.innerHTML)) {
			correctGuess();
		} else {
			incorrectGuess();
		}
	});

	btnFour.addEventListener("click", e => {
		if (guess(e.target.innerHTML)) {
			correctGuess();
		} else {
			incorrectGuess();
		}
	});

	const startGame = () => {
		const guessList = shuffle(pokemonArray).slice(0, 4);
		selectedAnswer = guessList[Math.floor(Math.random() * guessList.length)];
		fetchPokeName(selectedAnswer);
		fetchAndPopulateDomPokemonNames(guessList);
		silhoutte(selectedAnswer, "greyed_pokemon", true);
		setTimeout(() => {
			startMenu.style.display = "none";
			correctPage.style.display = "none";
			incorrectPage.style.display = "none";
			gameContainer.style.display = "flex";
		}, 1000);
	};

	const instruction = () => {
		startMenu.style.display = "none";
		instructionPage.style.display = "flex";
	};
});
