const fs = require("fs");

module.exports = {
  jea: {
    name: "vip",
    prefix: true,
    permission: "anyone",
    cooldown: 5, 
    description: "vip",
    category: "vip",
    usages: ["[add/list/remove]"],
    author: "Deku/Shinpei"
  },

  initialize: async function({ api, event, args, send }) {
    const config = process.cwd() + "/config.json";
    const data = JSON.parse(fs.readFileSync(config));
    const operators = global.jea.operator; // Change this to an array

    const t1 = args[0];
    const t2 = args[1];

    function getUserInfo(userId) {
      return new Promise((resolve, reject) => {
        api.getUserInfo(userId, (err, ret) => {
          if (err) reject(err);
          else resolve(ret);
        });
      });
    }

    let mentions = Object.keys(event.mentions);
    if (mentions.length === 0 && /^[0-9]+$/.test(t2)) {
      mentions[0] = t2;
    } else if (event.type === "message_reply") {
      mentions[0] = event.messageReply.senderID;
    }

    if (t1 === "list") {
      if (data.vip.length === 0) return send("There's no vip to display.");
      let ms = "";
      let msg = "";

      for (const i of data.vip) {
        try {
          const userInfo = await getUserInfo(i);
          const name = userInfo[i].name;
          ms += "⦿ " + name + "\nhttps://facebook.com/" + i + "\n\n";
        } catch (err) {
          console.error("Error fetching user info:", err);
        }
      }

      msg += "List of Vip Users\n\n" + ms;
      return send(msg);
    }

    if (t1 === "add" || t1 === "-a" || t1 === "a") {
      if (!operators.includes(event.senderID)) return send("You don't have permission to this command. Only Operator can use this method.");
      const id = parseInt(mentions[0]);
      if (isNaN(id)) return send("⚠️ The uid is invalid.");
      data.vip.push(id.toString());
      fs.writeFileSync(config, JSON.stringify(data, null, 2));
      return send("Vip added successfully.");
    }

    if (t1 === "remove" || t1 === "-r" || t1 === "r") {
      if (!operators.includes(event.senderID)) return send("You don't have permission to this command. Only Operator can use this method.");
      if (data.vip.length === 0) return send("There's no vip to remove.");
      const ids = parseInt(mentions[0]);
      if (isNaN(ids)) return send("⚠️ The uid is invalid.");
      data.vip = data.vip.filter(a => a !== ids.toString());
      fs.writeFileSync(config, JSON.stringify(data, null, 2));
      return send("Vip removed successfully.");
    } else {
      return send("Invalid use of command.");
    }
  }
};
