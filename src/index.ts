// http://localhost:8080/
/**
 * ✅ fromEvent es un método que permite crear un Observable que recibe eventos determinados de un elemento del DOM.
 * Por ejemplo a través de fromEvent podemos interactuar con las coordenadas del cursor a través de toda la pantalla.
 * Esto a través del evento mousemove y el elemento document.
 */
import { Subject, fromEvent } from "rxjs";
import WORD_LIST from "./words.json";

const rowsHtml = document.getElementsByClassName("letter-row");
const messageText = document.getElementById("message-text");
let letterIndexCol = 0;
let letterIndexRow = 0;
let userAnswer = [];

const wordRandom = () =>
	WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
let rightWord = wordRandom();
console.log(`Right word: ${rightWord}`);

// Observables & Subject
const onKeyUp$ = fromEvent(document, "keyup");
const userWinOrLoose$ = new Subject();

const insertLetter = {
	next: (val: KeyboardEvent) => {
		const { key } = val;
		if (key.length === 1 && key.match(/[a-zA-Z ]/)) {
			const letterDiv =
				Array.from(rowsHtml)[letterIndexRow].children[letterIndexCol];
			letterDiv.textContent = key?.toLocaleUpperCase();
			letterDiv?.classList.add("filled-letter");
			letterIndexCol += 1;
			userAnswer.push(key?.toLocaleUpperCase());
		}
	},
};

// Se ejecuta cuando se presiona Enter
const checkWord = {
	next: (val: KeyboardEvent) => {
		if (val.key === "Enter") {
			const rigthWordArray = Array.from(rightWord);
			if (userAnswer.length !== 5) {
				messageText.textContent = "Te faltan algunas letras";
				return;
			}

			for (let i = 0; i < 5; i++) {
				let letterColor = "";
				let letterBox = Array.from(rowsHtml)[letterIndexRow].children[i];
				let letterPosition = Array.from(rightWord).indexOf(userAnswer[i]);

				if (letterPosition === -1) {
					letterColor = "letter-gray";
				} else {
					if (rigthWordArray[i] === userAnswer[i]) {
						letterColor = "letter-green";
					} else {
						letterColor = "letter-yellow";
					}
				}
				letterBox.classList.add(letterColor);
			}

			if (userAnswer.length === 5) {
				letterIndexCol = 0;
				userAnswer = [];
				letterIndexRow++;
			}

			// Si la respuesta del usuario es igual a la palabra correcta:
			if (userAnswer.join("") === rightWord) {
				// Emite un valor (vacío) hacia el observable `userWinOrLoose$` (ver línea 64 )
				userWinOrLoose$.next("Ganador!");
			}
		}
	},
};

onKeyUp$.subscribe(insertLetter);
onKeyUp$.subscribe(checkWord);
// Borrar una letra
onKeyUp$.subscribe((val: KeyboardEvent) => {
	const { code } = val;
	if ((code === "Backspace" || code === "Delete") && letterIndexCol !== 0) {
		let currentRow = rowsHtml[letterIndexRow];
		let letterBox = currentRow.children[userAnswer.length - 1];
		letterBox.textContent = "";
		letterBox.classList.add("letter");
		letterIndexCol--;
		userAnswer.pop();
	}
});

userWinOrLoose$.subscribe((val) => {
	console.log(val);
	let letterRowsWinned = rowsHtml[letterIndexRow];
	// Lo siguiente nos permite pintar los contenedores de las letras con color verde 🟩 🟩 🟩 🟩 🟩
	for (let i = 0; i < 5; i++) {
		letterRowsWinned.children[i].classList.add("letter-green");
	}
});
