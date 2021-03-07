/* eslint-disable no-unused-vars */
import { makeIconFromColor } from '../../lib/index';
import { q_module, q_test } from '../util';


q_module('icon utility tests', () => {
  
  q_test('makeIconFromColor', async (assert) => {
    const dat = makeIconFromColor('#f00', 12);
    assert.ok(dat);
    assert.equal(dat.height, 12);
    assert.equal(dat.width, 12);
    assert.equal(dat.data.byteLength, 12*12*4);
  });
  
});
