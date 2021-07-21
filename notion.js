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
  });
  console.log(" TITLE ", response);
  return response;
}

async function addDataBlock(blockID, data, content) {
  const response = await notion.blocks.children.append({
    block_id: blockID,
    children: [
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          text: [
            {
              type: "text",
              text: {
                content: data,
              },
            },
          ],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          text: [
            {
              type: "text",
              text: {
                content: content,
              },
            },
          ],
        },
      },
    ],
  });
  console.log(response);
}

async function getAPI() {
  var axios = require("axios");

  try {
    const response = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.API}`
    );
    return response.data;
  } catch (error) {
    console.log("error");
    return "error";
  }
}

module.exports = { getBlock, getTitle, addDataBlock, getAPI };
