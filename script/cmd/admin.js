const fs = require("fs");

module.exports = {
  jea: {
    name: "admin",
    prefix: true,
    permission: "anyone",
    cooldown: 5,
    category: "admin",
    description: "Admin",
    usages: "[add/list/remove]",
    author: "Deku"
  },

  initialize: async function({ api, event, args, send, usages, prefix }) {
    let config = process.cwd() + "/config.json";
    let data = JSON.parse(fs.readFileSync(config));
    let as = global.jea.operator; // Change this to an array

    let t1 = args[0],
      t2 = args[1];

    function getUserInfo(userId) {
      return new Promise((resolve, reject) => {
        api.getUserInfo(userId, (err, ret) => {
          if (err) reject(err);
          else resolve(ret);
        });
      });
    }

    let mentions = Object.keys(event.mentions);
    (mentions.length === 0 && /^[0-9]+$/.test(t2)) ? mentions[0] = t2 : (event.type == "message_reply") ? mentions[0] = event.messageReply.senderID : "";

    if (t1 === "list") {
      if (data.admin.length === 0) {
        send("There's no admin to display.");
        return;
      }
      let ms = "",
        msg = "";

      for (let i of data.admin) {
        try {
          const userInfo = await getUserInfo(i);
          const name = userInfo[i].name;
          ms += "⦿ " + name + "\nhttps://facebook.com/" + i + "\n\n";
        } catch (err) {
          console.error("Error fetching user info:", err);
        }
      }

      msg += "List of System Admin\n\n" + ms;
      send(msg);
      return;
    }

    if (t1 === "add" || t1 === "-a" || t1 === "a") {
      if (!as.includes(event.senderID)) {
        send("You don't have permission to this command. Only Operator can use this method.");
        return;
      }
      let id = parseInt(mentions[0]);
      if (isNaN(id)) {
        send("⚠️ The uid is invalid.");
        return;
      }
      data.admin.push(id.toString());
      fs.writeFileSync(config, JSON.stringify(data, null, 2));
      send("Admin added successfully.");
      return;
    }

    if (t1 === "remove" || t1 === "-r" || t1 === "r") {
      if (!as.includes(event.senderID)) {
        send("You don't have permission to this command. Only Operator can use this method.");
        return;
      }
      if (data.admin.length === 0) {
        send("There's no admin to remove.");
        return;
      }
      let ids = parseInt(mentions[0]);
      if (isNaN(ids)) {
        send("⚠️ The uid is invalid.");
        return;
      }
      data.admin = data.admin.filter(a => a !== ids.toString());
      fs.writeFileSync(config, JSON.stringify(data, null, 2));
      send("Admin removed successfully.");
      return;
    }

    if (args.length === 0) return usages(prefix, event)
  }
};
