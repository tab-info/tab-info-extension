import { Deferred } from '@mike-north/types';
import { MessageKey, RemotePageInfoPayload } from '../../lib';
import { RESPONSE_TIMEOUT_THRESHOLD } from '../../lib/constants';
import { guardWithTimeout } from '../../lib/promise';
import { ContentDocumentAPI, SendMessageFn } from '../types';
import { getPageInfo } from '../utils/page-info';

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
  sendMessage: SendMessageFn<'content_script_ready'>,
  api: ContentDocumentAPI
): Promise<void> {
  const d = new Deferred<void>();

  sendMessage(
    {
      key: 'content_script_ready',
      pageInfo: await getPageInfo(api, sendMessage as SendMessageFn<MessageKey>),
    },
    () => {
      d.resolve();
    }
  );
  return guardWithTimeout(d.promise, RESPONSE_TIMEOUT_THRESHOLD);
}

/**
 * Alert the background script of the callback script's readiness to handle requests for {@link tab-info#PageInfo}
 *
 * @param sendMessage - Callback which, when invoked, alerts the background script
 * @param api - part of the `document` DOM api
 * @returns
 *
 * @alpha
 */
export async function askBackgroundScriptForPageInfoRetrieval(
  sendMessage: SendMessageFn<'fetch_remote_page_info'>,
  url: string
): Promise<RemotePageInfoPayload> {
  const d = new Deferred<RemotePageInfoPayload>();

  sendMessage(
    {
      key: 'fetch_remote_page_info',
      url,
    },
    (data) => {
      d.resolve(data);
    }
  );
  return guardWithTimeout(d.promise, RESPONSE_TIMEOUT_THRESHOLD);
}
