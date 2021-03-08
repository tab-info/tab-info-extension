import { FAVICON_SQUARE_SIZE } from '../../lib/constants';
import { makeCanvas } from '../../lib/icon';
import { PartialDocumentApi } from '../types';
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
  appendChild: typeof document.head.appendChild
): void {
  const { canvas, context } = makeCanvas(FAVICON_SQUARE_SIZE);

  context.fillStyle = buttonColor;
  context.fillRect(0, 0, FAVICON_SQUARE_SIZE, FAVICON_SQUARE_SIZE);

  appendChild(createFaviconLink(canvas.toDataURL('image/x-icon')));
}

export function updateFaviconBasedOnCurrentPageInfo(
  appendChild: typeof document.head.appendChild,
  partialApi: PartialDocumentApi
) {
  const pageInfo = getPageInfo(partialApi);
  const buttonColor = pageInfo.tabInfo.buttonColor;
  if (buttonColor) {
    setFaviconColor(buttonColor, appendChild);
  }
}
