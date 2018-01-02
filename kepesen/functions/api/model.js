var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    id: { type: String },
    username: { type: String, required: true },
    password: { type: String, required: true },
    active: { type: Boolean, required: true },
    message: { type: String, required: true },
    createdAt: { type: Number, required: true },
    createdBy: { type: String, required: true },
    updatedAt: { type: Number, required: true },
    updatedBy: { type: String, required: true },
})

var MenuSchema = mongoose.Schema({
    id: { type: String },
    group: { type: Number, required: true },
    name: { type: String, required: true },
    sambal: { type: [String] },
    toppingId: { type: [String] },
    price: { type: Number, required: true },
    price2: { type: Number, required: true },
    active: { type: Boolean, required: true },
    ready: { type: Boolean, required: true },
    createdAt: { type: Number, required: true },
    createdBy: { type: String, required: true },
    updatedAt: { type: Number, required: true },
    updatedBy: { type: String, required: true },
})

var OrderSchema = mongoose.Schema({
    id: { type: String },
    status: { type: Number, required: true },
    list: [{
        menuId: { type: String, required: true },
        sambal: { type: String, required: true },
        chili: { type: Number, required: true },
        toppingId: { type: [Number] },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
    }],
    price: { type: Number, required: true },
    recName: { type: String, required: true },
    recAddress: { type: String, required: true },
    recPhone: { type: String, required: true },
    recLocation: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    driverId: { type: String },
    createdAt: { type: Number, required: true },
    createdBy: { type: String, required: true },
    updatedAt: { type: Number, required: true },
    updatedBy: { type: String, required: true },
})

var User = mongoose.model('User', UserSchema);
var Order = mongoose.model('Order', OrderSchema);
var Menu = mongoose.model('Menu', MenuSchema);

module.exports = {
    User: User,
    Order: Order,
    Menu: Menu
}