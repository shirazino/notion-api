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
      res.json({
        status: "notion api working".toUpperCase(),
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

app.post("/dynamicpost", (req, res) => {
  (async () => {
    try {
      await notionjs.dynamicNotion(
        req.body.blockID,
        req.body.time,
        req.body.data
      );
      res.send(`Data successfully sent - ${res.statusCode}`);
    } catch (error) {
      res.send(`Something went wrong - ${res.statusCode} : ${error}`);
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

app.get("/getblock/:blockID", (req, res) => {
  (async () => {
    try {
      const block = req.params.blockID;
      res.json(await notionjs.getBlocks(block));
    } catch (error) {
      res.json(error);
    }
  })();
});

app.get("/integration/:tkn/:block", (req, res) => {
  (async () => {
    try {
      const tkn = req.params.tkn;
      const block = req.params.block;
      // res.send(`${tkn}, ${block}`);
      res.json(await notionjs.universalBlocks(tkn, block));
    } catch (error) {
      res.json(error);
    }
  })();
});

app.post("/retrievedb", (req, res) => {
  (async () => {
    try {
      let body = req.body;
      res.json(await notionjs.retrieveDB(body.id));
    } catch (error) {
      res.json(error);
    }
  })();
});

app.post("/querydb", (req, res) => {
  (async () => {
    try {
      let body = req.body;
      res.json(await notionjs.queryDB(body.id, body.prop, body.filter));
    } catch (error) {
      res.json(error);
    }
  })();
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`.toUpperCase());
});
