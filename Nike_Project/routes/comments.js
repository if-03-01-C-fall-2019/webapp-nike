const fs = require('fs');

const express = require('express');

const { OK, CREATED, NO_CONTENT, BAD_REQUEST, NOT_FOUND } = require('http-status-codes');

const router = express.Router();
let data;

function readComments() {
    let temp = fs.readFileSync("js/reviews.json", { encoding: "utf8" }, (err) => {
        if (err) throw err;
    });

    data = JSON.parse(temp);
}

router.get("/:shoe", (req, res) => {
    readComments();
    let shoe = req.params.shoe;
    res.status(ok).json(data.shoe);
});

router.post("/", (req, res) => {
    readComments();
    let shoe = req.query.shoe;
    let hasUser = false;
    if (req.query.user) {
        hasUser = true;
    }
    if (hasUser) {
        data.shoe[req.query.user].push({ username: req.body.username, content: req.body.content });
    } else {
        data.shoe.push({
            username: req.body.username,
            rating: req.body.rating,
            content: req.body.content,
            comments: []
        });
    }

    fs.writeFileSync("js/reviews.json", JSON.stringify(data), (err) => {
        if (err) throw err;
    });
})