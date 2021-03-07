import { assertExists, assertIsPageInfo } from 'tab-info-lib';

const val2: number | undefined = 0;
assertExists(val2, 'a number or maybe not');
val2; // $ExpectType number

const val3: unknown = 0;
assertIsPageInfo(val3);
val3; // $ExpectType PageInfo
