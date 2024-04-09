module.exports = {
  jea: {
    name: "upt",
    description: "Get uptime",
    author: "Deku",
    permission: "anyone",
    category: "system",
    cooldown: 5,
    prefix: "both",
    usages: []
  },

  initialize: async function ({ api, event, send }) {
    const time = process.uptime();
    const hours = Math.floor(time / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const seconds = Math.floor(time % 60);
    send(`${hours}:${minutes}:${seconds}`);
  }
};
