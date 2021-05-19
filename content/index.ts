import UnreachableError from '../lib/errors/unreachable';
import { assertIsMessage } from '../lib/guards';
import { Message, MessageKey } from '../lib/types';
import { debug } from '../src/utils/logging';
import { handleGetPageInfoRequestMessage } from './messages/handlers';
import { alertBackgroundScriptOfReadiness } from './messages/intiators';
import {
  ContentChromeRuntimeAPI,
  ContentChromeRuntimeOnMessageAPI,
  ContentDocumentAPI,
  SendMessageFn,
} from './types';
import { updateFaviconBasedOnCurrentPageInfo } from './utils/favicon';

function handleMessage(
  api: ContentDocumentAPI,
  message: Message,
  sender: chrome.runtime.MessageSender,
  sendMessage: SendMessageFn<MessageKey>,
  sendResponse: (_resp?: any) => void
): void {
  if (!api) throw new Error('null api');
  debug('handling message', message);
  switch (message.key) {
    case 'get_page_info':
      handleGetPageInfoRequestMessage(api, message, sender, sendMessage, sendResponse);
      break;
    // Scripts intended for background thread. Ignore these deliberately.
    case 'content_script_ready':
      break;
    case 'fetch_remote_page_info':
      break;
    default:
      throw new UnreachableError(
        message,
        `Content script received unhandled message: ${JSON.stringify(message)}`
      );
  }
}

/**
 * Setup message listeners in the content script
 *
 * @param onMessage - the `onMessage` portion of the `chrome.runtime` extension API
 * @param documentApi - a subset of the `document` DOM api
 *
 * @alpha
 */
function setupContentMessageListeners(
  onMessage: ContentChromeRuntimeOnMessageAPI,
  sendMessage: SendMessageFn<MessageKey>,
  documentApi: ContentDocumentAPI
) {
  if (!documentApi) throw new Error('null api');
  const handler = handleMessage.bind(null, documentApi);
  onMessage.addListener(function (message, sender, sendResponse) {
    assertIsMessage(message);
    handler(message, sender, sendMessage, sendResponse);
    return true;
  });
}

async function main(chromeApi: ContentChromeRuntimeAPI, api: ContentDocumentAPI) {
  if (!api) throw new Error('null api');
  await updateFaviconBasedOnCurrentPageInfo(api, chromeApi.sendMessage);
  setupContentMessageListeners(chromeApi.onMessage, chromeApi.sendMessage, api);
  await alertBackgroundScriptOfReadiness(chromeApi.sendMessage, api);
}

if (!window.haltBoot) main(chrome.runtime, document);

export {
  ContentChromeRuntimeAPI,
  ContentChromeRuntimeOnMessageAPI,
  ContentDocumentAPI
} from './types';
export { getPageInfo } from './utils/page-info';
export {
  setupContentMessageListeners,
  alertBackgroundScriptOfReadiness,
  updateFaviconBasedOnCurrentPageInfo,
};
