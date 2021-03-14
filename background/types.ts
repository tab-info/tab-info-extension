/**
 * The subset of the `chrome.runtime.onMessage` extension API that the background script makes use of
 * @public
 */
export type BackgroundChromeRuntimeOnMessageAPI = Pick<typeof chrome.runtime.onMessage, 'addListener'>;
/**
 * The subset of the `chrome.runtime` extension API that the background script makes use of
 * @public
 */
export type BackgroundChromeRuntimeAPI = Pick<typeof chrome.runtime, 'sendMessage'> & {
  onMessage: BackgroundChromeRuntimeOnMessageAPI;
};

/**
 * The subset of the `chrome.pageAction` that the background script makes use of
 * 
 * @public
 */
export type BackgroundPageActionAPI = Pick<typeof chrome.pageAction, 'show' | 'setIcon' | 'hide'>;
