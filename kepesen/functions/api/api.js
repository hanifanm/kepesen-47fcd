const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase = admin.initializeApp(functions.config().firebase);

var express = require('express');
var api = express.Router();

var bodyParser = require('body-parser');
api.use(bodyParser.urlencoded({ extended : true }));
api.use(bodyParser.json());

api.get('/menu', function(req, res, next){
    var menu = firebase.database().ref('menu');
    menu.once('value').then(snap=>{
        res.status(200).json(snap.val());
    });
});

var jwt = require('jsonwebtoken');
global.atob = function (str) {return new Buffer(str, 'base64').toString();};
var secret = 'kepesencisitu';
api.post('/authenticate', function(req, res){
    var auth = atob(req.body.auth).split(':');
    var username = auth[0];
    var password = auth[1];

    if(username === '' || password === ''){
        res.status(400).json({
            status : false,
            message : 'Empty Username or Password'
        })
    }

    var db = firebase.database();
    db.ref('user/' + username).once('value')
        .then(snap => {
            if(snap.val()===null){
                res.status(400).json({
                    status : false,
                    message : 'User Not Found'
                })
            } else if(snap.val().password !== password){
                res.status(400).json({
                    status : false,
                    message : 'Wrong Password'
                })
            } else {
                var token = jwt.sign({
                    username : username
                }, secret, {
                    expiresIn : 1440
                })

                var res_key = ['active', 'name', 'role'];
                var result = {
                    username : username
                };
                res_key.forEach(k => result[k] = snap.val()[k]);
                
                res.status(200).json({
                    status : true,
                    message : 'Authentication Success',
                    data : result,
                    "x-access-token" : token
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status : false,
                message : 'Internal Server Error'
            });
        })
});

api.use(function(req, res, next){
    var token = req.body['x-access-token'] || req.param('x-access-token') || req.headers['x-access-token'];
    if(token) {
        jwt.verify(token, secret, function(err, decoded){
            if(err){
                return res.status(400).json({
                    status: false,
                    message : 'Failed to Authenticate Token'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        res.status(400).json({
            status: false,
            message : 'No x-access-token provided'
        });
    }
});

module.exports = api;