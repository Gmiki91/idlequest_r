const mongoose = require('mongoose');

const bodySchema = mongoose.Schema({
    name: String,
    pic: String,
    price: Number,
    level: Number,
    strength: Number,
    dexterity: Number,
    health: Number,
    leftArm: Boolean,
    rightArm: Boolean,
    head: Boolean,
    equipment:[Object]
}, { collection: 'bodies' }
);

module.exports = mongoose.model('Body', bodySchema);