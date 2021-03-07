// @ts-check
const express = require('express');
const { join } = require('path');

const DEMO_APP_PORT = process.env.DEMO_APP_PORT || 3001;

const app = express();

app.use(express.static(join(__filename, '..', 'pages')))

app.listen(DEMO_APP_PORT, () => {
    console.log(`listening on :${DEMO_APP_PORT}`);
})