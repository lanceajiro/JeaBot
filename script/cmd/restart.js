module.exports = {
  jea: {
    name: "restart",
    prefix: true,
    permission: "admin",
    cooldown: 5,
    description: "Restart bot",
    category: "admin",
    usages: [],
    author: "Deku"
  },

  initialize: async function({ api, event, args, send }) {
    send("Restarting...");
    process.exit(2);
  }
};
