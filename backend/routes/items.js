const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const Weapon = require('../models/weapon');
const Armor = require('../models/armor');

router.get('/',async(req,res)=>{   
    try{
        const [armors,weapons] = await Promise.all([
            Weapon.find(),
            Armor.find(),
        ]);
        return res.status(200).json({status: 'success', armors:armors, weapons:weapons});
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