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
   user.itemList = addItemToList(user.itemList, req.body.item._id, req.body.item.durability);
   await user.save();
   res.status(200).send('saved');
});
const updatedUserLists = (user, item) => {
   user.equipmentList = removeItemFromList(user.equipmentList, item._id);
   user.itemList = addItemToList(user.itemList, item._id, item.durability);
   return user;
}
router.put('/unequip', async (req, res) => {
   try {
      let user = await User.findById('61b8a1b9668c7872bc8b26e8');
      const item = req.body.item;

      user = updatedUserLists(user, item);

      await user.save();
      res.status(200).json({ status: 'success' });
   } catch (err) {
      res.status(500).json({ status: 'err', message: err.message });
   }
});

router.put('/equip', async (req, res) => {
   try {
      let user = await User.findById('61b8a1b9668c7872bc8b26e8');
      const item = req.body.item;

      let type;
      if (item.itemtype === 'Weapon') {
         type = removeEquippedWeapon(user, item);
      } else {
         type = removeEquippedArmor(user, item)
      }

      //add the new equipment to eList
      user.equipmentList.push({
         _id: item._id,
         durability: item.durability,
         type: type
      });

      //remove from iList
      user.itemList = removeItemFromList(user.itemList, item._id);

      await user.save();
      res.status(200).json({ status: 'success' });
   } catch (err) {
      res.status(500).json({ status: 'err', message: err.message })
   };
})

const removeEquippedArmor = (user, item) => {
   const equipped = user.equipmentList.find(equipment => equipment.type === item.type);
   if (equipped) {
      user = updatedUserLists(user, item);
   };
   return item.type;
}

const removeEquippedWeapon = (user, item) => {
   let type;
   const weapons = user.equipmentList.filter(equipment => equipment.type === 'leftHand' || equipment.type === 'rightHand' || equipment.type === 'bothHands')
   if (item.type === 'twoHanded') {
      type = 'bothHands';
      weapons.forEach(weapon => {
         user = updatedUserLists(user, weapon);
      });
   } else { //oneHanded
      switch (weapons.length) {
         case 0:
            type = 'rightHand';
            break;
         case 1:
            type = weapons[0].type === 'rightHand' ? 'leftHand' : 'rightHand';
            if (weapons[0].type === 'bothHands') {
               user = updatedUserLists(user, weapons[0]);
            }
            break;
         case 2:
            type = 'rightHand';
            const rightWeapon = weapons.find(weapon => weapon.type === 'rightHand');
            user = updatedUserLists(user, rightWeapon);
            break;
         default:
            console.log('something went wrong');
      }
   }
   return type;
}

const removeItemFromList = (list, id) => {
   const removableItem = list.find(element => element._id === id);
   const index = list.indexOf(removableItem);
   if (removableItem.qty > 1) {
      list[index].qty -= 1;
      return list;
   }
   list.splice(index, 1);
   return list;
};

//qty needs to be raised if already in the list, else add with qty 1
const addItemToList = (list, id, durability) => {
   const itemAlreadyInList = list.find(item => item._id === id);
   if (itemAlreadyInList) {
      const index = list.indexOf(itemAlreadyInList);
      list[index].qty += 1;
   } else {
      const item = {
         _id: id,
         qty: 1,
         durability: durability,
      }
      list.push(item);
   }
   return list;
}

module.exports = router;