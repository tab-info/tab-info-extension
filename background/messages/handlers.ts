import {
  ContentScriptReadyMessage,
  FetchRemotePageInfoMessage,
  RemotePageInfoPayload,
} from '../../lib/types';
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

function _validateTabInfoObject(obj: any): obj is RemotePageInfoPayload {
  return (
    obj &&
    typeof obj.color === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string'
  );
}

function _buildErrorObject(
  url: string,
  errorKind: string,
  description: string
): RemotePageInfoPayload {
  return {
    title: `Error: ${errorKind}`,
    description: `Something went wrong while connecting to ${url}
    
${description}`,
    color: '#cc0000',
  };
}

/**
 * Make a request to some third party URL
 * @param message message payload ("what to fetch")
 * @param sender
 * @param sendResponse callback to send a response back to the content script
 */
export async function handleFetchRemotePageInfoMessage(
  message: FetchRemotePageInfoMessage,
  _sender: chrome.runtime.MessageSender,
  sendResponse: (arg: RemotePageInfoPayload) => void
) {
  const { url } = message;
  try {
    const resp = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });
    const respText = await resp.text();
    const respPayload = JSON.parse(respText);

    // Response.ok indicates that hte response was successful (status in the range 200-299)
    if (resp.ok) {
      // user-defined type guard to ensure that we're always passing an
      // object of the appropriate shape back to the content script
      if (_validateTabInfoObject(respPayload)) {
        sendResponse(respPayload);
      } else {
        // Response is successful but doesn't match the tab info object shape
        sendResponse(
          _buildErrorObject(
            url,
            'INVALID_RESPONSE',
            `Missing required properties from the remote endpoint: <br/> ${respText}`
          )
        );
      }
    } else {
      // For all other error responses sent back by the server.
      sendResponse(_buildErrorObject(url, 'SERVER_ERROR', respPayload.message));
    }
  } catch (err) {
    // Failure to connect to the server.
    sendResponse(_buildErrorObject(url, 'FAIL_TO_CONNECT', err && err.message));
  }
}
