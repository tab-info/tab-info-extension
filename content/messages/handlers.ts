import { GetPageInfoMessage, PageInfo } from '../../lib/types';
import { ContentDocumentAPI } from '../types';
import { getPageInfo } from '../utils/page-info';

export async function handleGetPageInfoRequestMessage(
  api: ContentDocumentAPI,
  _message: GetPageInfoMessage,
  _sender: chrome.runtime.MessageSender,
  sendResponse: (arg: PageInfo) => void
) {
  if (!api) throw new Error('null api');
  sendResponse(await getPageInfo(api));
}
