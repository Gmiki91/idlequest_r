const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const Weapon = require('../models/weapon');
const Armor = require('../models/armor');

router.get('/',async(req,res)=>{   
    const weapon1 = new Weapon({
        type:'oneHanded',
        name:'fakés',
        price:7,
        level:1,
        durability:4,
        damage:2
    });
    const armor1 = new Armor({
        name:'sapesz',
        type:'head',
        price:5,
        level:1,
        durability:5,
       
    });
    try{
        const items = await Promise.all([
            Item.find()
        ]);
        return res.status(200).json({status: 'success', items:items});
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