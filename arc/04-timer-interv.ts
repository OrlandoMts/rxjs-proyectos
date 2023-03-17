import { interval, timer } from "rxjs";
/**
 * Interval y timer
 */

const sequenceNumber$ = interval(1000);
const delayedTimer$ = timer(3000);
delayedTimer$.subscribe(console.log);
// sequenceNumber$.subscribe(console.log);
