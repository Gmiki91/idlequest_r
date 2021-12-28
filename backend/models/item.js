const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    name: String,
    pic: String,
    price: Number,
    level: Number,
    durability: Number,
    type: 'head' | 'body' | 'legs' | 'foot' | 'twoHanded' | 'leftHand' |'rightHand'
},
    {
        discriminatorKey: 'itemtype',
        collection: 'items',
    },
);

module.exports = mongoose.model('Item', ItemSchema);