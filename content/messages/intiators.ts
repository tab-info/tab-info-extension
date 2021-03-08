import { Deferred } from '@mike-north/types';
import { RESPONSE_TIMEOUT_THRESHOLD } from '../../lib/constants';
import { guardWithTimeout } from '../../lib/promise';
import { PartialDocumentApi } from '../types';
import { getPageInfo } from '../utils/page-info';

export async function alertBackgroundScriptOfReadiness(
  sendMessage: typeof chrome.runtime.sendMessage,
  api: PartialDocumentApi
) {
  const d = new Deferred<void>();
  sendMessage({ key: 'content_script_ready', pageInfo: getPageInfo(api) }, () => {
    d.resolve();
  });
  return guardWithTimeout(d.promise, RESPONSE_TIMEOUT_THRESHOLD);
}
