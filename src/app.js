require('dotenv').config();
const express = require('express');
require('./db/conn');
const usersRouter = require('./routers/usersrouter');
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(usersRouter);

app.listen(port, () => {
    console.log(`connection successful at ${port}`);
});