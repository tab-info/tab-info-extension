import { UnreachableError } from 'tab-info-lib';

// $ExpectError
new UnreachableError('hello');

const nvr: never = {} as never;
new UnreachableError(nvr);

const key = 'fizz' as 'fizz' | 'buzz';

/**
 * Exhaustive switch pattern
 */
switch (key) {
  case 'buzz':
    break;
  case 'fizz':
    break;
  default:
    throw new UnreachableError(key);
}
