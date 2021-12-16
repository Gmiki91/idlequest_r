const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app  = express();

const users = require('./routes/users');
const bodies = require('./routes/bodies');
const items = require('./routes/items');
const port = 3030;

mongoose.connect(
    "mongodb+srv://miki:ym44lbXwDms6T62K@cluster0.hakyf.mongodb.net/idlequest?retryWrites=true&w=majority",
    {useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    console.log("connected to database!");
}).catch((err)=>{
    console.log("connection to database failed" + err); 
});

app.use(cors());
app.use(express.json());
app.use('/api/users', users);
app.use('/api/bodies', bodies);
app.use('/api/items', items);

app.listen(port,()=>console.log(`NodeJS server is listening on port ${port}`));
