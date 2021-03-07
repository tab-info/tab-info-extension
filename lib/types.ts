export interface TabInfo {
  pageTitle: string;
  pageDescription?: string;
  pageUrl: string;
  buttonColor?: string;
}
export interface PageInfo {
  enabled: boolean;
  tabInfo: TabInfo;
}
export type TabWithId = chrome.tabs.Tab & { id: number };

export interface MessageBase<K extends string> {
  key: K;
}

export interface ContentScriptReadyMessage extends MessageBase<'content_script_ready'> {
  pageInfo: PageInfo;
}
export interface GetPageInfoMessage extends MessageBase<'get_page_info'> {}

export interface MessageMap {
  content_script_ready: ContentScriptReadyMessage;
  get_page_info: GetPageInfoMessage;
}
export type MessageKey = keyof MessageMap;
export type Message = MessageMap[keyof MessageMap];

export interface MessageResponseMap {
  content_script_ready: 'ok';
  get_page_info: PageInfo;
}
export const ALL_MESSAGE_KEYS = ['content_script_ready' as const, 'get_page_info' as const];
