const path = require("path");
const fs = require("fs");

exports.rankData = async function() {
  try {
    const rankData = require(path.join(__dirname, "..", "..", "..", "alice/database/rank.json"));
    return rankData;
  } catch (error) {}
}
