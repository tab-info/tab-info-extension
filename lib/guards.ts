import { ALL_MESSAGE_KEYS, Message, MessageBase, PageInfo, TabWithId } from './types';

/**
 * Assert whether a value is neither `null` nor `undefined`
 * @param val - value to test
 * @param valDescription - a description of the meaning of this value (for a user-friendly assertion error)
 * 
 * @public
 */
export function assertExists<T>(
  val: T | undefined | null,
  valDescription: string
): asserts val is T {
  if (typeof val === 'undefined' || val === null)
    throw new Error(`Found unexpected undefined value for ${valDescription}`);
}

/**
 * Assert for the presence of a browser tab's numeric `id` property
 * @param tab - a browser tab to test
 * 
 * @public
 */
export function assertIsTabWithId(tab: chrome.tabs.Tab): asserts tab is TabWithId {
  const { id } = tab;
  if (!id) throw new Error('first tab has no id');
}

/**
 * Assert whether an unknown value is a `PageInfo` object
 * @param arg - value to check
 * 
 * @public
 */
export function assertIsPageInfo(arg: unknown): asserts arg is PageInfo {
  if (!arg || typeof arg !== 'object') throw new Error(`${JSON.stringify(arg)} is not an object`);
  const { enabled, tabInfo } = arg as PageInfo;
  if (typeof enabled !== 'boolean') throw new Error(`${JSON.stringify(arg)} must have an enabled boolean`);
  if (typeof tabInfo !== 'object') throw new Error(`${JSON.stringify(arg)} must have a tabInfo object`);
  const {pageTitle,pageUrl} = tabInfo;
  if (typeof pageTitle !== 'string') throw new Error(`${JSON.stringify(arg)} must have a pageTitle string`);
  if (typeof pageUrl !== 'string') throw new Error(`${JSON.stringify(arg)} must have a pageUrl string`);
}

/**
 * Assert whether a value is of type {@link MessageBase}.
 * @param message - a value to test
 * 
 * @public
 */
export function assertIsMessageBase(message: unknown): asserts message is MessageBase<string> {
  if (typeof message !== 'object' || typeof (message as any).key !== 'string')
    throw new Error(`Bad message format: \n${JSON.stringify(message)}`);
}

/**
 * Assert whether a given value is not only a {@link MessageBase}, but also has a
 * `key` property of a known message type
 * 
 * @param message - value to test
 * 
 * @public
 */
export function assertIsMessage(message: unknown): asserts message is Message {
  assertIsMessageBase(message);
  if (!ALL_MESSAGE_KEYS.includes(message.key as any))
    throw new Error(`Unrecognized message key: ${message.key}`);
}
