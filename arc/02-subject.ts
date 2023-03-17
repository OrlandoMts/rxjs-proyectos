import { Observable, Subject } from "rxjs";
/**
 * Ejemplo 1: primer comportamiento
 */
const numRandom$ = new Observable((subscriber) => {
	subscriber.next(Math.round(Math.random() * 100));
});

const numSubject$ = new Subject<number>();
numSubject$.subscribe((val) => console.log(val));
numSubject$.next(2); // Solo la subscripcion 1 recibe esta emision

numSubject$.subscribe((val) => {
	console.log(val);
});
numSubject$.subscribe((val) => {
	console.log(val);
});

numSubject$.next(Math.round(Math.random() * 100)); // Las 3 subscripciones reciben esta emision

/**
 * Ejemplo 2: subject siendo un observable
 */
/* const numRandom$ = new Observable((subscriber) => {
	subscriber.next(Math.round(Math.random() * 100));
});

const numSubject$ = new Subject<number>();

numSubject$.subscribe((val) => {
	console.log(val);
});
numSubject$.subscribe((val) => {
	console.log(val);
});

numRandom$.subscribe(numSubject$);
numSubject$.next(2); */
