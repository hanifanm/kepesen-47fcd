const api = require('express').Router();
const moment = require('moment');
const model = require('./model');

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

const OrderStatus = {
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

const countPrice = function(list, menus){
    var totalPrice = 0;
    list.forEach(plate => {
        plate.price = menus[plate.menuId].price;
        plate.toppingId.forEach(tid => {
            plate.price += menus[tid].price2;
        })
        totalPrice += plate.price;
    })
    return totalPrice;
}

api.post('/costumerorder', asyncMiddleware(function(req, res, next){
    new model.Order(req.body).validate(function(err){
        if(err === null || err === undefined){

            req.firebase.database().ref('menu').once('value').then(menus => {
                req.body.createdAt = moment.utc().add(7, 'hours').format('YYYYMMDDHHmmssSSS');
                req.body.updatedAt = req.body.createdAt;
                req.body.price = countPrice(req.body.list, menus.val());
                req.body.status = OrderStatus.create;

                req.firebase.database().ref('order').push(req.body)
                .then(function(){
                    var response = new res.Response(true, 200, 'Success inserting data into database', null, null);
                    res.status(200).json(response.getResponse());
                }).catch(function(err){
                    var response = new res.Response(false, 400, null, 'Failed to insert data into database.', err)
                    res.status(400).json(response.getResponse());
                });
            })
            
        } else {
            var response = new res.Response(false, 400, null, 'Request body doesnt match.', err)
            res.status(400).json(response.getResponse());
        }
    })
}))

api.put('/costumerorder', asyncMiddleware(function(req, res){
    if (!req.body.id || req.body.id==='' 
    || !req.body.updatedBy || req.body.updatedBy===''
    || !req.body.status || req.body.status==='') {
        var response = new res.Response(false, 400, null, 'Request body doesnt match.', err)
        res.status(400).json(response.getResponse());
    } else if (req.body.status != OrderStatus.cancel) {
        var response = new res.Response(false, 400, null, 'Unauthorized to do this operation.', err)
        res.status(400).json(response.getResponse());
    } else {

        req.firebase.database().ref('order/'+req.body.id).once('value').then(order => {
            
            if(order.val()===null){
                var response = new res.Response(false, 400, null, 'Data with this id doesnt exist.', err)
                res.status(400).json(response.getResponse());
            }

            req.firebase.database().ref('order/'+req.body.id).update({
                updatedAt : moment.utc().add(7, 'hours').format('YYYYMMDDHHmmssSSS'),
                updatedBy : req.body.updatedBy,
                status : req.body.status
            })
            .then(function(){
                var response = new res.Response(true, 200, 'Success updating data.', null, null);
                res.status(200).json(response.getResponse());
            }).catch(function(err){
                var response = new res.Response(false, 400, null, 'Failed to update data.', err)
                res.status(400).json(response.getResponse());
            });
        })
    }
}))

api.get('/costumerorder', function(req, res){
    if(!req.query.userId){
        var response = new res.Response(false, 400, null, 'userId must not empty.', null);
        res.status(400).json(response.getResponse());
    } else {
        req.firebase.database().ref('order').orderByChild('createdBy')
        .startAt(req.query.userId).endAt(req.query.userId + '\uf8ff')
        .once('value').then(snap => {
            var result = [];
            if(snap.val()){
                Object.keys(snap.val()).forEach(function(key){
                    var temp = snap.val()[key];
                    temp.id = key;
                    result.push(temp);
                })
                result.sort(function(a, b){ return a.createdAt - b.createdAt });
            }
            var response = new res.Response(true, 200, result, null, null);
            res.status(200).json(response.getResponse());
        }).catch(function(err){
            var response = new res.Response(false, 400, null, 'Failed to retrieve data from database.', err);
            res.status(400).json(response.getResponse());
        })
    }
});

module.exports = api;