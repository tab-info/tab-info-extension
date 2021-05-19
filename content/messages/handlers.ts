import { GetPageInfoMessage, MessageKey, PageInfo } from '../../lib/types';
import { ContentDocumentAPI, SendMessageFn } from '../types';
import { debug } from '../utils/logging';
import { getPageInfo } from '../utils/page-info';

export async function handleGetPageInfoRequestMessage(
  api: ContentDocumentAPI,
  _message: GetPageInfoMessage,
  _sender: chrome.runtime.MessageSender,
  sendMessage: SendMessageFn<MessageKey>,
  sendResponse: (arg: PageInfo) => void
) {
  if (!api) throw new Error('null api');
  const pageInfo = await getPageInfo(api, sendMessage);
  debug('about to pass pageInfo to popup', pageInfo);
  sendResponse(pageInfo);
}
