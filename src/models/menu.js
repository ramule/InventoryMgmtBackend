const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    menuName: {
        type: String,
        required: true,
        unique: true
    },
    menuRoute: {
        type: String,
        required: true,
        unique: true
    },
    menuIcon: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        required: true
    },
    updatedOn: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

menuSchema.pre("save", async function(next) {
    next();
});


// We will create a new collection

const Menu = new mongoose.model('Menu', menuSchema);
module.exports = Menu;
