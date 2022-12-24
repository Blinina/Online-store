require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const sequelize = require('./db');
const models = require('./models/models');

const PORT = process.env.PORT || 5000

app.use(express.static(path.resolve(__dirname, 'my-app')))

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()
