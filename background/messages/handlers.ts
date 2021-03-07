import { ContentScriptReadyMessage } from '../../lib/types';
import { PageActionAPISubset } from '../types';
import { actOnPageInfoForTab } from '../utils/page-action';

export function handleContentScriptReadyMessage(
  message: ContentScriptReadyMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (_arg: 'ok') => void,
  pageActionApi: PageActionAPISubset
) {
  const { tab: senderTab } = sender;
  if (!senderTab)
    throw new Error('Received a "content_script_ready" event from a sender that is not a tab');
  const { id: senderTabId } = senderTab;
  if (typeof senderTabId === 'undefined')
    throw new Error('Received a "content_script_ready" event from a sender that is not a tab');
  sendResponse('ok');
  actOnPageInfoForTab(senderTabId, message.pageInfo, pageActionApi);
}
