const mongoose = require("mongoose");

const iconsSchema = new mongoose.Schema({
    iconName: {
        type: String,
        required: true,
        unique: true
    },
    iconCode: {
        type: String,
        required: true,
        unique: true
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

iconsSchema.pre("save", async function(next) {
    next();
});


// We will create a new collection

const Icons = new mongoose.model('Icons', iconsSchema);
module.exports = Icons;
