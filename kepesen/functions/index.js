const functions = require('firebase-functions');
const cors = require('cors');
const express = require('express');
const api = require('./api/_list.js');

const application = express();
application.use(cors());
application.use('/api', api);
exports.rest = functions.https.onRequest(application);
