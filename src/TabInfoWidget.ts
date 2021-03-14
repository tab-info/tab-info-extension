import Component, { hbs } from '@glimmerx/component';
import * as color from 'color';
import { TabInfo } from '../lib/types';

function styleStringFromButtonColor(buttonColor: string): string {
  const buttonCol = color(buttonColor);
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
    <div id="intro" style={{this.styleString}}>
      <h1>
        {{@tabInfo.pageTitle}}
      </h1>
      <h3>
       {{@tabInfo.pageDescription}}
      </h3>
    </div>
  `;
}
