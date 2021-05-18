import './TabInfoWidget.css';
import Component, { hbs } from '@glimmerx/component';
import * as color from 'color';
import { TabInfo } from '../lib/types';
import safeMarkdown from './helpers/safe-markdown';
import or from './helpers/or';

function styleStringFromButtonColor(buttonColor: string): string {
  const buttonCol = color(buttonColor);
  // TEXT COLOR BASED ON BACKGROUND COLOR
  const textColor = buttonCol.luminosity() < 0.4 ? 'white' : 'black';
  const styleParts = [
    ['background-color', buttonColor],
    ['color', textColor],
  ];

  return styleParts.map(([k, v]) => `${k}: ${v};`).join(' ');
}

/**
 * The main component in the popup page that renders the information obtained
 * by the content script.
 *
 * @alpha
 */
export default class TabInfoWidget extends Component<{ tabInfo: TabInfo }> {
  /**
   * Dynamic style information, based in part on {@link tab-info#TabInfo}'s `buttonColor` property
   */
  get styleString() {
    const {
      tabInfo: { buttonColor },
    } = this.args;
    if (buttonColor) return styleStringFromButtonColor(buttonColor);
    return '';
  }

  static template = hbs`
    <div id="popup-content" style={{this.styleString}}>
      <div class="container">
        <h1>
          {{or @tabInfo.popupTitle @tabInfo.pageTitle}}
        </h1>
        {{{safeMarkdown (or @tabInfo.popupDescription @tabInfo.pageDescription)}}}
      </div>
    </div>
  `;
}
