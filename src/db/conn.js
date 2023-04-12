const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/usersdb").then(() => {
    console.log("Connection is successful to database...");
}).catch((e) => {
    console.log("error: ", e);
    console.log("No Connection");
});