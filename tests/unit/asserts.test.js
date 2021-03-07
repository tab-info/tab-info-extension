/* eslint-disable no-unused-vars */
import { assertExists, assertIsMessageBase, assertIsPageInfo, PageInfo } from '../../lib/index';
import { q_module, q_test } from '../util';


q_module('assertion tests', () => {
  
  q_test('assertExists', async (assert) => {
    assert.throws(() => {
        assertExists(undefined, 'a barn');
    }, /Found unexpected undefined value for a barn/)
    assertExists(4, 'a defined value');
  });
  
  q_test('assertIsMessageBase', async (assert) => {
    assertIsMessageBase({ key: 'foo'});
    assert.throws(() => {
        assertIsMessageBase({ nope: 'foo'});
    }, /Bad message format/)
  });
 
  q_test('assertIsMessageBase', async (assert) => {
    /**@type {PageInfo} */
    const p = {
      enabled: true,
      tabInfo: {
        pageTitle: 'my title',pageUrl: 'file:///'
      }
    }
    assertIsPageInfo(p);
    assert.throws(() => {
        assertIsPageInfo({ nope: 'foo'});
    }, /{"nope":"foo"} must have an enabled boolean/)
  });
});
