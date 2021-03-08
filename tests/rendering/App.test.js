import { q_module, q_test, renderComponent } from '../util';

import App from '../../src/App';

q_module('App test', () => {
  q_test('initial render', async (assert) => {
    await renderComponent(App, {
      args: {
        data: {
          tabInfo: {
            pageTitle: 'my page title',
            pageDescription: 'my page description',
            buttonColor: '#f00',
          },
        },
      },
    });

    assert.dom('#intro').hasAttribute('style', 'background-color: #f00; color: white;');
    assert.dom('h1').containsText('my page title');
    assert.dom('h3').containsText('my page description');
  });
});
