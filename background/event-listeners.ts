import * as debounce from 'debounce';

export function setup(_fn: (_tab: chrome.tabs.Tab | undefined) => void): void {
  const callFn = debounce(_fn, 50);
  chrome.tabs.onActivated.addListener((info) => chrome.tabs.get(info.tabId, callFn));
  chrome.tabs.onUpdated.addListener((tabId) => chrome.tabs.get(tabId, callFn));
}
