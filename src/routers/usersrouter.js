const express = require("express");
const User = require("../models/users");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const Res = require('../common/response');
const commonMethods = require('../common/common-methods');

// Register a new user in db

router.post("/user/register", async(req, res) => {
    try {

        const password = req.body.password;
        const registerUser = new User({
            name: req.body.name,
            email: req.body.email,
            mobileNo: req.body.mobileNo,
            password: password
        });

        const registered = await registerUser.save();
        let resJson = Res(201, "User created successfully...!", {});
        res.status(201).json(resJson);
        return;
    }
    catch(e) {
        resJson = Res(500, "Something went wrong, please try again..", {});
        res.status(500).json(resJson);
    }
});

// user login

router.post("/user/login", async(req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({email: email});

        const isMatch = await bcrypt.compare(password, userData.password);

        const tokenObj = await userData.generateAuthToken();
        res.setHeader('X-Token', tokenObj.token);
        res.setHeader('refresh-Token', tokenObj.refreshToken);
        res.cookie('jwt', tokenObj.token, {
            expires: new Date(Date.now() + 200000),
            httpOnly: true,
            // secure: true /* this will work in https */
        });

        if(isMatch) {
            let resJson = Res(200, "Login successful...!", {});
            res.status(200).json(resJson);
        }
        else {
            resJson = Res(404, "Invalid credentials", {});
            res.status(404).json(resJson);
        }
    }
    catch(error) {
        resJson = Res(500, "Something went wrong, please try again", error);
        res.status(500).json(resJson);
    }
});

router.post('/user/logout', async(req, res) => {

    try {
        const email = req.body.email;
        const userData = await User.findOne({email: email});
        const tokenValidated = await commonMethods.validateAuthToken(req.cookies.jwt);
        if(tokenValidated) {
            if(userData) {
                res.clearCookie("jwt");
                res.clearCookie("refreshtoken");
                res.removeHeader('X-Token');
                res.removeHeader('refresh-Token');
                resJson = Res(200, "User logged out successfully", {});
                res.status(200).json(resJson);
            } else {
                resJson = Res(404, "Users not found", {});
                res.status(404).json(resJson);
            }
        } else {
            resJson = Res(401, "Unautorized...!", {});
            res.status(401).json(resJson);
        }

    } catch(error) {
        resJson = Res(500, "Something went wrong", {});
        res.status(500).json(resJson);
    }
});

router.post('/user/refresh-token', async(req, res) => {
    console.log("request body: ", req.body);
    try {
        const email = req.body.email;
        // const password = req.body.password;
        const refreshtoken = req.body.refreshtoken;
        const userData = await User.findOne({email: email});
        let isRefreshtokenMatched = userData.refreshTokens.some( x => JSON.stringify(x.refreshtoken) === JSON.stringify(refreshtoken));
        // const isMatch = await (bcrypt.compare(password, userData.password) && isRefreshtokenMatched);
        if(isRefreshtokenMatched) {
            const tokenObj = await userData.refreshAuthToken(refreshtoken);
            console.log("tokenObj from refre-token: ", tokenObj);
            res.setHeader('X-Token', tokenObj.token);
            res.cookie('jwt', tokenObj.token, {
                expires: new Date(Date.now() + 200000),
                httpOnly: true,
                // secure: true /* this will work in https */
            });
            resJson = Res(200, "Refresh token created successfully", {});
            res.status(200).json(resJson);
        } else {
            resJson = Res(400, "Token does not match", {});
            res.status(400).json(resJson);
        }
    } catch(e) {
        resJson = Res(500, "Something went wrong, please try again..", {});
        res.status(500).json(resJson);
    }
});

// read data from db
router.get("/user/getUsers", async(req, res) => {
    try {
        const usersData = await User.find();
        console.log("jwt from cookie: ", req.cookies.jwt);
        const tokenValidated = await commonMethods.validateAuthToken(req.cookies.jwt);
        if(tokenValidated) {
            if(usersData) {
                let resJson = Res(200, "User details fetched successfully!", {usersData});
                res.status(200).json(resJson);
            } else {
                resJson = Res(404, "Users not found", {});
                res.status(404).json(resJson);
            }
        } else {
            resJson = Res(401, "Unautorized...!", {});
            res.status(401).json(resJson);
        }
    } catch(e) {
        resJson = Res(401, "Unautorized...!", {});
        res.status(401).json(resJson);
    }
});

// router.get("/user/secret", (req, res) => {
//     console.log("your cookie is: ", req.cookies.jwt);
// });

module.exports = router;
