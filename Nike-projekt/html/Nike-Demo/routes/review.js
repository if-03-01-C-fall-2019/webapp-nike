const fs = require('fs');

const express = require('express');

const { OK, CREATED, NO_CONTENT, BAD_REQUEST, NOT_FOUND } = require('http-status-codes');

const router = express.Router();
let data;

function readLogins() {
    let temp = fs.readFileSync("js/login.json", { encoding: "utf8" }, (err) => {
        if (err) throw err;
    });

    data = JSON.parse(temp);
}


router.get("/", (req, res) => {
    readLogins();
    res.status(OK).json(data);
});

router.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;


    readLogins();

    data.push({ username: username, password: password });

    fs.writeFileSync("js/login.json", JSON.stringify(data), (err) => {
        if (err) throw err;
    })

    res.status(OK).json({ username: username, password: password });
});
module.exports = router;