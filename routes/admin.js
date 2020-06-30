const express = require('express');
const router = express.Router();
const path = require('path');

module.exports = () => {
    router.get("/", (req, res) => {
        //if has cookie 
        // res.sendFile(path.join(__dirname + '/../public/owner.html'));
        // if no cookie
        res.sendFile(path.join(__dirname + '/../public/ownerLogin.html'));

    });



    return router;
};

