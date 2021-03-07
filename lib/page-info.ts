import { FALLBACK_TAB_COLOR } from './constants';
import { TabInfo } from './types';

export function getColorStringFromTabInfo(tabInfo: TabInfo): string {
  return tabInfo.buttonColor || FALLBACK_TAB_COLOR;
}
