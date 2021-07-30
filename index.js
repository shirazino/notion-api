require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const puppeteer = require("./puppeteer");

app.use(cors());
app.use(express.json());

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
    var IP = await notionjs.getIP();
    await notionjs.addDataBlock(
      process.env.blockID,
      `🎯 ${moment().add(1, "H").format("MMMM Do YYYY, h:mm:ss a")}`,
      JSON.stringify(IP)
    );
    // res.json(IP);
    res.send("added");
  })();
});

app.post("/data", (req, res) => {
  (async () => {
    try {
      await notionjs.addDataBlock(
        process.env.blockID,
        req.body.time,
        req.body.IP
      );
      res.send(`Data added to Notion at ${req.body.time}`);
    } catch (error) {
      res.send(error);
    }
  })();
});

app.get("/fetchdata", (req, res) => {
  (async () => {
    try {
      res.send(await puppeteer.getScraping("https://masjidenoor.com/"));
    } catch (error) {
      console.log("error");
    }
  })();
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`.toUpperCase());
});
