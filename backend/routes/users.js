const express = require('express');
const router = express.Router();

const Item = require('../models/item');
const User = require('../models/user');

router.get('/:id', async (req, res) => {
   const user = await User.findById(req.params.id);
   res.status(200).json(user);
});
router.post('/add', async (req, res) => {
   const user = await User.findById('61b8a1b9668c7872bc8b26e8');
   user.itemList =  addItemToList(user.itemList,req.body.item._id,req.body.item.durability);
   await user.save();
   res.status(200).send('saved');
});

router.put('/unequip', async (req, res) => {
   try {
      const user = await User.findById('61b8a1b9668c7872bc8b26e8');
      const item = req.body.item;

      user.equipmentList=removeItemFromList(user.equipmentList,item._id);
      user.itemList = addItemToList(user.itemList,item._id,item.durability);

      await user.save();
      res.status(200).json({ status: 'success' });
   } catch (err) {
      res.status(500).json({ status: 'err', message: err.message });
   }
});

router.put('/equip', async (req, res) => {
   try {
      const user = await User.findById('61b8a1b9668c7872bc8b26e8');
      const item = req.body.item;
      const equipped = user.equipmentList.find(equipment => equipment.type === item.type);
      //remove already equipped from equipmentList
      if (equipped) {
         user.equipmentList = removeItemFromList(user.equipmentList, item._id);
         user.itemList = addItemToList(user.itemList, item._id, item.durability)
      }

      //add the new equipment
      user.equipmentList.push({
         _id: item._id,
         durability: item.durability,
         type: item.type
      });

      user.itemList= removeItemFromList(user.itemList,item._id);
    
      await user.save();
      res.status(200).json({ status: 'success' });
   } catch (err) {
      res.status(500).json({ status: 'err', message: err.message })
   };
})

const removeItemFromList = (list,id)=>{
   const removableItem = list.find(element=>element._id === id);
   const index = list.indexOf(removableItem);
   return list.splice(index,1);
};

//qty needs to be raised if already in the list, else add with qty 1
const addItemToList = (list, id, durability)=>{
   const itemAlreadyInList = list.find(item => item._id ===id);
   if (itemAlreadyInList) {
      const index = list.indexOf(itemAlreadyInList);
      list[index].qty += 1;
   } else {
      const item = {
         _id:id,
         qty: 1,
         durability: durability,
      }
      list.push(item);
   }
   return list;
}

module.exports = router;