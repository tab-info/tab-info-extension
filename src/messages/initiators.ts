import { Deferred } from '@mike-north/types';
import { RESPONSE_TIMEOUT_THRESHOLD } from '../../lib/constants';
import { guardWithTimeout } from '../../lib/promise';
import { PageInfo } from '../../lib/types';
import { getActiveTabInCurrentWindow } from '../utils/extension';
import { debug } from '../utils/logging';

async function retrievePageInfo(tabId: number, sendMessage: typeof chrome.tabs.sendMessage): Promise<PageInfo> {
  const d = new Deferred<PageInfo>();
  debug('attempting to retrieve pageinfo for tab ' + tabId);
  sendMessage(tabId, { key: 'get_page_info' }, (resp) => {
    debug('Popup: pageinfo received', resp);
    d.resolve(resp);
  });
  return guardWithTimeout(d.promise, RESPONSE_TIMEOUT_THRESHOLD);
}

export async function retreivePageInfoForCurrentTab(sendMessage: typeof chrome.tabs.sendMessage, query: typeof chrome.tabs.query): Promise<PageInfo> {
  const { id } = await getActiveTabInCurrentWindow(query);
  debug('popup pageinfo request about to send');
  const pageInfo = await retrievePageInfo(id, sendMessage);
  debug('popup received response', pageInfo);
  return pageInfo;
}
