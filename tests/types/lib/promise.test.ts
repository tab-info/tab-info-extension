import { guardWithTimeout } from 'tab-info-lib';

const p1 = new Promise<number>((resolve, reject) => {});

const p2 = guardWithTimeout(p1); // $ExpectError

const p3 = guardWithTimeout(p1, 1000); // $ExpectType Promise<number>
