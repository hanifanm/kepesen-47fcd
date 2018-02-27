var api = require('express').Router();
const moment = require('moment');
const model = require('./model');

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

api.post('/menu', function(req, res){
    if(!req.decoded  || req.decoded.role != 1){
        next();
    }
    new model.Menu(req.body).validate(function(err){
        if(err === null || err === undefined){

            req.body.createdAt = moment.utc().add(7, 'hours').format('YYYYMMDDHHmmssSSS');
            req.body.updatedAt = req.body.createdAt;

            req.firebase.database().ref('menu').push(req.body)
            .then(function(){
                var response = new res.Response(true, 200, 'Success inserting data into database', null, null);
                res.status(200).json(response.getResponse());
            }).catch(function(err){
                var response = new res.Response(false, 400, null, 'Failed to insert data into database.', err)
                res.status(400).json(response.getResponse());
            });
            
        } else {
            var response = new res.Response(false, 400, null, 'Request body doesnt match.', err)
            res.status(400).json(response.getResponse());
        }
    })
})

api.put('/menu', function(req, res){
    if(!req.decoded){
        next();
    }
    if(req.decoded.role != 1){
        var response = new res.Response(false, 401, null, 'Unauthorized to do this operation.', null)
        res.status(400).json(response.getResponse());
    } else {
        req.firebase.database().ref('menu/'+req.body.id).once('value').then(menu => {
            if(menu.val()==null){
                var response = new res.Response(false, 400, null, 'Data with this id doesnt exist.', err)
                res.status(400).json(response.getResponse());
            } else {
                new model.Menu(req.body).validate(function(err){
                    if(err === null || err === undefined){

                        req.body.updatedAt = moment.utc().add(7, 'hours').format('YYYYMMDDHHmmssSSS');

                        req.firebase.database().ref('menu/'+req.body.id).update(req.body)
                        .then(data => {
                            var response = new res.Response(true, 200, 'Success updating data.', null, null);
                            res.status(200).json(response.getResponse());
                        }).catch(err => {
                            var response = new res.Response(false, 400, null, 'Failed to update data.', err)
                            res.status(400).json(response.getResponse());
                        });
                        
                    } else {
                        var response = new res.Response(false, 400, null, 'Request body doesnt match.', err)
                        res.status(400).json(response.getResponse());
                    }
                })
            }
        })
    }
    //  else if (!req.body.id || req.body.id==='' 
    // || !req.body.updatedBy || req.body.updatedBy===''
    // || req.body.ready==null) {
    //     var response = new res.Response(false, 400, null, 'Request body doesnt match.', null)
    //     res.status(400).json(response.getResponse());
    // } else {
    //     req.firebase.database().ref('menu/'+req.body.id).once('value').then(menu => {
    //         if(menu.val()==null){
    //             var response = new res.Response(false, 400, null, 'Data with this id doesnt exist.', err)
    //             res.status(400).json(response.getResponse());
    //         }
    //         req.firebase.database().ref('menu/'+req.body.id).update({
    //             updatedAt : moment.utc().add(7, 'hours').format('YYYYMMDDHHmmssSSS'),
    //             updatedBy : req.body.updatedBy,
    //             ready : req.body.ready,
    //             active : req.body.active!=null? req.body.active : menu.val().active
    //         }).then(data => {
    //             var response = new res.Response(true, 200, 'Success updating data.', null, null);
    //             res.status(200).json(response.getResponse());
    //         }).catch(err => {
    //             var response = new res.Response(false, 400, null, 'Failed to update data.', err)
    //             res.status(400).json(response.getResponse());
    //         });
    //     }).catch(err => {
    //         var response = new res.Response(false, 400, null, 'Error get data from database.', err)
    //         res.status(400).json(response.getResponse());
    //     })
    // }
})

api.delete('/menu', function(req, res){
    if(!req.decoded){
        next();
    }
    if(req.decoded.role != 1){
        var response = new res.Response(false, 401, null, 'Unauthorized to do this operation.', null)
        res.status(400).json(response.getResponse());
    } else if (!req.query.id) {
        var response = new res.Response(false, 400, null, 'Request params doesnt match.', null)
        res.status(400).json(response.getResponse());
    } else {
        req.firebase.database().ref('menu/'+req.query.id).remove().then(response => {
            var response = new res.Response(true, 200, 'Success delete data.', null, null);
            res.status(200).json(response.getResponse());
        }).catch(err => {
            var response = new res.Response(false, 400, null, 'Failed to update data.', err)
            res.status(400).json(response.getResponse());
        });
    }
})

module.exports = api;