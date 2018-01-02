const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const model = require('./model');

const firebase = admin.initializeApp(functions.config().firebase);
const api = express.Router();

global.atob = function (str) {return new Buffer(str, 'base64').toString();};
api.use(bodyParser.urlencoded({ extended : true }));
api.use(bodyParser.json());

/**
 * RESPONSE MODEL
 */
class Response{
    constructor(success, code, data, message, error){
        this.success = success;
        this.code = code;
        this.data = data;
        this.message = message;
        this.error = error;
    }
    getResponse(){
        if(this.success){
            return {
                success : this.success,
                code : this.code,
                data : this.data
            }
        } else {
            return {
                success : this.success,
                code : this.code,
                message : this.message,
                error : this.error
            }
        }
    }
}

/**
 * PUBLIC API
 */

api.get('/menu', function(req, res){
    var menu = firebase.database().ref('menu');
    menu.once('value').then(snap=>{
        var result = [];
        Object.keys(snap.val()).forEach(function(key){
            var temp = snap.val()[key];
            temp.id = key;
            result.push(temp);
        })
        var response = new Response(true, 200, result, null, null);
        res.status(200).json(response.getResponse());
    }).catch(function(err){
        var response = new Response(false, 400, null, 'Failed to retrieve data from database.', err);
        res.status(400).json(response.getResponse());
    });
});

var secret = 'kepesencisitu';
api.post('/authenticate', function(req, res){
    var auth = atob(req.body.auth).split(':');
    var username = auth[0];
    var password = auth[1];

    if(username === '' || password === ''){
        var response = new Response(false, 400, null, 'Empty Username or Password.', {})
        res.status(400).json(response.getResponse());
    }

    var db = firebase.database();
    db.ref('user').orderByChild('username').equalTo(username)
        .once('value').then(snap => {
            snap.forEach(function(user){
                if(user.val() === null){
                    var response = new Response(false, 400, null, 'User not found.', {})
                    res.status(400).json(response.getResponse());
                } else if(user.val().password !== password){
                    var response = new Response(false, 400, null, 'Wrong Password.', {})
                    res.status(400).json(response.getResponse());
                } else {
                    var token = jwt.sign({
                        username : username,
                        role : user.val().role
                    }, secret, {
                        expiresIn : 1440
                    })

                    var res_key = ['active', 'name', 'role'];
                    var result = {
                        username : username
                    };
                    res_key.forEach(k => result[k] = user.val()[k]);

                    var response = new Response(true, 200, result, null, null);
                    var responseJSON = response.getResponse();
                    responseJSON['x-access-token'] = token;
                    
                    res.status(200).json(responseJSON);
                }
            })
        }).catch(function(err){
            var response = new Response(false, 400, null, 'Failed to retrieve data from database.', err)
            res.status(400).json(response.getResponse());
        });
});

api.use(function(req, res, next){
    var token = req.body['x-access-token'] || req.params['x-access-token'] || req.headers['x-access-token'];
    if(token) {
        jwt.verify(token, secret, function(err, decoded){
            if(err){
                var response = new Response(false, 400, null, 'Failed to Authenticate Token.', err)
                res.status(400).json(response.getResponse());
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        var response = new Response(false, 400, null, 'No x-access-token provided.', {})
        res.status(400).json(response.getResponse());
    }
});


/**
 * PRIVATE API
 */

//ORDER
api.get('/order', function(req, res){
    if(req.decoded.role === 1){
        firebase.database().ref('order').orderByChild('createdAt')
            .once('value').then(snap => {
                var result = [];
                Object.keys(snap.val()).forEach(function(key){
                    var temp = snap.val()[key];
                    temp.id = key;
                    result.push(temp);
                })
                result.sort(function(a, b){ return a.createdAt - b.createdAt });
                var response = new Response(true, 200, result, null, null);
                res.status(200).json(response.getResponse());
            }).catch(function(err){
                var response = new Response(true, 200, null, 'Failed to retrieve data from database.', err);
                res.status(400).json(response.getResponse());
            })
    } else if(req.decoded.role === 2){
        firebase.database().ref('order').orderByChild('createdBy_createdAt')
            .startAt(req.decoded.username).endAt(req.decoded.username + '\uf8ff')
            .once('value').then(snap => {
                var result = [];
                Object.keys(snap.val()).forEach(function(key){
                    var temp = snap.val()[key];
                    temp.id = key;
                    result.push(temp);
                })
                result.sort(function(a, b){ return a.createdAt - b.createdAt });
                var response = new Response(true, 200, result, null, null);
                res.status(200).json(response.getResponse());
            }).catch(function(err){
                var response = new Response(true, 200, null, 'Failed to retrieve data from database.', err);
                res.status(400).json(response.getResponse());
            })
    } else {
        firebase.database().ref('order').orderByChild('driverId_createdAt')
            .startAt(req.decoded.username).endAt(req.decoded.username + '\uf8ff')
            .once('value').then(snap => {
                var result = [];
                Object.keys(snap.val()).forEach(function(key){
                    var temp = snap.val()[key];
                    temp.id = key;
                    result.push(temp);
                })
                result.sort(function(a, b){ return a.createdAt - b.createdAt });
                var response = new Response(true, 200, result, null, null);
                res.status(200).json(response.getResponse());
            }).catch(function(err){
                var response = new Response(true, 200, null, 'Failed to retrieve data from database.', err);
                res.status(400).json(response.getResponse());
            })
    }
})

api.post('/order', function(req, res){
    new model.Order(req.body).validate(function(err){
        if(err === null || err === undefined){
            // res.json(req.body);
            firebase.database().ref('order').push(req.body)
            .then(function(){
                var response = new Response(true, 200, 'Success inserting data into database', null, null);
                res.status(200).json(response.getResponse());
            }).catch(function(err){
                var response = new Response(false, 400, null, 'Failed to insert data into database.', err)
                res.status(400).json(response.getResponse());
            });
        } else {
            var response = new Response(false, 400, null, 'Request body doesnt match.', err)
            res.status(400).json(response.getResponse());
        }
    })
})

module.exports = api;