import { Dict } from '@mike-north/types';
import { PageInfo, TabInfo } from '../../lib/types';
import { ContentDocumentAPI } from '../types';

function getRawTabInfoMetadata(api: ContentDocumentAPI): Dict<string> {
  const tags = [...api.querySelectorAll('[type="tab-info"]')].map(
    (item: Element & { name?: string; content?: string }) => {
      const { name, content } = item;
      return { name, content };
    }
  );

  return tags.reduce((dict, item) => {
    dict[item.name || ''] = item.content;
    return dict;
  }, {} as Dict<string>);
}

/**
 * Create a {@link tab-info#PageInfo} object based on the content of the current tab
 * @param documentApi - partial `document` DOM API
 * @returns 
 * 
 * @public
 */
export async function getPageInfo(documentApi: ContentDocumentAPI): Promise<PageInfo> {
  const rawTabInfo = getRawTabInfoMetadata(documentApi);
  // Meta keyword description
  const descriptionElement = documentApi.querySelector('meta[name="description"]');

  // Assemble TabInfo Parts
  const pageDescription = descriptionElement
    ? '' + descriptionElement.getAttribute('content')
    : undefined;
  const pageTitle = documentApi.title;
  const pageUrl = documentApi.location.toString();
  const buttonColor = rawTabInfo['button-color'];
  const popupTitle = rawTabInfo['popup-title'];
  const popupDescription = rawTabInfo['popup-description'];
  const tabInfo: TabInfo = {
    pageTitle,
    pageDescription,
    pageUrl,
    buttonColor,
    popupTitle,
    popupDescription
  };
  // Return the PageInfo
  return {
    enabled: rawTabInfo.enabled === 'true',
    tabInfo,
  };
}
