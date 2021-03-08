/* eslint-disable no-unused-vars */
import { getActiveTabInCurrentWindow } from '../../../src/index';
import { q_module, q_test } from '../../util';

q_module('tab detection tests', () => {
  q_test('getActiveTabInCurrentWindow', async (assert) => {
    assert.expect(2);
    function stubQuery(query, cb) {
      assert.deepEqual(query, { active: true, currentWindow: true });
      cb([{ id: 123 }]);
    }
    const tab = await getActiveTabInCurrentWindow(stubQuery);
    assert.equal(tab.id, 123);
  });
});
