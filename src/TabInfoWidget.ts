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
  get bgStyle() {
    const {
      tabInfo: { buttonColor },
    } = this.args;
    if (buttonColor) return styleStringFromButtonColor(buttonColor);
    return '';
  }

  static template = hbs`
    <div id="intro" style={{this.bgStyle}}>
      <h1>
        {{@tabInfo.pageTitle}}
      </h1>
      <h3>
       {{@tabInfo.pageDescription}}
      </h3>
    </div>
  `;
}
