const express = require("express");
const router = new express.Router();
const Res = require('../common/response');
const Menu = require("../models/menu");
const commonMethods = require('../common/common-methods');

// create a new student using async await
router.post("/menu/createMenu", async(req, res) => {
    try {
        const menu = new Menu(req.body);
        const result = await menu.save();
        const tokenValidated = await commonMethods.validateAuthToken(req.cookies.jwt);
        if(tokenValidated) {
            let resJson = Res(201, "Menu created successfully...!", {});
            res.status(201).json(resJson);
        } else {
            resJson = Res(401, "Unautorized...!", {});
            res.status(401).json(resJson);
        }
        return;
    } catch(e) {
        resJson = Res(500, "Something went wrong, please try again..", {});
        res.status(500).json(resJson);
    }
});

// read data from db
router.get("/menu/getMenus", async(req, res) => {
    try{
        const menusData = await Menu.find();
        const tokenValidated = await commonMethods.validateAuthToken(req.cookies.jwt);
        if(tokenValidated) {
            if(menusData) {
                let resJson = Res(200, "Menu details fetched successfully...!", {menusData});
                res.status(200).json(resJson);
            } else {
                resJson = Res(404, "No data found...!", {menusData});
                res.status(404).json(resJson);
            }
        } else {
            resJson = Res(401, "Unautorized...!", {});
            res.status(401).json(resJson);
        }
        return;
    } catch(e) {
        resJson = Res(500, "Something went wrong, please try again..", {});
        res.status(500).json(resJson);
    }
});


// read data from db by id
router.get("/menu/getMenuById/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const menuData = await Menu.findById(_id);
        const tokenValidated = await commonMethods.validateAuthToken(req.cookies.jwt);
        if(tokenValidated) {
            if(menuData) {
                let resJson = Res(200, "Menu details fetched successfully...!", {menuData});
                res.status(200).json(resJson);
            } else {
                resJson = Res(404, "No data found...!", {menuData});
                res.status(404).json(resJson);
            }
        } else {
            resJson = Res(401, "Unautorized...!", {});
            res.status(401).json(resJson);
        }
        return;
    } catch(e) {
        resJson = Res(500, "Something went wrong, please try again..", {});
        res.status(500).json(resJson);
    }
});

// delete data from db by id
router.delete("/menu/deleteMenu/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const deleteMenu = await Menu.findByIdAndDelete(_id);
        const tokenValidated = await commonMethods.validateAuthToken(req.cookies.jwt);
        if(tokenValidated) {
            let resJson = Res(200, "Menu deleted successfully...!", {});
            res.status(200).json(resJson);
        } else {
            resJson = Res(401, "Unautorized...!", {});
            res.status(401).json(resJson);
        }
        return;
    } catch(e) {
        resJson = Res(500, "Something went wrong, please try again..", {});
        res.status(500).json(resJson);
    }
});

// update data from db by id
router.patch("/menu/updateMenu/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const updateMenu = await Menu.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        const tokenValidated = await commonMethods.validateAuthToken(req.cookies.jwt);
        if(tokenValidated) {
            let resJson = Res(200, "Menu updated successfully...!", {updateMenu});
            res.status(200).json(resJson);
        } else {
            resJson = Res(401, "Unautorized...!", {});
            res.status(401).json(resJson);
        }
        return;
    } catch(e) {
        resJson = Res(500, "Something went wrong, please try again..", {});
        res.status(500).json(resJson);
    }
});

module.exports = router;