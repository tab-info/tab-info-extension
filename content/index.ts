import UnreachableError from '../lib/errors/unreachable';
import { assertIsMessage } from '../lib/guards';
import { Message } from '../lib/types';
import { updateFaviconBasedOnCurrentPageInfo } from './utils/favicon';
import { handleGetPageInfoRequestMessage } from './messages/handlers';
import { alertBackgroundScriptOfReadiness } from './messages/intiators';
import { debug } from '../src/utils/logging';
import { PartialChromeRuntimeApi, PartialDocumentApi } from './types';

function handleMessage(
  api: PartialDocumentApi,
  message: Message,
  sender: chrome.runtime.MessageSender,
  sendResponse: (_resp?: any) => void
): void {
  if (!api) throw new Error('null api');
  debug('handling message', message);
  switch (message.key) {
    case 'get_page_info':
      handleGetPageInfoRequestMessage(api, message, sender, sendResponse);
      break;
    // Scripts intended for background thread. Ignore these deliberately.
    case 'content_script_ready':
      break;
    default:
      throw new UnreachableError(
        message,
        `Content script received unhandled message: ${JSON.stringify(message)}`
      );
  }
}
function setupMessageListeners(
  onMessage: PartialChromeRuntimeApi['onMessage'],
  api: PartialDocumentApi
) {
  if (!api) throw new Error('null api');
  const handler = handleMessage.bind(null, api);
  onMessage.addListener(function (message, sender, sendResponse) {
    assertIsMessage(message);
    handler(message, sender, sendResponse);
  });
}

async function main(chromeApi: PartialChromeRuntimeApi, api: PartialDocumentApi) {
  if (!api) throw new Error('null api');
  updateFaviconBasedOnCurrentPageInfo(document.head.appendChild, api);
  setupMessageListeners(chromeApi.onMessage, api);
  await alertBackgroundScriptOfReadiness(chromeApi.sendMessage, api);
}

if (!haltBoot) main(chrome.runtime, document);

export {
  setupMessageListeners,
  alertBackgroundScriptOfReadiness,
  updateFaviconBasedOnCurrentPageInfo,
};
