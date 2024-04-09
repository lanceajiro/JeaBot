module.exports = {
  jea: {
    name: "uid",
    aliases: ["id"],
    prefix: "both",
    description: "Get user ID",
    permission: "anyone",
    cooldown: 5, 
    category: "tools", 
    usages: ["/ uid (reply)/ uid @mention"],
    author: "Deku"
  },

  initialize: async function({ api, event, args, send }) {
    var uid;
    if (!args[0]) {
      uid = event.senderID;
    }
    if (event.type == "message_reply") {
      uid = event.messageReply.senderID;
    }
    if (args.join().indexOf('@') !== -1) {
      uid = Object.keys(event.mentions);
    }

    send(uid);

    if (args[0] === "all") {
      var msg = "";
      var uidList = event.participantIDs;
      for (let i of uidList) {
        msg += i + "\n";
      }
      send(msg);
    }
  }
};
