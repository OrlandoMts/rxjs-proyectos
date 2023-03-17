/**
 * from: crea un observable a partir de un arreglo, promesa o un objeto iterable
 * from([A,B,C])
 */

import { from, of } from "rxjs";

/**
 * of: Crea un observable a partir de sus parametros
 * of(A,B,C) -> si le paso un arreglo lo tomará como un solo elemento
 */

const fruits_1$ = from(["manzana", "platano", "mandarina", "toronja"]);
fruits_1$.subscribe(console.log);

const fruits_2$ = of("manzana", "platano", "mandarina", "toronja");
fruits_2$.subscribe(console.log);
