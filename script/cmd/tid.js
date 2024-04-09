module.exports = {
  jea: {
    name: "tid",
    aliases: ["gid"],
    description: "Get the current Thread ID.",
    author: "Lance Ajiro",
    cooldown: 5,
    category: "tools",
    usage: "",
    permission: "anyone",
    prefix: "both"
  },
  initialize: async function ({ api, event, args, send, react }) {
    const threadID = event.threadID;
    send(`${threadID}`);
  }
};
