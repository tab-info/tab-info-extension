// @ts-check
/* eslint-disable no-unused-vars */
import { getColorStringFromTabInfo } from '../../lib/index';
import { q_module, q_test } from '../util';

q_module('PageInfo utility tests', () => {
  q_test('getColorStringFromTabInfo', async (assert) => {
    assert.equal(
      getColorStringFromTabInfo({
        pageTitle: 'my title',
        pageUrl: 'my url',
        buttonColor: '#f00',
      }),
      '#f00'
    );
  });
});
