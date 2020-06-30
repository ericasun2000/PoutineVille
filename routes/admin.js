const express = require('express');
const router = express.Router();
const path = require('path');

module.exports = () => {
    router.get("/", (req, res) => {
        //if has cookie 
        if (req.session.isAuthenticated) {
            res.sendFile(path.join(__dirname + '/../public/owner.html'));
        } else {
            res.sendFile(path.join(__dirname + '/../public/ownerLogin.html'));
        }

    });

    router.post("/", (req, res) => {
        // check inputed password
        if (req.body.password === "1234") {
            req.session.isAuthenticated = true;
            res.sendFile(path.join(__dirname + '/../public/owner.html'));
        } else {
            res.sendFile(path.join(__dirname + '/../public/ownerLogin.html'));
        }
    });

    router.post("/logout", (req, res) => {
        req.session = null;
        res.redirect('/admin');
    });


    return router;
};

