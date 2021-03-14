import { guardWithTimeout } from 'tab-info-lib';

const p1 = Promise.resolve(2);

guardWithTimeout(p1); // $ExpectError

guardWithTimeout(p1, 1000); // $ExpectType Promise<number>
