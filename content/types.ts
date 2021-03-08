export type PartialDocumentApi = Pick<
  typeof document,
  'querySelectorAll' | 'querySelector' | 'location' | 'title'
>;

export type PartialChromeRuntimeApi = Pick<typeof chrome.runtime, 'sendMessage'> & {
  onMessage: Pick<typeof chrome.runtime.onMessage, 'addListener'>;
};
