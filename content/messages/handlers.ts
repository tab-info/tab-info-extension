import { GetPageInfoMessage, PageInfo } from '../../lib/types';
import { ContentDocumentAPI } from '../types';
import { debug } from '../utils/logging';
import { getPageInfo } from '../utils/page-info';

export async function handleGetPageInfoRequestMessage(
  api: ContentDocumentAPI,
  _message: GetPageInfoMessage,
  _sender: chrome.runtime.MessageSender,
  sendResponse: (arg: PageInfo) => void
) {
  if (!api) throw new Error('null api');
  const pageInfo = await getPageInfo(api);
  debug('about to pass pageInfo to popup', pageInfo);
  sendResponse(pageInfo);
}
