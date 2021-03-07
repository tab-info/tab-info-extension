// @ts-check
/* eslint-disable no-unused-vars */
import { getColorStringFromPageInfo } from '../../lib/index';
import { q_module, q_test } from '../util';

q_module('PageInfo utility tests', () => {
  q_test('getColorStringFromPageInfo', async (assert) => {
    assert.equal(
      getColorStringFromPageInfo({
        pageTitle: 'my title',
        pageUrl: 'my url',
        buttonColor: '#f00',
      }),
      '#f00'
    );
  });
});
