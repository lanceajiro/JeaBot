try {
 const fs = require("fs");
 const path = require("path");
 const { banUser, banGroup, banBot, removeBanUser, removeBanGroup, removeBanBot, banUserData, banGroupData, banBotData } = require(path.join(__dirname, "..", "database/lancelucas/ban.js"));
  const { addCoin, removeCoin, coinData } = require(path.join(__dirname, "..", "database/lancelucas/coin.js"));
  const { rankData } = require(path.join(__dirname, "..", "database/lancelucas/rank.js"));

 module.exports = {
   banUser,
   banGroup,
   banBot,
   removeBanUser,
   removeBanGroup,
   removeBanBot,
   banUserData,
   banGroupData,
   banBotData,
   addCoin,
   removeCoin,
   coinData,
   rankData
 }
} catch (error) { console.log(error); }
