/**
 * "Wrap" a promise in a timeout, to ensure that it doesn't "hang" forever in a
 * perpetually pending state.
 * 
 * @example
 * ```ts
 * const fetchPromise = fetch('http://example.com');
 * // Give up and fail after 4.0s
 * const guarded = guardWithTimeout(fetchPromise, 4000);
 * 
 * guarded.then(data => {
 *   // same data that would have come from `fetch`
 * })
 * ```
 * 
 * @param promise - promise to wrap
 * @param timeout - timeout in ms
 * @returns a new promise, guarded with a timeout
 * 
 * @public
 */
export function guardWithTimeout<T>(promise: PromiseLike<T>, timeout: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => {
      reject('timeout');
    }, timeout);
    // eslint-disable-next-line promise/catch-or-return
    promise.then((val) => {
      clearTimeout(t);
      resolve(val);
      return;
    });
  });
}
