import { TOOLBAR_ICON_SQUARE_SIZE } from '../../lib/constants';
import { makeIconFromColor } from '../../lib/icon';
import { getButtonColorStringFromTabInfo } from '../../lib/page-info';
import { PageInfo, TabInfo } from '../../lib/types';
import { PageActionAPISubset } from '../types';

function enablePageAction(
  tabId: number,
  tabInfo: TabInfo,
  pageActionApi: PageActionAPISubset
) {
  pageActionApi.show(tabId, function () {
    pageActionApi.setIcon({
      tabId,
      imageData: makeIconFromColor(
        getButtonColorStringFromTabInfo(tabInfo),
        TOOLBAR_ICON_SQUARE_SIZE
      ),
    });
  });
}

function disablePageAction(tabId: number,
  pageActionApi: PageActionAPISubset) {
  pageActionApi.setIcon({
    tabId,
    path: 'icons/icon19.png'
  });
  pageActionApi.hide(tabId, function () {});
}

export function actOnPageInfoForTab(
  tabId: number,
  pageInfo: PageInfo,
  pageActionApi: PageActionAPISubset
) {
  const isEnabledForPage = pageInfo.enabled === true;
  if (isEnabledForPage) {
    enablePageAction(tabId, pageInfo.tabInfo, pageActionApi);
  } else {
    disablePageAction(tabId, pageActionApi);
  }
}
