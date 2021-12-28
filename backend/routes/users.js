const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const Item = require('../models/item');
const User = require('../models/user');
const Body = require('../models/body');
/*
router.get('/', async(req,res)=>{
   const user = await User.findById('61b8a1b9668c7872bc8b26e8');
   const body = Body({
      name:'Hulla1',
      pic:'zombi1',
      price:10,
      xp:0,
      level:1,
      strength:1,
      dexterity:5,
      health:5,
      leftArm:true,
      rightArm:true,
      head:true,
      equipment:[]
   });
   body.save();
   user.bodyList.push(body);
   user.save();
   res.send('ok');
})*/
router.get('/:id', async (req, res) => {
   const user = await User.findById(req.params.id);
   res.status(200).json(user);
});

router.post('/add', async (req, res) => {
   const user = await User.findById('61b8a1b9668c7872bc8b26e8');
   const item = {...req.body.item, _id:new ObjectId()}
   user.itemList.push(item);
   await user.save();
   res.status(200).send('saved');
});

const moveFromEquipmentToItemList = (itemList, equipmentList, item) => {
   equipmentList = removeItemFromList(equipmentList, item._id);
   console.log(item);
   itemList.push(item);
}
router.put('/unequip', async (req, res) => {
   try {
      let user = await User.findById('61b8a1b9668c7872bc8b26e8');
      let minion = user.bodyList[0];
      const item = req.body.item;
      moveFromEquipmentToItemList(user.itemList, minion.equipmentList, item);

      await user.save();
      res.status(200).json({ status: 'success' });
   } catch (err) {
      res.status(500).json({ status: 'err', message: err.message });
   }
});

router.put('/equip', async (req, res) => {
   try {
      let user = await User.findById('61b8a1b9668c7872bc8b26e8');
      let minion = user.bodyList[0];
      const item = req.body.item;

      let type;
      if (item.itemtype === 'Weapon') {
         type = getTypeAndRemoveWeapon(user, minion, item);
      } else {
         removeArmor(user, minion, item);
         type = item.type;
      }
      //add the new equipment to eList
      minion.equipmentList.push({...item, type:type});

      //remove from iList
      user.itemList = removeItemFromList(user.itemList, item._id);

      await user.save();
      res.status(200).json({ status: 'success' });
   } catch (err) {
      res.status(500).json({ status: 'err', message: err.message })
   };
})

const removeArmor = (user, minion, item) => {
   const equipped = minion.equipmentList.find(equipment => equipment.type === item.type);
   if (equipped) {
      moveFromEquipmentToItemList(user.itemList, minion.equipmentList, item);
   };
}

const getTypeAndRemoveWeapon = (user, minion, item) => {
   let type;
   const weapons = minion.equipmentList.filter(equipment => equipment.type === 'leftHand' || equipment.type === 'rightHand' || equipment.type === 'twoHanded')
   if (item.type === 'twoHanded') {
      type = 'twoHanded';
      weapons.forEach(weapon => { // remove all equipped weapons, if there is any
         moveFromEquipmentToItemList(user.itemList, minion.equipmentList,weapon);
      });
   } else { //oneHanded
      switch (weapons.length) {
         case 0:
            type = 'rightHand'; // no equipped weapon, new weapon goes in the right hand
            break;
         case 1:
            type = weapons[0].type === 'rightHand' ? 'leftHand' : 'rightHand'; 
            if (weapons[0].type === 'twoHanded') {
               moveFromEquipmentToItemList(user.itemList, minion.equipmentList,weapons[0]);
            }
            break;
         case 2:
            type = 'rightHand';
            const rightWeapon = weapons.find(weapon => weapon.type === 'rightHand');
            moveFromEquipmentToItemList(user.itemList, minion.equipmentList, rightWeapon);
            break;
         default:
            console.log('something went wrong - cant have more than 2 weapons equipped');
      }
   }
   return type;
}

const removeItemFromList = (list, id) => {
   const removableItem = list.find(element =>element._id.toString() === id.toString());
   const index = list.indexOf(removableItem);
   list.splice(index, 1);
   return list;
};

module.exports = router;