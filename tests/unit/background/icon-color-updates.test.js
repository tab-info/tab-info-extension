/* eslint-disable no-unused-vars */
import { setupMessageListeners } from '../../../background/index';
import {
  FALLBACK_TAB_COLOR,
  TOOLBAR_ICON_SQUARE_SIZE
} from '../../../lib/constants';
import { makeIconFromColor } from '../../../lib/icon';
import { q_module, q_test } from '../../util';

const RED_UINT8_CLAMPED_ARRAY = makeIconFromColor('#f00', TOOLBAR_ICON_SQUARE_SIZE).data;
const FALLBACK_COLOR_UINT8_CLAMPED_ARRAY = makeIconFromColor(
  FALLBACK_TAB_COLOR,
  TOOLBAR_ICON_SQUARE_SIZE
).data;


q_module('background process icon-update tests', () => {

  q_test('responds to ENABLED content_script_ready appropriately', async (assert) => {
    assert.expect(11);
    function addListener(cb) {
      setTimeout(() => {
        function rcvResponse(arg) {
          assert.ok(true, 'sendResponse was called upon receipt of message');
          assert.equal(arg, 'ok', 'sendResponse was called with correct argument');
        }
        /** @type {import('../../../lib/types').ContentScriptReadyMessage} */
        const msg = {
          key: 'content_script_ready',
          pageInfo: {
            enabled: true,
            tabInfo: {
              pageTitle: 'my page title',
              pageUrl: 'file:///',
              buttonColor: '#f00',
              pageDescription: 'my page description',
            },
          },
        };
        cb(msg, { tab: { id: -1 } }, rcvResponse);
      }, 0);
      assert.ok(true, 'onMessage.addListener called');
    }

    function setIcon({ tabId, imageData }) {
      assert.ok(true, 'chrome.pageAction.setIcon was called upon receipt of message');
      assert.equal(tabId, -1, 'chrome.pageAction.setIcon was called with correct tabId');
      assert.equal(
        imageData.width,
        TOOLBAR_ICON_SQUARE_SIZE,
        'chrome.pageAction.setIcon was called with correct image width'
      );
      assert.equal(
        imageData.height,
        TOOLBAR_ICON_SQUARE_SIZE,
        'chrome.pageAction.setIcon was called with correct image height'
      );
      assert.equal(
        imageData.data.byteLength,
        4 * TOOLBAR_ICON_SQUARE_SIZE * TOOLBAR_ICON_SQUARE_SIZE,
        'chrome.pageAction.setIcon was called with correct image buffer length'
      );
      assert.deepEqual(
        [...imageData.data],
        [...RED_UINT8_CLAMPED_ARRAY],
        'Icon pixels are correct'
      );
    }
    function show(tabId, cb) {
      assert.ok(true, 'chrome.pageAction.show was called upon receipt of message');
      assert.equal(tabId, -1, 'chrome.pageAction.show was passed the correct tabId');
      cb();
    }
    function hide(...args) {
      assert.ok(false, 'chrome.pageAction.hide should not be called upon receipt of message');
    }
    setupMessageListeners(
      { addListener },
      {
        show,
        hide,
        setIcon,
      }
    );
  });
  q_test('responds to FALLBACK_COLOR content_script_ready appropriately', async (assert) => {
    assert.expect(11);
    function addListener(cb) {
      setTimeout(() => {
        function rcvResponse(arg) {
          assert.ok(true, 'sendResponse was called upon receipt of message');
          assert.equal(arg, 'ok', 'sendResponse was called with correct argument');
        }
        /** @type {import('../../../lib/types').ContentScriptReadyMessage} */
        const msg = {
          key: 'content_script_ready',
          pageInfo: {
            enabled: true,
            tabInfo: {
              pageTitle: 'my page title',
              pageUrl: 'file:///',
              pageDescription: 'my page description',
            },
          },
        };
        cb(msg, { tab: { id: -1 } }, rcvResponse);
        
      }, 0);
      assert.ok(true, 'onMessage.addListener called');
    }

    function setIcon({ tabId, imageData }) {
      assert.ok(true, 'chrome.pageAction.setIcon was called upon receipt of message');
      assert.equal(tabId, -1, 'chrome.pageAction.setIcon was called with correct tabId');
      assert.equal(
        imageData.width,
        TOOLBAR_ICON_SQUARE_SIZE,
        'chrome.pageAction.setIcon was called with correct image width'
      );
      assert.equal(
        imageData.height,
        TOOLBAR_ICON_SQUARE_SIZE,
        'chrome.pageAction.setIcon was called with correct image height'
      );
      assert.equal(
        imageData.data.byteLength,
        4 * TOOLBAR_ICON_SQUARE_SIZE * TOOLBAR_ICON_SQUARE_SIZE,
        'chrome.pageAction.setIcon was called with correct image buffer length'
      );
      assert.deepEqual(
        [...imageData.data],
        [...FALLBACK_COLOR_UINT8_CLAMPED_ARRAY],
        'Icon pixels are correct'
      );
    }
    function show(tabId, cb) {
      assert.ok(true, 'chrome.pageAction.show was called upon receipt of message');
      assert.equal(tabId, -1, 'chrome.pageAction.show was passed the correct tabId');
      cb();
    }
    function hide(...args) {
      assert.ok(false, 'chrome.pageAction.hide should not be called upon receipt of message');
    }
    setupMessageListeners(
      { addListener },
      {
        show,
        hide,
        setIcon,
      }
    );
  });

});
