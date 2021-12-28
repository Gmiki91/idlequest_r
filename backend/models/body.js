const mongoose = require('mongoose');
const Item = require('./item').schema;
const bodySchema = mongoose.Schema({
    name: String,
    pic: String,
    price: Number,
    xp:Number,
    level: Number,
    strength: Number,
    dexterity: Number,
    health: Number,
    leftArm: Boolean,
    rightArm: Boolean,
    head: Boolean,
    equipmentList:[Item],
}, { collection: 'bodies' }
);

module.exports = mongoose.model('Body', bodySchema);