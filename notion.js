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

async function retrieveDB(id) {
  const databaseId = id;
  const response = await notion.databases.retrieve({
    database_id: databaseId,
  });
  return response;
}

async function queryDB(id, prop, filter) {
  const response = await notion.databases.query({
    database_id: id,
    filter: {
      property: prop,
      text: {
        contains: filter,
      },
    },
  });
  let l = response.results.length;
  return { data: response.results };
}

async function dynamicNotion(blockID, time, data) {
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
                content: time,
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
                content: data,
              },
            },
          ],
        },
      },
    ],
  });
  console.log(response);
}

async function getIP() {
  var axios = require("axios");

  try {
    const response = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.API}`
    );
    var json = {
      IP: response.ip,
      continent: response.continent_code,
      country: response.country_name,
      city: response.city,
      coords: `${response.latitude} & ${response.longitude}`,
      isporg: `${response.isp} & ${response.organization}`,
      time: response.current_time,
    };
    return json;
  } catch (error) {
    console.log("error");
    return "error";
  }
}

async function getBlocks(url) {
  const getblock = await notion.blocks.children.list({
    block_id: url,
    page_size: 50,
  });

  return getblock;
}

async function universalBlocks(tkn, url) {
  const TKNnotion = new Client({ auth: tkn });
  const getblock = await TKNnotion.blocks.children.list({
    block_id: url,
    page_size: 50,
  });

  return getblock;
}

module.exports = {
  getBlock,
  getTitle,
  addDataBlock,
  getIP,
  getBlocks,
  universalBlocks,
  dynamicNotion,
  retrieveDB,
  queryDB,
};
