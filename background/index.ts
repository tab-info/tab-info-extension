import UnreachableError from '../lib/errors/unreachable';
import { assertIsMessage } from '../lib/guards';
import { Message } from '../lib/types';
import { debug } from '../src/utils/logging';
import { handleContentScriptReadyMessage } from './messages/handlers';
import { BackgroundChromeRuntimeOnMessageAPI, BackgroundPageActionAPI } from './types';

function handleMessage(
  pageActionApi: BackgroundPageActionAPI,
  message: Message,
  sender: chrome.runtime.MessageSender,
  sendResponse: (_resp?: any) => void
): void {
  debug('handling message', message);
  switch (message.key) {
    case 'content_script_ready':
      handleContentScriptReadyMessage(message, sender, sendResponse, pageActionApi);
      break;
    // Messages intended for content script. Ignore deliberately
    case 'get_page_info':
      break;
    default:
      throw new UnreachableError(message, `Unrecognized event: ${JSON.stringify(message)}`);
  }
}

/**
 * Setup message listeners on the content script
 *
 * @param onMessage - the `onMessage` portion of the `chrome.runtime` extension API
 * @param pageActionApi - a subset of the `chrome.pageAction` extension API
 *
 * @alpha
 */
function setupBackgroundMessageListeners(
  onMessage: BackgroundChromeRuntimeOnMessageAPI,
  pageActionApi: BackgroundPageActionAPI
) {
  const handler = handleMessage.bind(null, pageActionApi);
  onMessage.addListener((message, sender, sendResponse) => {
    assertIsMessage(message);
    handler(message, sender, sendResponse);
  });
}

if (!window.haltBoot) {
  setupBackgroundMessageListeners(chrome.runtime.onMessage, chrome.pageAction);
}

export { BackgroundChromeRuntimeOnMessageAPI, BackgroundPageActionAPI } from './types';
export { setupBackgroundMessageListeners };
