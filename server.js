require("dotenv").config();
const express = require("express");
let ejs = require("ejs");
const app = express();
app.set("views", "./views");
app.set("view engine", "ejs");
const notionjs = require("./notion");

app.get("/", (req, res) => {
  try {
    (async () => {
      var title = await notionjs.getTitle(process.env.NOTION_DB);
      var json = await notionjs.getBlock(process.env.blockID);
      res.render("index", { title: title, json: json });
    })();
  } catch (error) {
    console.log(error);
  }
});

app.get("/db", (req, res) => {
  try {
    res.send("LIST OF DB");
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT);
