require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const app = express();

const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.TOKEN });

app.get("/", (req, res) => {
  try {
    (async () => {
      const databaseId = "94209317cd464cb3a63895c79d2234e1";
      const response = await notion.databases.query({
        database_id: databaseId,
        // filter: {
        //   or: [
        //     {
        //       property: "In stock",
        //       checkbox: {
        //         equals: true,
        //       },
        //     },
        //     {
        //       property: "Cost of next trip",
        //       number: {
        //         greater_than_or_equal_to: 2,
        //       },
        //     },
        //   ],
        // },
        // sorts: [
        //   {
        //     property: "Last ordered",
        //     direction: "ascending",
        //   },
        // ],
      });
      console.log(response);
      res.json(response);
    })();
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT);
