import { Dict } from '@mike-north/types';
import { PageInfo, TabInfo } from '../../lib/types';
import { ContentDocumentAPI } from '../types';
import { debug } from './logging';

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
  const infoUrl = rawTabInfo['info-url'];

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
  const embeddedTabInfo: TabInfo = {
    pageTitle,
    pageDescription,
    pageUrl,
    buttonColor,
    popupTitle,
    popupDescription,
  };
  const remoteTabInfo: Partial<TabInfo> = {};
  if (typeof infoUrl === 'string') {
    debug('info-url detected', infoUrl);
    const response = await fetch(infoUrl);
    // TODO a type guard would be nice here, because this API has errored occasionally
    const jsonData = (await response.json()) as {
      id: string;
      color: string;
      title: string;
      description: string;
    };
    const normalizedData: Partial<TabInfo> = {
      buttonColor: jsonData.color,
      popupTitle: jsonData.title,
      popupDescription: jsonData.description,
    };
    debug('info-url data retrieval complete', jsonData);
    Object.assign(remoteTabInfo, normalizedData);
    debug('info-url ready with remote data', remoteTabInfo);
  }

  // Return the PageInfo
  const pageInfo: PageInfo = {
    enabled: rawTabInfo.enabled === 'true',
    tabInfo: { ...embeddedTabInfo, ...remoteTabInfo },
  };
  debug('about to return pageInfo', pageInfo);

  return pageInfo;
}
