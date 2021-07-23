require("dotenv").config();
const express = require("express");
// let ejs = require("ejs");
const app = express();
// app.set("views", "./views");
// app.set("view engine", "ejs", "json");
const notionjs = require("./notion");
const moment = require("moment");
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  try {
    (async () => {
      var title = await notionjs.getTitle(process.env.NOTION_DB);
      var json = await notionjs.getBlock(process.env.blockID);
      // res.send("notion api working".toUpperCase());
      res.json({
        status: "notion api working".toUpperCase(),
        title: title,
        json: json,
      });
    })();
  } catch (error) {
    console.log(error);
  }
});

app.get("/add", (req, res) => {
  (async () => {
    var API = await notionjs.getAPI();
    await notionjs.addDataBlock(
      process.env.blockID,
      moment().format("MMMM Do YYYY, h:mm:ss a"),
      JSON.stringify(API)
    );
    // res.json(API);
    res.send("added");
  })();
});

app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});