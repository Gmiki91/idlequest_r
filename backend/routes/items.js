const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const Weapon = require('../models/weapon');

router.get('/',async(req,res)=>{   
    const weapon1 = new Weapon({
        name:'fejsze',
        pic:'axe1',
        price:7,
        level:1,
        durability:4,
        damage:2,
        type:'twoHanded'
    });
    const weapon2 = new Weapon({
        name:'fakés',
        pic:'wooden_knife',
        price:7,
        level:1,
        durability:4,
        damage:2,
        type:'rightHand'
    });
    const weapon3 = new Weapon({
        name:'fakard',
        pic:'wooden_sword',
        price:7,
        level:1,
        durability:4,
        damage:2,
        type:'leftHand'
    });
    const item1 = new Item({
        name:'Hat',
        pic:'hat',
        price:10,
        level:1,
        durability:15,
        type:'head'
    });
    const item2 = new Item({
        name:'T-shirt',
        pic:'shirt',
        price:10,
        level:1,
        durability:15,
        type:'body'
    });
    const item3 = new Item({
        name:'Jeans',
        pic:'jeans',
        price:10,
        level:1,
        durability:15,
        type:'legs'
    });

    const item4 = new Item({
        name:'Shoes',
        pic:'shoe',
        price:10,
        level:1,
        durability:15,
        type:'foot'
    });
    try{
        const items = await Item.find();
   
        return res.status(200).json({status: 'success', list:items});
    }catch(e){
        return res.status(500).json({status: 'error', message:e.message});
    }
})

router.get('/:ids', async(req,res)=>{
    const idArray = req.params.ids.split(',');
      try{
        const items = await Item.find({_id:{$in:idArray}});
        return res.status(200).send({status: 'success', items:items})
    }catch(e){
        return res.status(500).send({status: 'error', message:e.message});

    }
})

module.exports = router;