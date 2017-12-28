const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// const firebase = admin.initializeApp(functions.config().firebase);
const cors = require('cors');//({origin: true});
const express = require('express');
const api = require('./api/api.js');

const application = express();
application.use(cors());
application.use('/api', api);
exports.rest = functions.https.onRequest(application);

// exports.getmenu = functions.https.onRequest((req, res) => {
//     cors(req, res, () => {
//         var menu = firebase.database().ref('menu');
//         menu.once('value').then(snap=>{
//             res.status(200).json(snap.val());
//         });
//     })
// })

// eventSnapshot.ref.root
