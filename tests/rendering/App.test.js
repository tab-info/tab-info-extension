import { q_module, q_test, renderComponent } from '../util';

import App from '../../src/App';

q_module('App test', () => {
  q_test('it works', async (assert) => {
    await renderComponent(App);

    assert.dom('h1').containsText('hello, glimmerx!');
    assert.dom('h3').containsText('you can get started by editing src/App.js');

    assert.dom('img').exists();
  });
});
