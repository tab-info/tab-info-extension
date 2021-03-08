import { GetPageInfoMessage, PageInfo } from '../../lib/types';
import { PartialDocumentApi } from '../types';
import { getPageInfo } from '../utils/page-info';

export function handleGetPageInfoRequestMessage(
  api: PartialDocumentApi,
  _message: GetPageInfoMessage,
  _sender: chrome.runtime.MessageSender,
  sendResponse: (_arg: PageInfo) => void
) {
  if (!api) throw new Error('null api');
  sendResponse(getPageInfo(api));
}
