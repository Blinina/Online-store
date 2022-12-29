require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const router = require('./routers/routers')


const app = express();
const PRODUCT = require('./collection/products')

const PORT = 5000;
app.use(express.json())
app.use("/", router)

app.get('/express_backend', (req, res) => { 
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
  });
  app.get('/women', (req, res) => { 
    res.status(200).json(PRODUCT.PRODUCT); 
  });
  app.get('/men', (req, res) => { 
    res.status(200).json(men); 
  });

const start = async () => {
    try {
      await mongoose.connect(`mongodb+srv://blinina:blinina@cluster0.zxytsl5.mongodb.net/?retryWrites=true&w=majority`)
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()
