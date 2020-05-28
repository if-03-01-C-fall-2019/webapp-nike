const express = require('express');

const reviewRouter = require("./routes/review");
const commentsRouter = require("./routes/comments");


const port = 3000;

const app = express();

app.use(express.static('./'));
app.use(express.json());

app.use("/api/review", reviewRouter);
app.use("/api/comments", commentsRouter);


app.listen(port, () => {
    console.log(`Server listening on port ${3000}`);
});