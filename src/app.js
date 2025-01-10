require('dotenv').config();
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(process.env.PORT, () => console.log(`Listening to port ${process.env.PORT}...`));