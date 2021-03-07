// @ts-check
/* eslint-disable no-unused-vars */
import { getButtonColorStringFromTabInfo } from '../../lib/index';
import { q_module, q_test } from '../util';

q_module('PageInfo utility tests', () => {
  q_test('getButtonColorStringFromTabInfo', async (assert) => {
    assert.equal(
      getButtonColorStringFromTabInfo({
        pageTitle: 'my title',
        pageUrl: 'my url',
        buttonColor: '#f00',
      }),
      '#f00'
    );
  });
});
