const path = require("path");
const fs = require("fs");

exports.addCoin = async function(name, amount) {
  try {
    const coinData = require(path.join(__dirname, "..", "..", "..", "jea/database/coin.json"));
    if (!(name in coinData)) {
      coinData[name] = amount;
      fs.writeFileSync("./jea/database/coin.json", JSON.stringify(coinData, null, 2), "utf-8");
    } else {
      coinData[name] += amount;
      fs.writeFileSync("./jea/database/coin.json", JSON.stringify(coinData, null, 2), "utf-8");
    }
  } catch (error) {}
}

exports.removeCoin = async function(name, amount) {
  try {
    const coinData = require(path.join(__dirname, "..", "..", "..", "jea/database/coin.json"));
    if (!(name in coinData)) return;
    coinData[name] -= amount;
    fs.writeFileSync("./jea/database/coin.json", JSON.stringify(coinData, null, 2), "utf-8");
  } catch (error) {}
}

exports.coinData = async function() {
  try {
    const coinData = require(path.join(__dirname, "..", "..", "..", "jea/database/coin.json"));
    return coinData;
  } catch (error) {}
}
