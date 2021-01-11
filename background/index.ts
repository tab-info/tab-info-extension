// function makeIconFromColor(color: string): ImageData {
//   const canvas = document.createElement('canvas');
//   const context = canvas.getContext('2d');
//   canvas.width = 19;
//   canvas.height = 19;
//   if (!context) throw new Error('canvas has no context');
//   context.fillStyle = color;
//   context.fillRect(0, 0, 19, 19);
//   context.textAlign = 'center';
//   context.textBaseline = 'middle';
//   context.font = '11px Arial';
//   context.fillText('69F', 8, 8);
//   return context.getImageData(0, 0, 19, 19);
// }

import { setup } from './event-listeners';

// export function printThing(): void {
//   console.log(chrome.i18n.getMessage('l10nToolbarTooltipTitle'));

//   chrome.tabs.getCurrent(function (tab) {
//     if (!tab) return;
//     const { title } = tab;
//     if (!title) throw new Error('no title');
//     if (title.indexOf('stack')) {
//       chrome.browserAction.setIcon({ imageData: makeIconFromColor('#f0f') });
//     } else {
//       chrome.browserAction.setIcon({ imageData: makeIconFromColor('#333') });
//     }
//   });
// }

// chrome.tabs.onActivated.addListener(function (info) {
//   console.log('ACTIVATED', info);
//   chrome.tabs.get(info.tabId, function (tab) {
//     console.log(chrome.i18n.getMessage('l10nToolbarTooltipTitle'));

//     if (!tab) return;
//     const { title } = tab;
//     if (!title) throw new Error('no title');

//     if (title.indexOf('Stack Overflow') >= 0) {
//       chrome.browserAction.setIcon({ imageData: makeIconFromColor('#f0f') });
//     } else if (title.indexOf('GitHub') >= 0) {
//       chrome.browserAction.setIcon({ imageData: makeIconFromColor('#0ff') });
//     } else {
//       chrome.browserAction.setIcon({ imageData: makeIconFromColor('#666') });
//     }
//   });
// });

function go(tab: chrome.tabs.Tab | undefined): void {
  if (!tab) return;
  console.log('GO GO GO', new Date().toISOString());
}

setup(go);
