const express = require("express");
const router = new express.Router();
const Res = require('../common/response');
const commonMethods = require('../common/common-methods');
const Icon = require("../models/icons");
const { default: mongoose } = require("mongoose");

// create a new student using async await
router.post("/icon/createIcon", async(req, res) => {
    try {
        const tokenValidated = await commonMethods.validateAuthToken(req.cookies.jwt);
        if(tokenValidated) {
            const icon = new Icon(req.body);
            const result = await icon.save().
            then((data) => {
                let resJson = Res(201, "Icon created successfully...!", {data});
                res.status(201).json(resJson);
            }).
            catch((error) => {
                if(error.code === 11000) {
                    resJson = Res(400, "Icon already created...!", {error});
                    res.status(400).json(resJson);
                } else {
                    throw error;
                }
            });
            
        } else {
            resJson = Res(401, "Unautorized...!", {});
            res.status(401).json(resJson);
        }
        return;
    } catch(e) {
        resJson = Res(500, "Something went wrong, please try again..", {e});
        res.status(500).json(resJson);
    }
});

// read data from db
router.get("/icon/getIcons", async(req, res) => {
    try{
        console.log(Date.now());
        const tokenValidated = await commonMethods.validateAuthToken(req.cookies.jwt);
        if(tokenValidated) {

            /** To get menusdata from menu table */
            // console.log("req: ", req);
            const iconsData = await Icon.find().
            then((iconsArray) => {
                if(iconsArray.length > 0) {
                    let resJson = Res(200, "Icon details fetched successfully...!", {iconsArray});
                    res.status(200).json(resJson);
                } else {
                    resJson = Res(404, "No data found...!", {iconsArray});
                    res.status(404).json(resJson);
                }
            }).
            catch((error) => {
                throw error;
            });            
        } else {
            resJson = Res(401, "Unautorized...!", {});
            res.status(401).json(resJson);
        }
    } catch(e) {
        resJson = Res(500, "Something went wrong, please try again..", {e});
        res.status(500).json(resJson);
    }
});


// read data from db by id
router.get("/icon/getIconById/:id", async(req, res) => {
    try{
        const tokenValidated = await commonMethods.validateAuthToken(req.cookies.jwt);
        if(tokenValidated) {

            /** To get by id menusdata from menu table */
            const _id = req.params.id;
            const iconData = await Icon.findById(_id).
            then((data) => {
                let resJson = Res(200, "Icon details fetched successfully...!", {data});
                res.status(200).json(resJson);
            }).
            catch((error) => {
                if(error.name === 'CastError') {
                    resJson = Res(404, "Invalid icon id...!", {error});
                    res.status(404).json(resJson);
                } else {
                    throw error;
                }
            });
        } else {
            resJson = Res(401, "Unautorized...!", {});
            res.status(401).json(resJson);
        }
    } catch(e) {
        resJson = Res(500, "Something went wrong, please try again..", {e});
        res.status(500).json(resJson);
    }
});

// delete data from db by id
router.delete("/icon/deleteIcon/:id", async(req, res) => {
    try{
        const tokenValidated = await commonMethods.validateAuthToken(req.cookies.jwt);
        if(tokenValidated) {
            const _id = req.params.id;
            const deleteIcon = await Icon.findByIdAndDelete(_id).
            then((data) => {
                if(data && data !== null) {
                    let resJson = Res(200, "Icon deleted successfully...!", {data});
                    res.status(200).json(resJson);
                } else {
                    resJson = Res(404, "Invalid icon id...!", {data});
                    res.status(404).json(resJson);
                }
            }).
            catch((error) => {
                if(error.name === 'CastError') {
                    resJson = Res(404, "Invalid icon id...!", {error});
                    res.status(404).json(resJson);
                } else {
                    throw error;
                }
            });;
        } else {
            resJson = Res(401, "Unautorized...!", {});
            res.status(401).json(resJson);
        }
        return;
    } catch(e) {
        resJson = Res(500, "Something went wrong, please try again..", {e});
        res.status(500).json(resJson);
    }
});

// update data into db by id
router.patch("/icon/updateIcon/:id", async(req, res) => {
    try{
        const tokenValidated = await commonMethods.validateAuthToken(req.cookies.jwt);
        if(tokenValidated) {
            const _id = req.params.id;
            const updateMenu = await Icon.findByIdAndUpdate(_id, req.body, {
                new: true
            }).
            then((data) => {
                let resJson = Res(200, "Icon updated successfully...!", {data});
                res.status(200).json(resJson);
            }).
            catch((error) => {
                if(error.name === 'CastError') {
                    resJson = Res(404, "Invalid icon update error...!", {error});
                    res.status(404).json(resJson);
                } else {
                    throw error;
                }
            });;
        } else {
            resJson = Res(401, "Unautorized...!", {});
            res.status(401).json(resJson);
        }
        return;
    } catch(e) {
        resJson = Res(500, "Something went wrong, please try again..", {e});
        res.status(500).json(resJson);
    }
});

module.exports = router;