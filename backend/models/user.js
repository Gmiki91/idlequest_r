const mongoose=require('mongoose');

const userSchema = mongoose.Schema({
    email:String,
    name:String,
    money:Number,
    level:Number,
    body: {
        _id:String,
        health: Number,
        leftArm:Boolean,
        rightArm:Boolean,
        head:Boolean,
    },
    bodyList: [{
        _id:String,
        health: Number,
        leftArm:Boolean,
        rightArm:Boolean,
        head:Boolean,
    }],
    equipmentList: [{
        _id:String,
        durability:Number,
        placement:'head' | 'body' | 'leftArm' | 'rightArm' |'leftHand' | 'rightHand'
    }],
    itemList: [{
        _id:String,
        qty:Number,
        durability:Number,
    }]  
},{collection:'users'});

module.exports = mongoose.model('User',userSchema);
