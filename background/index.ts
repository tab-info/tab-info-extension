import UnreachableError from '../lib/errors/unreachable';
import { assertIsMessage } from '../lib/guards';
import { Message } from '../lib/types';
import { debug } from '../src/utils/logging';
import { handleContentScriptReadyMessage } from './messages/handlers';
import { PageActionAPISubset } from './types';

function handleMessage(
  pageActionApi: PageActionAPISubset,
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
function setupMessageListeners(onMessage: typeof chrome.runtime.onMessage ,pageActionApi: PageActionAPISubset) {
  const handler = handleMessage.bind(null,pageActionApi)
  onMessage.addListener((message, sender, sendResponse) => {
    assertIsMessage(message);
    handler(message, sender, sendResponse);
  });
}

if (!haltBoot) {
  setupMessageListeners(chrome.runtime.onMessage, chrome.pageAction);
}

export { setupMessageListeners};