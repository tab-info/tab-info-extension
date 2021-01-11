export interface IData {
  title?: string;
  metaTags: { name: string; value: string }[];
}

export function extractDataFromTab(tab: chrome.tabs.Tab): IData {
  const { title } = tab;
  return { title, metaTags: [] };
}
