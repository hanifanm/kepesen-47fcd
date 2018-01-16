const api = require('express').Router();
const moment = require('moment');

var OrderStatus = {
    create : 1,
    order : 2,
    process : 3,
    assigned : 4,
    delivered : 5,
    cancel : 6,
    reject : 7,
    user_not_exist : 8,
    receive : 9
}

api.get('/order', function(req, res){
    if(req.decoded.role === 1){
        req.firebase.database().ref('order').orderByChild('createdAt')
            .startAt(moment(new Date()).format('YYYYMMDD')).endAt(moment(new Date()).format('YYYYMMDD') + '\uf8ff')
            .once('value').then(snap => {
                var result = [];
                Object.keys(snap.val()).forEach(function(key){
                    var temp = snap.val()[key];
                    temp.id = key;
                    result.push(temp);
                })
                result.sort(function(a, b){ return a.createdAt - b.createdAt });
                var response = new res.Response(true, 200, result, null, null);
                res.status(200).json(response.getResponse());
            }).catch(function(err){
                var response = new res.Response(true, 200, null, 'Failed to retrieve data from database.', err);
                res.status(400).json(response.getResponse());
            })
    } else {
        req.firebase.database().ref('order').orderByChild('createdAt')
            .startAt(moment(new Date()).format('YYYYMMDD')).endAt(moment(new Date()).format('YYYYMMDD') + '\uf8ff')
            .once('value').then(snap => {
                var result = [];
                Object.keys(snap.val()).forEach(function(key){
                    var temp = snap.val()[key];

                    if(temp.status === OrderStatus.assigned ||
                    temp.status === OrderStatus.delivered ||
                    temp.status === OrderStatus.receive ||
                    temp.status === OrderStatus.user_not_exist){
                        temp.id = key;
                        result.push(temp);   
                    }
                })
                result.sort(function(a, b){ return a.createdAt - b.createdAt });
                var response = new res.Response(true, 200, result, null, null);
                res.status(200).json(response.getResponse());
            }).catch(function(err){
                var response = new res.Response(true, 200, null, 'Failed to retrieve data from database.', err);
                res.status(400).json(response.getResponse());
            })
    }
});

module.exports = api;