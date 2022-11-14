const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/usersdb").then(() => {
    console.log("Connection is successful to database...");
}).catch((e) => {
    console.log("No Connection");
});