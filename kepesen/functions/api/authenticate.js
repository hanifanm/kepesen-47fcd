const api = require('express').Router();
const jwt = require('jsonwebtoken');
global.atob = function (str) {return new Buffer(str, 'base64').toString();};

var secret = 'kepesencisitu';
api.post('/authenticate', function(req, res){
    var auth = atob(req.body.auth).split(':');
    var username = auth[0];
    var password = auth[1];

    if(username === '' || password === ''){
        var response = new res.Response(false, 400, null, 'Empty Username or Password.', {})
        res.status(400).json(response.getResponse());
    }

    var db = req.firebase.database();
    db.ref('user').orderByChild('username').equalTo(username)
        .once('value').then(snap => {
            if(snap.val() === null){
                var response = new res.Response(false, 400, null, 'User not found.', {})
                res.status(400).json(response.getResponse());
            }
            snap.forEach(function(user){
                if(user.val() === null){
                    var response = new res.Response(false, 400, null, 'User not found.', {})
                    res.status(400).json(response.getResponse());
                } else if(user.val().password !== password){
                    var response = new res.Response(false, 400, null, 'Wrong Password.', {})
                    res.status(400).json(response.getResponse());
                } else {
                    var token = jwt.sign({
                        username : username,
                        role : user.val().role
                    }, secret, {})

                    var res_key = ['active', 'name', 'role'];
                    var result = {
                        username : username
                    };
                    res_key.forEach(k => result[k] = user.val()[k]);

                    var response = new res.Response(true, 200, result, null, null);
                    var responseJSON = response.getResponse();
                    responseJSON['x-access-token'] = token;
                    
                    res.status(200).json(responseJSON);
                }
            })
        }).catch(function(err){
            var response = new res.Response(false, 400, null, 'Failed to retrieve data from database.', err)
            res.status(400).json(response.getResponse());
        });
});

module.exports = api;