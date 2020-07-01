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
    res.status("200").json(data[shoe]);

    
});

router.post("/:shoe", (req, res) => {
    readComments();
    let shoe = req.params.shoe;
    let hasUser = false;
    if (req.params.user) {
        hasUser = true;
    }
    if (hasUser) {
        data[shoe][req.param.user].push({ username: req.body.username, content: req.body.content });
    } else {
        data[shoe].push({
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
module.exports = router;