const mongoose=require('mongoose');

const ItemSchema = mongoose.Schema({
    name:String,
    price: Number,
    level: Number,
    durability:Number
},
    {
        discriminatorKey: 'itemtype',
        collection: 'items',
    },
);

module.exports = mongoose.model('Item', ItemSchema);