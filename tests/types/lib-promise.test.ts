import { guardWithTimeout } from "mylib";

const p1 = new Promise<number>((resolve, reject) => {});

// @ts-expect-error
const p2 = guardWithTimeout(p1);

const p3 = guardWithTimeout(p1, 1000); // $ExpectType Promise<number>
