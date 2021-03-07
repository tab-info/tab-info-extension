/**
 * Information about content rendered within a browser tab
 *
 * This is provided to the extension's popup UI, for presentation
 * to the user
 *
 * @alpha
 */
export interface TabInfo {
  pageTitle: string;
  pageDescription?: string;
  pageUrl: string;
  buttonColor?: string;
}
/**
 * A wrapper around the {@link TabInfo} object
 * that allows us to capture an enabled/disabled
 * state
 *
 * @alpha
 */
export interface PageInfo {
  enabled: boolean;
  tabInfo: TabInfo;
}

/**
 * A browser tab whose `id` property has already been
 * determined to exist
 *
 * @public
 */
export type TabWithId = chrome.tabs.Tab & { id: number };

/**
 * A base class for messages sent between the three
 * actors in this extension (popup, background thread, content script)
 *
 * Each message should have a unique key, so that we can identify them
 * easily and handle them appropriately
 *
 * @public
 */
export interface MessageBase<K extends string> {
  key: K;
}

/**
 * A message sent from the content script to the background thread
 * to (1) indicate that the content script has loaded and
 * (2) pass the current page info along
 *
 * @public
 */
export interface ContentScriptReadyMessage extends MessageBase<'content_script_ready'> {
  pageInfo: PageInfo;
}
/**
 * A message sent *to* the content script by either the background script
 * or popup frame, as a request to respond with a `PageInfo` value
 *
 * @public
 */
export interface GetPageInfoMessage extends MessageBase<'get_page_info'> {}

/**
 * A mapping of message keys to the types that define their
 * entire shape
 *
 * @public
 */
export interface MessageMap {
  content_script_ready: ContentScriptReadyMessage;
  get_page_info: GetPageInfoMessage;
}
/**
 * A type that matches any valid message key
 *
 * @public
 */
export type MessageKey = keyof MessageMap;

/**
 * A type that matches any valid message payload
 *
 * @public
 */
export type Message = MessageMap[keyof MessageMap];

/**
 * An array of all valid message keys
 * 
 * @public
 */
export const ALL_MESSAGE_KEYS = ['content_script_ready' as const, 'get_page_info' as const];
