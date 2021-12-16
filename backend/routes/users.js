const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/:id', async(req,res)=>{

   const user = await User.findById(req.params.id);
   res.status(200).json(user);
});

module.exports = router;