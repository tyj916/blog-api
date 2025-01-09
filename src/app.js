require('dotenv').config();
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/posts', routes.post);
app.use('/users', routes.user);
app.use('/posts/:postId/comments', routes.comment);

app.listen(process.env.PORT, () => console.log(`Listening to port ${process.env.PORT}...`));