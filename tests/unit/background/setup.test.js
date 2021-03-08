import { setupMessageListeners } from '../../../background/index';
import { q_module, q_test } from '../../util';

q_module('background setup tests', () => {
  q_test('registers correct event listeners', async (assert) => {
    assert.expect(2);
    function addListener(cb) {
      assert.ok(true, 'onMessage.addListener called');
      assert.equal(typeof cb, 'function', 'onMessage.addListener was passed a function');
    }
    setupMessageListeners(
      { addListener },
      {
        show: () => {},
        hide: () => {},
        setIcon: () => {},
      }
    );
  });
});
