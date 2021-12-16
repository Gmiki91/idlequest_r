const mongoose=require('mongoose');
const Item = require('./item');

const ArmorSchema = mongoose.Schema({
    type:{
        type:String,
        enum:['head', 'body', 'leftArm', 'rightArm']
    },
});

module.exports = Item.discriminator('Armor', ArmorSchema);