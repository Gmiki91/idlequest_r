const mongoose=require('mongoose');
const Body = require('./body').schema;

const userSchema = mongoose.Schema({
    email:String,
    name:String,
    money:Number,
    level:Number,
    bodyIdList: [String],
    itemList: [{
        _id:String,
        qty:Number,
        durability:Number,
    }]  
},{collection:'users'});

module.exports = mongoose.model('User',userSchema);
