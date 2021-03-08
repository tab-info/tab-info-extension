import { Deferred } from '@mike-north/types';
import { assertExists, assertIsTabWithId } from '../../lib/guards';
import { TabWithId } from '../../lib/types';

/**
 * Get the currently active tab in the currently selected window
 * @returns the tab
 * 
 * @alpha
 */
export async function getActiveTabInCurrentWindow(query: typeof chrome.tabs.query): Promise<TabWithId> {
  const d = new Deferred<TabWithId>();
  query({ active: true, currentWindow: true }, function (tabs) {
    const [firstTab] = tabs;
    assertExists(firstTab, 'first active and currentWindow tab');
    assertIsTabWithId(firstTab);
    d.resolve(firstTab as TabWithId);
  });
  return d.promise;
}
