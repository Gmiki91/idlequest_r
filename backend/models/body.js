const mongoose = require('mongoose');

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
    equipmentList:[{
        _id:String,
        durability:Number,
        type:'head' | 'body' | 'leftArm' | 'rightArm' |'leftHand' | 'rightHand' |'bothHands'
    }],
}, { collection: 'bodies' }
);

module.exports = mongoose.model('Body', bodySchema);