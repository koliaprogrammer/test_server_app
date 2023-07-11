const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();
const mongoose = require("mongoose");
const router = require('./routes/index');

app.use(express.json());
app.use('/api', router);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(port, () => console.log(`Server started on PORT = ${port}`));
    } catch (e) {
        console.log(e);
    }
};

start();