import {
	fromEvent,
	map,
	mergeAll,
	Observable,
	takeUntil,
	throttleTime,
} from "rxjs";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;

interface Coodinates {
	x: number;
	y: number;
}

const getCanvasPosition = (positionEvent: MouseEvent): Coodinates => {
	return {
		x: positionEvent.clientX - canvas.offsetLeft,
		y: positionEvent.clientY - canvas.offsetTop,
	};
};

class Paint {
	constructor(
		public context: CanvasRenderingContext2D,
		public prevX?: number,
		public prevY?: number
	) {
		this.customizeBrush();
	}

	public updatePosition = (positionEvent: MouseEvent): void => {
		const positions = getCanvasPosition(positionEvent);

		this.prevX, (this.prevY = positions.x), positions.y;
	};

	public beginDraw = (positionEvent: MouseEvent): void => {
		this.context.beginPath();
		this.updatePosition(positionEvent);
	};

	public draw = (x: number, y: number): void => {
		if (this.prevX && this.prevY) {
			this.context.moveTo(this.prevX, this.prevY);
		}

		this.context.lineTo(x, y);
		this.context.stroke();
	};

	public customizeBrush = (): void => {
		canvasContext.lineWidth = 5;
		canvasContext.strokeStyle = "white";
		canvasContext.lineJoin = "round";
		canvasContext.lineCap = "round";
	};
}

const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;

let paint: Paint = new Paint(canvasContext);

const onMouseDown$ = fromEvent<MouseEvent>(canvas, "mousedown");
const onMouseUp$ = fromEvent<MouseEvent>(canvas, "mouseup");
const onMouseMove$ = fromEvent<MouseEvent>(canvas, "mousemove");

const startPaint$: Observable<MouseEvent> = onMouseDown$.pipe(
	map((event) => {
		paint.beginDraw(event);

		return onMouseMove$.pipe(throttleTime(40), takeUntil(onMouseUp$));
	}),
	mergeAll()
);

startPaint$.subscribe({
	next: (event) => {
		const positions = getCanvasPosition(event);

		paint.draw(positions.x, positions.y);
	},
});
