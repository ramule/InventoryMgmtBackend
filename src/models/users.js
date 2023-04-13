const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email id already present'],
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    mobileNo: {
        type: Number,
        min: 10,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    refreshTokens: [{
        refreshtoken: {
            type: String,
            required: true
        }
    }]
});

// generating token
usersSchema.methods.generateAuthToken = async function() {
    try {
        const tokenObj = {
            "token": "",
            "refreshToken": ""
        }
        const token = jwt.sign({_id: this._id.toString()}, process.env.SECRET_KEY);
        const refreshToken = jwt.sign({_id: this._id.toString()}, process.env.REFRESH_TOKEN_SECRET_KEY);

        tokenObj.token = token;
        tokenObj.refreshToken = refreshToken;
        this.tokens = [];
        this.refreshTokens = [];
        this.tokens = this.tokens.concat({token: tokenObj.token});
        this.refreshTokens = this.refreshTokens.concat({refreshtoken: tokenObj.refreshToken});
        await this.save();
        return tokenObj;
    } catch(e) {
        console.log("Error: ", e);
    }
}

// refreshing auth token
usersSchema.methods.refreshAuthToken = async function(refreshtoken) {
    try {
        const tokenObj = {
            "token": "",
            "refreshToken": ""
        }
        const token = jwt.sign({_id: this._id.toString()}, process.env.SECRET_KEY);
        this.tokens = [];
        this.refreshTokens = [];
        tokenObj.token = token;
        this.tokens = this.tokens.concat({token: tokenObj.token});
        this.refreshTokens = this.refreshTokens.concat({refreshtoken: refreshtoken});
        await this.save();
        return tokenObj;
    } catch(e) {
        console.log("Error: ", e);
    }
}

// converting password into hash
usersSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`the current password is ${this.password}`);
    }
    next();
});


// We will create a new collection

const User = new mongoose.model('User', usersSchema);
module.exports = User;