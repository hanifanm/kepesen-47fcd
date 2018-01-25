const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const model = require('./model');
const moment = require('moment');

const firebase = admin.initializeApp(functions.config().firebase);
const api = express.Router();

global.atob = function (str) {return new Buffer(str, 'base64').toString();};
api.use(bodyParser.urlencoded({ extended : true }));
api.use(bodyParser.json());

api.use(function(req, res, next){
    res.Response = Response;
    req.firebase = firebase;
    next();
});

api.use(function(req, res, next){
    var token = req.body['x-access-token'] || req.params['x-access-token'] || req.headers['x-access-token'] || '';
    if(token) {
        jwt.verify(token, secret, function(err, decoded){
            if(!err){
                req.decoded = decoded;
            } else {
                req.nextMessage = 'error_decode_token'
            }
            next();
        })
    } else {
        req.nextMessage = 'no_token'
        next();
    }
});

api.use('/', require('./authenticate'));
api.use('/', require('./menu'));
api.use('/', require('./costumerorder'));
api.use('/', require('./order'));

/////////////////////////TO MOVE

var secret = 'kepesencisitu';

api.use(function(err, req, res, next) {
    if(req.nextMessage==='no_token'){
        var response = new Response(false, 401, null, 'Unauthorized', err)
        res.status(401).json(response.getResponse());
    } else {
        var response = new Response(false, 500, null, req.nextMessage, err)
        res.status(500).json(response.getResponse());
    }
});

module.exports = api;

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