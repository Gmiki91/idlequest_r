const mongoose=require('mongoose');
const Item = require('./item');

const ArmorSchema = mongoose.Schema({
    type:{
        type:String,
        enum:['head', 'body', 'leftHand', 'rightHand']
    },
});

module.exports = Item.discriminator('Armor', ArmorSchema);