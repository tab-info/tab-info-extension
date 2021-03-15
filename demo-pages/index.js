// @ts-check
const express = require('express');
const { join } = require('path');

const DEMO_APP_PORT = process.env.DEMO_APP_PORT || 3001;

const app = express();

const remoteTabInfo = {
  abcd1234: {
    buttonColor: '#aa0',
    popupTitle: 'Dev Environment: Staging',
    popupDescription:
      '### Uptime \n 8d 3h 22m \n ### Connecting to this environment \n ```\nssh root@127.0.0.1\n``` \n',
  },
};

app.use(express.static(join(__filename, '..', 'pages')));

app.get('/api/tabInfo/:id', (request, response) => {
  const tabId = request.params['id'];
  if (!tabId || typeof tabId !== 'string') {
    response.status(400).json({
      error: 'expected an id parameter in the URL: "/api/tabInfo/:id"',
    });
  } else if (!(tabId in remoteTabInfo)) {
    response.status(404).json({
      error: `No data found for id: ${tabId}`,
    });
  } else {
    const data = remoteTabInfo[tabId];
    if (typeof data !== 'object') {
      response.status(500).json({
        error: `Illegal key`,
      });
    } else {
      response.status(200).json(data);
    }
  }
});

app.listen(DEMO_APP_PORT, () => {
  console.log(`listening on :${DEMO_APP_PORT}`);
});
