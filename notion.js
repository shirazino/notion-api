const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.TOKEN });

async function getBlock(blockID) {
  const response = await notion.blocks.children.list({
    block_id: blockID,
    page_size: 50,
  });
  console.log(response);
  return response;
}

async function getTitle(id) {
  const response = await notion.databases.query({
    database_id: id,
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
  console.log(" here ", response);
  return response;
}

module.exports = { getBlock, getTitle };
