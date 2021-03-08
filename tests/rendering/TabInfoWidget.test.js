import { q_module, q_test, renderComponent } from '../util';

import TabInfoWidget from '../../src/TabInfoWidget';

q_module('TabInfoWidget test', () => {
  q_test('initial render', async (assert) => {
    await renderComponent(TabInfoWidget, {
      args: {
        tabInfo: {
          pageTitle: 'my page title',
          pageDescription: 'my page description',
          buttonColor: '#f00',
        },
      },
    });

    assert.dom('#intro').hasAttribute('style', 'background-color: #f00; color: white;');
    assert.dom('h1').containsText('my page title');
    assert.dom('h3').containsText('my page description');
  });
  q_test('automatic text color (dark)', async (assert) => {
    await renderComponent(TabInfoWidget, {
      args: {
        tabInfo: {
          pageTitle: 'my page title',
          pageDescription: 'my page description',
          buttonColor: '#333',
        },
      },
    });

    assert.dom('#intro').hasAttribute('style', 'background-color: #333; color: white;');
  });
  q_test('automatic text color (light)', async (assert) => {
    await renderComponent(TabInfoWidget, {
      args: {
        tabInfo: {
          pageTitle: 'my page title',
          pageDescription: 'my page description',
          buttonColor: '#bbb',
        },
      },
    });

    assert.dom('#intro').hasAttribute('style', 'background-color: #bbb; color: black;');
  });
});
