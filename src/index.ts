import { fromEvent, map, merge, mergeAll, takeUntil, throttleTime } from "rxjs";

const canvas = document.getElementById("reactive-canvas") as HTMLCanvasElement; // @ViewChild
const buttonclear = document.getElementById("restart-button");
const cursorPosition = { x: 0, y: 0 };
const canvasContext = canvas.getContext("2d");
canvasContext.lineWidth = 8;
canvasContext.strokeStyle = "white";
canvasContext.lineCap = "round";
canvasContext.lineJoin = "round";

// rxjs
const onLoadwindow$ = fromEvent(window, "load");
const onClearcanvas$ = fromEvent(buttonclear, "click");
const restartBoard$ = merge(onLoadwindow$, onClearcanvas$);
const onMousedown$ = fromEvent<MouseEvent>(canvas, "mousedown");
const onMouseup$ = fromEvent<MouseEvent>(canvas, "mouseup");
const onMousemove$ = fromEvent<MouseEvent>(canvas, "mousemove").pipe(
	throttleTime(40),
	takeUntil(onMouseup$)
);

const updateCurorPosition = (event: MouseEvent) => {
	cursorPosition.x = event.clientX - canvas.offsetLeft;
	cursorPosition.y = event.clientY - canvas.offsetTop;
};

const paintStroke = (event) => {
	canvasContext.beginPath();
	// Coordenadas a ejecutar
	canvasContext.moveTo(cursorPosition.x, cursorPosition.y);
	updateCurorPosition(event);
	canvasContext.lineTo(cursorPosition.x, cursorPosition.y);
	canvasContext.stroke();
	canvasContext.closePath();
};

const startPaint$ = onMousedown$.pipe(
	map(() => onMousemove$),
	mergeAll()
);

let subscription_1 = onMousedown$.subscribe(updateCurorPosition);
let subscription_2 = startPaint$.subscribe(paintStroke);

restartBoard$.subscribe(() => {
	// closeSubscriptions();
	// subscription_2.unsubscribe();
	canvasContext.clearRect(0, 0, canvas.width, canvas.height);
	// subscription_1 = onMousedown$.subscribe(updateCurorPosition);
});

const closeSubscriptions = () => {
	// subscription_1.unsubscribe();
	subscription_2.unsubscribe();
	// subscription_3.unsubscribe();
};
