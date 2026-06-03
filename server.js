// Local Node.js server for testing the website before publishing.
// Run: npm install && npm start
require('dotenv').config();
const express = require('express');
const path = require('path');
const bookingHandler = require('./api/booking');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.post('/api/booking', (req, res) => bookingHandler(req, res));

app.listen(port, () => {
  console.log(`Website is running: http://localhost:${port}`);
});
