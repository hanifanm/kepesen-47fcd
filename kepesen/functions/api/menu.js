var api = require('express').Router();

api.get('/menu', function(req, res){
    var menu = req.firebase.database().ref('menu');
    menu.once('value').then(snap=>{
        var result = [];
        Object.keys(snap.val()).forEach(function(key){
            var temp = snap.val()[key];
            temp.id = key;
            result.push(temp);
        })
        var response = new res.Response(true, 200, result, null, null);
        res.status(200).json(response.getResponse());
    }).catch(function(err){
        var response = new res.Response(false, 400, null, 'Failed to retrieve data from database.', err);
        res.status(400).json(response.getResponse());
    });
});

module.exports = api;