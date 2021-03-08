// @ts-check
import { setupMessageListeners } from '../../../content/index';
import { q_module, q_test } from '../../util';

q_module('content script setup tests', () => {
  q_test('registers correct event listeners', async (assert) => {
    assert.expect(2);
    function addListener(cb) {
      assert.ok(true, 'onMessage.addListener called');
      assert.equal(typeof cb, 'function', 'onMessage.addListener was passed a function');
    }
    /** @type {import('../../../content/types').PartialChromeRuntimeApi['onMessage']} */
    const partialChromeApi = { addListener };

    setupMessageListeners(partialChromeApi, document);
  });
  q_test('indicates readiness after setup', async (assert) => {
    assert.expect(7);
    /**
     *
     * @param {(...args: any[]) => void} cb
     */
    function addListener(cb) {
      assert.ok(true, 'onMessage.addListener called');
      cb({ key: 'get_page_info' }, null, /**@type {(x: import('../../../lib/types').PageInfo) => void}*/(response) => {
          assert.ok(response, 'response received');
          assert.equal(response.enabled, true);
          assert.equal(response.tabInfo.buttonColor, '#a3a');
          assert.equal(typeof response.tabInfo.pageTitle, 'string');
          assert.ok(response.tabInfo.pageUrl.startsWith('http://localhost'));
          assert.equal(response.tabInfo.pageDescription, 'Example description');
      });
    }
    /** @type {import('../../../content/types').PartialChromeRuntimeApi['onMessage']} */
    const partialChromeApi = { addListener };

    setupMessageListeners(partialChromeApi, document);
  });
});
