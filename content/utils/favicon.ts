import { FAVICON_SQUARE_SIZE } from '../../lib/constants';
import { makeCanvas } from '../../lib/icon';
import { ContentDocumentAPI } from '../types';
import { getPageInfo } from './page-info';

function createFaviconLink(imageData: string) {
  const link = document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'icon';
  link.href = imageData;
  return link;
}

export function setFaviconColor(
  buttonColor: string,
  partialApi: ContentDocumentAPI
): void {
  const { canvas, context } = makeCanvas(FAVICON_SQUARE_SIZE);

  context.fillStyle = buttonColor;
  context.fillRect(0, 0, FAVICON_SQUARE_SIZE, FAVICON_SQUARE_SIZE);
  const imageDataUrl = canvas.toDataURL('image/x-icon');
  const favIcon = createFaviconLink(imageDataUrl);
  console.log({ favIcon });
  partialApi.head.appendChild(favIcon);
}

/**
 * Examine the current page's metadata and update the favicon accordingly
 * 
 * @param documentApi - Partial `document` DOM API
 * 
 * @alpha
 */
export async function updateFaviconBasedOnCurrentPageInfo(
  documentApi: ContentDocumentAPI
): Promise<void> {
  const pageInfo = await getPageInfo(documentApi);
  const buttonColor = pageInfo.tabInfo.buttonColor;
  if (buttonColor) {
    setFaviconColor(buttonColor, documentApi);
  }
}
