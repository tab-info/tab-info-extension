import { ContentScriptReadyMessage, FetchRemotePageInfoMessage } from '../../lib/types';
import { BackgroundPageActionAPI } from '../types';
import { actOnPageInfoForTab } from '../utils/page-action';

export function handleContentScriptReadyMessage(
  message: ContentScriptReadyMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (_arg: 'ok') => void,
  pageActionApi: BackgroundPageActionAPI
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

/**
 * Make a request to some third party URL
 * @param message message payload ("what to fetch")
 * @param sender
 * @param sendResponse callback to send a response back to the content script
 */
export async function handleFetchRemotePageInfoMessage(
  message: FetchRemotePageInfoMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (arg: any) => void
) {
  const { tab: senderTab } = sender;
  if (!senderTab)
    throw new Error('Received a "fetch_remote_page_info" event from a sender that is not a tab');
  const { id: senderTabId } = senderTab;
  if (typeof senderTabId === 'undefined')
    throw new Error('Received a "fetch_remote_page_info" event from a sender that is not a tab');
  const { url } = message;
  // TODO: error handling (how do we want this to behave if the backend service is down?)
  const resp = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });
  const respPayload = await resp.json();

  // TODO: user-defined type guard to ensure that we're always passing an
  //       object of the appropriate shape back to the content script
  sendResponse(respPayload);
}
