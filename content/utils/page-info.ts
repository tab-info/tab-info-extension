import { Dict } from '@mike-north/types';
import { PageInfo } from '../../lib/types';
import { PartialDocumentApi } from '../types';

export function getPageInfo(api: PartialDocumentApi): PageInfo {
  const rawTabInfo = [...api.querySelectorAll('[type="tab-info"]')]
    .map((item: Element & { name?: string; content?: string }) => {
      const { name, content } = item;
      return { name, content };
    })
    .reduce((dict, item) => {
      dict[item.name || ''] = item.content;
      return dict;
    }, {} as Dict<string>);
  const descriptionElement = api.querySelector('meta[name="description"]');
  const pageDescription = descriptionElement
    ? '' + descriptionElement.getAttribute('content')
    : undefined;
  const pageTitle = api.title;
  const pageUrl = api.location.toString();
  const buttonColor = rawTabInfo['button-color'];
  return {
    enabled: rawTabInfo.enabled === 'true',
    tabInfo: {
      pageTitle,
      pageDescription,
      pageUrl,
      buttonColor
    },
  };
}
