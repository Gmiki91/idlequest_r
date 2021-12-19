const express = require('express');
const router = express.Router();

const Item = require('../models/item');
const User = require('../models/user');

router.get('/:id', async (req, res) => {
   const user = await User.findById(req.params.id);
   res.status(200).json(user);
});

router.put('/unequip', async (req, res) => {
   try {
      const user = await User.findById('61b8a1b9668c7872bc8b26e8');
      const item = req.body.item;
      const equipped = user.equipmentList.find(equipment => equipment._id === item._id);
      const index = user.equipmentList.indexOf(equipped);
      user.equipmentList.splice(index, 1);
      await user.save();
      res.status(200).json({ status: 'success' });
   } catch (err) {
      res.status(500).json({ status: 'err', message: err.message });
   }
});

router.post('/add', async (req, res) => {
   const user = await User.findById('61b8a1b9668c7872bc8b26e8');
   const itemInBag = user.itemList.find(item => item._id === req.body.item._id);
   if (itemInBag) {
      const index = user.itemList.indexOf(itemInBag);
      user.itemList[index].qty += 1;
   } else {
      const item = {
         _id: req.body.item._id,
         qty: 1,
         durability: req.body.item.durability,
      }
      user.itemList.push(item);
   }
   await user.save();
   res.status(200).send('saved');
})

router.put('/equip', async (req, res) => {
   try {
      const item = req.body.item;
      const user = await User.findById('61b8a1b9668c7872bc8b26e8');
      console.log('hi')
      const equipped = user.equipmentList.find(equipment => equipment.type === item.type);
      if (equipped) {
         //add to itemlist - remove equipped (same as unequip method, qty needs to be raised if already in the itemlist, else add with qty 1)
      }
      user.equipmentList.push({
         _id: item._id,
         durability: item.durability,
         type: item.type
      });
      //remove from itemlist
      await user.save();
      res.status(200).json({ status: 'success' });
   } catch (err) {
      res.status(500).json({ status: 'err', message: err.message })
   };
})

module.exports = router;