// http://localhost:8080/
import { Observable, Subscriber } from "rxjs";

const observable$ = new Observable<number>((subscriber: Subscriber<number>) => {
	subscriber.next(1);
	subscriber.next(12);
	subscriber.next(3);
});

const observer = {
	next(value) {
		console.log(value);
	},
	complete() {},
	error(err) {},
};

observable$.subscribe(observer);
