import { ALL_MESSAGE_KEYS, MessageKey, PageInfo, MessageResponseMap } from 'mylib';
import { TabInfo, TabWithId } from '../../lib';

// @ts-expect-error
const bad_message_arr: typeof ALL_MESSAGE_KEYS = ['a', 'b', 'c'];

const tiMinimal: TabInfo = {
  pageTitle: 'My test page',
  pageUrl: 'http://example.com',
};

const tiMaximal: TabInfo = {
  pageTitle: 'My test page',
  pageUrl: 'http://example.com',
  buttonColor: '#f00',
  pageDescription: 'This is an example description',
};

// @ts-expect-error
const tiWrong: TabInfo = {
  pageUrl: 'http://example.com',
  buttonColor: '#f00',
  pageDescription: 'This is an example description',
};

const tabWId: TabWithId = {} as any;
tabWId.id; // $ExpectType number

const pageInfo: PageInfo = {} as any;
pageInfo.enabled; // $ExpectType boolean
pageInfo.tabInfo.buttonColor // $ExpectType string | undefined
pageInfo.tabInfo.pageDescription // $ExpectType string | undefined
pageInfo.tabInfo.pageTitle // $ExpectType string
pageInfo.tabInfo.pageUrl // $ExpectType string

type MessageKeyTest_1 = keyof MessageResponseMap;
const __messageKeyTest_assert_1: MessageKeyTest_1 = {} as MessageKey;
const __messageKeyTest_assert_2: MessageKey = {} as MessageKeyTest_1;

const __messageKeyTest_assert_3: typeof ALL_MESSAGE_KEYS = [] as MessageKey[];
const __messageKeyTest_assert_4: MessageKey[] = [] as typeof ALL_MESSAGE_KEYS;

const contentScriptReadyResponse: MessageResponseMap['content_script_ready'] = {} as any;
const okVal: "ok" =contentScriptReadyResponse;
const getPageInfoResponse: MessageResponseMap['get_page_info'] = {} as any;
getPageInfoResponse; // $ExpectType PageInfo
