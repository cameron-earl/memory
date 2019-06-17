import {
	appendNew,
	delay,
	randInt,
	setColorFromArray,
	squareColors,
} from './helpers';

const ARTICLE = document.querySelector('article');
const INFO_BOX = document.querySelector('.info-box');
let isGameInProgress = false;
let gameArr: number[] = [];
let nextGuessIdx = 0;
let MEMORY_LEN = 4;

const initializeSquares = (): void => {
	if (ARTICLE) {
		for (let i = 0; i < 3; i++) {
			const newRow = appendNew('div', ARTICLE, ['square-row']);
			for (let j = 0; j < 3; j++) {
				const n = i * 3 + j;
				const newSquare = appendNew('div', newRow, ['square'], {
					'square-num': n.toString(),
				});
				setColorFromArray(newSquare, n);
				newSquare.addEventListener('click', () => clickSquare(n));
			}
		}
	}
};

const clickSquare = async (n: number): Promise<void> => {
	if (!isGameInProgress) {
		newGame();
		return;
	}
	const guessCorrect = gameArr[nextGuessIdx] === n;
	if (guessCorrect) {
		rotateSquare(n);
		nextGuessIdx++;
		display(guessDisplayStr());
		if (nextGuessIdx >= gameArr.length) {
			win();
		}
	} else {
		display(`Whoops!\t${guessDisplayStr(true)}`);
		document.body.style.backgroundColor = 'red';
		await delay(350);
		document.body.style.backgroundColor = '#232323';
		await delay(350);
		isGameInProgress = false;
	}
};

const win = (): void => {
	isGameInProgress = false;
	MEMORY_LEN++;
	display(`You win! Difficulty increased to ${MEMORY_LEN}.`);
	delay(1000);
	newGame();
};

const rotateSquare = async (n: number): Promise<void> => {
	const square = document.querySelectorAll('.square')[n];
	square.classList.add('bright');
	await delay(300);
	square.classList.remove('bright');
	await delay(100);
};

const display = (html: string): void => {
	if (INFO_BOX) {
		INFO_BOX.innerHTML = html;
	}
};

const guessDisplayStr = (full: boolean = false): string => {
	let str = '';
	for (let i = 0; i < gameArr.length; i++) {
		const color = full || i < nextGuessIdx ? squareColors[gameArr[i]] : 'black';
		str += `<span class="mini-square"  style="background-color:${color}"></span>`;
	}
	return str;
};

const countdown = async (): Promise<void> => {
	await delay(500);
	display('3');
	await delay(500);
	display('2');
	await delay(500);
	display('1');
	await delay(500);
	display('');
};

const newGame = async (): Promise<void> => {
	await countdown();
	gameArr = [];
	nextGuessIdx = 0;
	for (let i = 0; i < MEMORY_LEN; i++) {
		gameArr.push(randInt(0, 8));
		display(guessDisplayStr());
		await rotateSquare(gameArr[gameArr.length - 1]);
	}
	isGameInProgress = true;
};

(function initialize(): void {
	initializeSquares();
	newGame();
})();
