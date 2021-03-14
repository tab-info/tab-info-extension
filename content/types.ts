/**
 * The subset of the `document` DOM API that the content script makes use of
 * @public
 */
export type ContentDocumentAPI = Pick<
  typeof document,
  'querySelectorAll' | 'querySelector' | 'location' | 'title' | 'head'
>;

/**
 * The subset of the `chrome.runtime.onMessage` extension API that the content script makes use of
 * @public
 */
export type ContentChromeRuntimeOnMessageAPI = Pick<typeof chrome.runtime.onMessage, 'addListener'>;
/**
 * The subset of the `chrome.runtime` extension API that the content script makes use of
 * @public
 */
export type ContentChromeRuntimeAPI = Pick<typeof chrome.runtime, 'sendMessage'> & {
  onMessage: ContentChromeRuntimeOnMessageAPI;
};
