require('dotenv').config();
const express = require('express');
require('./db/conn');
const usersRouter = require('./routers/usersrouter');
const menusRouter = require('./routers/menusrouter');
const submenusRouter = require('./routers/submenurouter');
const cookieParser = require("cookie-parser");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(usersRouter);
app.use(menusRouter);
app.use(submenusRouter);
app.use(cors({
  origin: '*'
}));
app.use(function(req, res, next) {
    res.header ('Access-Control-Allow-Origin', '*');
    res.header ('Access-Control-Allow-Credentials', true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.listen(port, () => {
    console.log(`connection successful at ${port}`);
});