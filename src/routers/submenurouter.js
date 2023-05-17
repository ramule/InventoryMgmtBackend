const express = require("express");
const router = new express.Router();
const Res = require('../common/response');
const commonMethods = require('../common/common-methods');
const Submenu = require("../models/submenu");
const { default: mongoose } = require("mongoose");

// create a new student using async await
router.post("/submenu/createSubmenu", async(req, res) => {
    try {
        const tokenValidated = await commonMethods.validateAuthToken(req.cookies.jwt);
        if(tokenValidated) {
            const submenu = new Submenu(req.body);
            const result = await submenu.save().
            then((data) => {
                let resJson = Res(201, "Submenu created successfully...!", {data});
                res.status(201).json(resJson);
            }).
            catch((error) => {
                if(error.code === 11000) {
                    resJson = Res(400, "Submenu already created...!", {error});
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
router.get("/submenu/getSubmenus", async(req, res) => {
    try{
        const tokenValidated = await commonMethods.validateAuthToken(req.cookies.jwt);
        if(tokenValidated) {

            /** To get menusdata from menu table */
            // console.log("req: ", req);
            const submenusData = await Submenu.find().
            then((menusArray) => {
                if(menusArray.length > 0) {
                    let resJson = Res(200, "Submenu details fetched successfully...!", {menusArray});
                    res.status(200).json(resJson);
                } else {
                    resJson = Res(404, "No data found...!", {menusArray});
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
router.get("/submenu/getSubmenuById/:id", async(req, res) => {
    try{
        const tokenValidated = await commonMethods.validateAuthToken(req.cookies.jwt);
        if(tokenValidated) {

            /** To get by id menusdata from menu table */
            const _id = req.params.id;
            const menuData = await Submenu.findById(_id).
            then((data) => {
                let resJson = Res(200, "Submenu details fetched successfully...!", {data});
                res.status(200).json(resJson);
            }).
            catch((error) => {
                if(error.name === 'CastError') {
                    resJson = Res(404, "Invalid menu id...!", {error});
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
router.delete("/submenu/deleteSubmenu/:id", async(req, res) => {
    try{
        const tokenValidated = await commonMethods.validateAuthToken(req.cookies.jwt);
        if(tokenValidated) {
            const _id = req.params.id;
            const deleteMenu = await Submenu.findByIdAndDelete(_id).
            then((data) => {
                if(data && data !== null) {
                    let resJson = Res(200, "Submenu deleted successfully...!", {data});
                    res.status(200).json(resJson);
                } else {
                    resJson = Res(404, "Invalid submenu id...!", {data});
                    res.status(404).json(resJson);
                }
            }).
            catch((error) => {
                if(error.name === 'CastError') {
                    resJson = Res(404, "Invalid submenu id...!", {error});
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
router.patch("/submenu/updateSubmenu/:id", async(req, res) => {
    try{
        const tokenValidated = await commonMethods.validateAuthToken(req.cookies.jwt);
        if(tokenValidated) {
            const _id = req.params.id;
            const updateMenu = await Submenu.findByIdAndUpdate(_id, req.body, {
                new: true
            }).
            then((data) => {
                let resJson = Res(200, "Submenu updated successfully...!", {data});
                res.status(200).json(resJson);
            }).
            catch((error) => {
                if(error.name === 'CastError') {
                    resJson = Res(404, "Invalid submenu update error...!", {error});
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