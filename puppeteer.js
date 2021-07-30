async function getScraping(url) {
  const pupp = require("puppeteer");
  const browser = await pupp.launch();

  const page = await browser.newPage();
  await page.goto(url);

  var result = await page.evaluate(() => {
    var x = document.querySelectorAll("tr");
    var list = [...x];
    return list.map((x) => x.innerText);
  });
  await browser.close();

  var clean = cleanup(result);
  return JSONfy(clean);
}
module.exports = { getScraping };

function cleanup(arr) {
  arr.splice(0, 5);

  var filtered = [];
  filtered = arr.filter((x) => {
    return x != "";
  });
  return filtered;
}

function JSONfy(c) {
  var jsonfy = {
    Fajr: [{ today: c[0].slice(11, 16) }, { tomorrow: c[0].slice(23, 28) }],
    Zuhr: [{ today: c[1].slice(11, 16) }, { tomorrow: c[1].slice(23, 28) }],
    Asr: [{ today: c[2].slice(10, 15) }, { tomorrow: c[2].slice(22, 27) }],
    Maghreeb: [{ today: c[3].slice(14, 19) }, { tomorrow: c[3].slice(26, 31) }],
    Ishaa: [{ today: c[4].slice(11, 16) }, { tomorrow: c[4].slice(23, 28) }],
  };
  // console.log("jsonfy LOG     ", jsonfy);
  return jsonfy;
}
