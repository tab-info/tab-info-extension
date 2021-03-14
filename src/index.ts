import { renderComponent } from '@glimmerx/core';
import { POPUP_UI_CONTAINER_ELEM } from '../lib/constants';
import { assertExists } from '../lib/guards';
import { PageInfo } from '../lib/types';
import App from './App';
import { retreivePageInfoForCurrentTab } from './messages/initiators';
import { debug } from './utils/logging';

async function bootUI(pageInfo: PageInfo) {
  debug('booting popup UI');
  const containerElement = document.querySelector(POPUP_UI_CONTAINER_ELEM);
  assertExists(containerElement, 'container element');
  debug('container element found! about to render...');
  await renderComponent(App, {
    element: containerElement,
    args: { data: pageInfo },
  });
  debug('render complete!');
}

async function main() {
  debug('about to retreive page info');
  const pageInfo = await retreivePageInfoForCurrentTab(chrome.tabs.sendMessage, chrome.tabs.query);
  debug('page info received', pageInfo);
  await bootUI(pageInfo);
  debug('component boot complete');
}
if (!window.haltBoot) {
  main();
}

export { retreivePageInfoForCurrentTab } from './messages/initiators';
export { default as TabInfoWidget } from './TabInfoWidget';
export { getActiveTabInCurrentWindow } from './utils/extension';
export { App };

