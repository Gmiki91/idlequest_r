const express = require('express');
const router = express.Router();

const Body = require('../models/body');

router.get('/:id', async (req, res)=>{
    const body = await Body.findById(req.params.id);
   res.status(200).json(body);
   
})

module.exports = router;