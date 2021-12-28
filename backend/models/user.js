const mongoose=require('mongoose');
const Body = require('./body').schema;
const Item = require('./item').schema;

const userSchema = mongoose.Schema({
    email:String,
    name:String,
    money:Number,
    level:Number,
    bodyList: [Body],
    itemList: [Item]  
},{collection:'users'});

module.exports = mongoose.model('User',userSchema);
