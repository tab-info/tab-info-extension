import { FALLBACK_TAB_COLOR } from './constants';
import { TabInfo } from './types';

/**
 * Extract a color string (e.g., button color)
 * 
 * @param tabInfo - a {@link TabInfo} object
 * @returns the color string
 * 
 * @alpha
 */
export function getButtonColorStringFromTabInfo(tabInfo: TabInfo): string {
  return tabInfo.buttonColor || FALLBACK_TAB_COLOR;
}
