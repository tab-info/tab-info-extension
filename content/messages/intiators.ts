import { Deferred } from '@mike-north/types';
import { PageInfo } from '../../lib';
import { RESPONSE_TIMEOUT_THRESHOLD } from '../../lib/constants';
import { guardWithTimeout } from '../../lib/promise';
import { ContentDocumentAPI } from '../types';
import { getPageInfo } from '../utils/page-info';

/**
 * The callback used to initiate content script's `content_script_ready` message
 * 
 * @alpha
 */
export type SendMessageFn = (
  message: { key: 'content_script_ready'; pageInfo: PageInfo },
  responseCallback?: ((response: any) => void) | undefined
) => void;


/**
 * Alert the background script of the callback script's readiness to handle requests for {@link tab-info#PageInfo}
 * 
 * @param sendMessage - Callback which, when invoked, alerts the background script
 * @param api - part of the `document` DOM api
 * @returns 
 * 
 * @alpha
 */
export async function alertBackgroundScriptOfReadiness(
  sendMessage: SendMessageFn,
  api: ContentDocumentAPI
): Promise<void> {
  const d = new Deferred<void>();

  sendMessage(
    {
      key: 'content_script_ready',
      pageInfo: await getPageInfo(api),
    },
    () => {
      d.resolve();
    }
  );
  return guardWithTimeout(d.promise, RESPONSE_TIMEOUT_THRESHOLD);
}
