const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

//middleware
app.use(express.json());
app.use(cors({
    origin: CORS_ORIGIN
}));

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

function server() {
    db();
    app.listen(PORT, () => {
        console.log('listening on port: ' + PORT);
    });
}

server();