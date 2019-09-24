const express = require("express");
const app = express();
const port = 5000;
var cors = require("cors");
app.use(cors());
app.use(express.json());

let history = [];
let mostUsed = [];

app.post("/api/history", function(req, res) {
  history = [req.body, ...history];
  res.send({});
});

app.post("/api/mostUsed", function(req, res) {
  mostUsed = req.body;
  res.send({});
});

app.get("/api/getHistory", function(req, res) {
  res.send(history);
});

app.get("/api/getMostUsed", function(req, res) {
  res.send(mostUsed);
  console.log(mostUsed);
});

app.listen(port, () => console.log(`Example app listening to port ${port}!`));
