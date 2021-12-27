const express = require('express');
const router = express.Router();

const Body = require('../models/body');

router.get('/:ids', async (req, res) => {
    const idArray = req.params.ids.split(',');
    try {
        const bodies = await Body.find({ _id: { $in: idArray } });
        return res.status(200).send({ status: 'success',  bodies })
    } catch (e) {
        return res.status(500).send({ status: 'error', message: e.message });

    }

});
/*
router.get('/', (req, res) => {
    const body = Body({
        name: 'Hulla1',
        pic: 'zombi1',
        price: 10,
        xp: 0,
        level: 1,
        strength: 12,
        dexterity: 5,
        health: 5,
        leftArm: true,
        rightArm: true,
        head: true,
        equipmentList: []
    });
    body.save();
    res.status(200).send('saved');
})*/

module.exports = router;

/*
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
*/