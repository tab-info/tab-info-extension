// @ts-check
const express = require('express');
const { join } = require('path');

const DEMO_APP_PORT = process.env.DEMO_APP_PORT || 3001;

const app = express();

const RDEV_SAMPLE_RESPONSE = {
  id: 'rdev-d50f3b06-5cc1-415a-9b5c-6ed40d06f5fb',
  color: '#880',
  title: 'Connected to Rdev - whimsical-dumbledore',
  description:
    '<h2 style="color:red">Information</h2>\n\n **test** \n\n- **Developer** - `skasturi`\n\n- **Last Accessed At** - 2021-04-30 20:54:42\n\n- **Forwarded Ports** - 4443, 2702\n\n',
};
const remoteTabInfo = {
  'rdev-d50f3b06-5cc1-415a-9b5c-6ed40d06f5fb': RDEV_SAMPLE_RESPONSE,
};

app.use(express.static(join(__filename, '..', 'pages')));

// http://localhost:3001/api/tabInfo/rdev-d50f3b06-5cc1-415a-9b5c-6ed40d06f5fb
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
