const path = require("path");
const fs = require("fs");

exports.banUser = async function(user) {
  try {
    const banData = require(path.join(__dirname, "..", "..", "..", "jea/database/ban.json"));
    if (!user || banData.user.includes(user) || isNaN(user)) return false;
    banData.user.push(user);
    fs.writeFileSync("./jea/database/ban.json", JSON.stringify(banData, null, 2), "utf-8");
  } catch (error) {}
}

exports.banGroup = async function(group) {
  try {
    const banData = require(path.join(__dirname, "..", "..", "..", "jea/database/ban.json"));
    if (!group || banData.group.includes(group) || isNaN(group)) return false;
    banData.group.push(group);
    fs.writeFileSync("./jea/database/ban.json", JSON.stringify(banData, null, 2), "utf-8");
  } catch (error) {}
}

exports.banBot = async function(bot) {
  try {
    const banData = require(path.join(__dirname, "..", "..", "..", "jea/database/ban.json"));
    if (!bot || banData.bot.includes(bot) || isNaN(bot)) return false;
    banData.bot.push(bot);
    fs.writeFileSync("./jea/database/ban.json", JSON.stringify(banData, null, 2), "utf-8");
  } catch (error) {}
}

exports.removeBanUser = async function(user) {
  try {
    const banData = require(path.join(__dirname, "..", "..", "..", "jea/database/ban.json"));
    if (!user || isNaN(user)) return;
    const index = banData.user.indexOf(user);
    banData.user.splice(index, 1);
    fs.writeFileSync("./jea/database/ban.json", JSON.stringify(banData, null, 4));
  } catch (error) {}
}

exports.removeBanGroup = async function(group) {
  try {
    const banData = require(path.join(__dirname, "..", "..", "..", "jea/database/ban.json"));
    if (!group || isNaN(group)) return;
    const index = banData.group.indexOf(group);
    banData.group.splice(index, 1);
    fs.writeFileSync("./jea/database/ban.json", JSON.stringify(banData, null, 4));
  } catch (error) {}
}

exports.removeBanBot = async function(bot) {
  try {
    const banData = require(path.join(__dirname, "..", "..", "..", "jea/database/ban.json"));
    if (!bot || isNaN(bot)) return;
    const index = banData.bot.indexOf(bot);
    banData.bot.splice(index, 1);
    fs.writeFileSync("./jea/database/ban.json", JSON.stringify(banData, null, 4));
  } catch (error) {}
}

exports.banUserData = async function() {
  try {
    const banData = require(path.join(__dirname, "..", "..", "..", "jea/database/ban.json"));
    return banData.user;
  } catch (error) {}
}

exports.banGroupData = async function() {
  try {
    const banData = require(path.join(__dirname, "..", "..", "..", "jea/database/ban.json"));
    return banData.group;
  } catch (error) {}
}

exports.banBotData = async function() {
  try {
    const banData = require(path.join(__dirname, "..", "..", "..", "jea/database/ban.json"));
    return banData.bot;
  } catch (error) {}
}
