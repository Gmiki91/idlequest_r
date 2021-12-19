const mongoose=require('mongoose');
const Item = require('./item');

const weaponSchema = mongoose.Schema({
    damage:Number
});

module.exports = Item.discriminator('Weapon', weaponSchema);