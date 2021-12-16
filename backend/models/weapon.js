const mongoose=require('mongoose');
const Item = require('./item');

const weaponSchema = mongoose.Schema({
    type:{
        type:String,
        enum:['oneHanded', 'twoHanded']
    },
    damage:Number
});

module.exports = Item.discriminator('Weapon', weaponSchema);