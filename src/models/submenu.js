const mongoose = require("mongoose");

const submenuSchema = new mongoose.Schema({
    submenuName: {
        type: String,
        required: true,
        unique: true
    },
    submenuRoute: {
        type: String,
        required: true,
        unique: true
    },
    submenuIcon: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true
    }
});

submenuSchema.pre("save", async function(next) {
    next();
});


// We will create a new collection

const Submenu = new mongoose.model('Submenu', submenuSchema);
module.exports = Submenu;
