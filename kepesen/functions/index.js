const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase = admin.initializeApp(functions.config().firebase);
const cors = require('cors')({origin: true});

exports.getmenu = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        var menu = firebase.database().ref('menu');
        menu.once('value').then(snap=>{
            res.status(200).json(snap.val());
        });
    })
})

// eventSnapshot.ref.root
