const express = require("express");
const router = new express.Router();
const Res = require('../common/response');
const Menu = require("../models/menu");
const commonMethods = require('../common/common-methods');

// create a new student using async await
router.post("/menu/createMenu", async(req, res) => {
    try {
        const tokenValidated = await commonMethods.validateAuthToken(req.cookies.jwt);
        if(tokenValidated) {
            const menu = new Menu(req.body);
            const result = await menu.save().
            then((data) => {
                let resJson = Res(201, "Menu created successfully...!", {data});
                res.status(201).json(resJson);
            }).
            catch((error) => {
                if(error.code === 11000) {
                    resJson = Res(400, "Menu already created...!", {error});
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
router.get("/menu/getMenus", async(req, res) => {
    try{
        const tokenValidated = await commonMethods.validateAuthToken(req.cookies.jwt);
        if(tokenValidated) {
            const menusData = await Menu.find().
            then((menusArray) => {
                if(menusArray.length > 0) {
                    let resJson = Res(200, "Menu details fetched successfully...!", {menusArray});
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
        return;
    } catch(e) {
        resJson = Res(500, "Something went wrong, please try again..", {e});
        res.status(500).json(resJson);
    }
});


// read data from db by id
router.get("/menu/getMenuById/:id", async(req, res) => {
    try{
        const tokenValidated = await commonMethods.validateAuthToken(req.cookies.jwt);
        if(tokenValidated) {
            const _id = req.params.id;
            const menuData = await Menu.findById(_id).
            then((data) => {
                let resJson = Res(200, "Menu details fetched successfully...!", {data});
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
        return;
    } catch(e) {
        resJson = Res(500, "Something went wrong, please try again..", {e});
        res.status(500).json(resJson);
    }
});

// delete data from db by id
router.delete("/menu/deleteMenu/:id", async(req, res) => {
    try{
        const tokenValidated = await commonMethods.validateAuthToken(req.cookies.jwt);
        if(tokenValidated) {
            const _id = req.params.id;
            const deleteMenu = await Menu.findByIdAndDelete(_id).
            then((data) => {
                if(data && data !== null) {
                    let resJson = Res(200, "Menu deleted successfully...!", {data});
                    res.status(200).json(resJson);
                } else {
                    resJson = Res(404, "Invalid menu id...!", {data});
                    res.status(404).json(resJson);
                }
            }).
            catch((error) => {
                if(error.name === 'CastError') {
                    resJson = Res(404, "Invalid menu id...!", {error});
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

// update data from db by id
router.patch("/menu/updateMenu/:id", async(req, res) => {
    try{
        const tokenValidated = await commonMethods.validateAuthToken(req.cookies.jwt);
        if(tokenValidated) {
            const _id = req.params.id;
            const updateMenu = await Menu.findByIdAndUpdate(_id, req.body, {
                new: true
            }).
            then((data) => {
                let resJson = Res(200, "Menu updated successfully...!", {data});
                res.status(200).json(resJson);
            }).
            catch((error) => {
                if(error.name === 'CastError') {
                    resJson = Res(404, "Invalid menu update error...!", {error});
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