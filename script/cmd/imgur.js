const axios = require('axios');

module.exports = {
  jea: {
    name: "imgur",
    aliases: [],
    description: "imgur upload",
    author: "Lance Ajiro",
    cooldown: 5,
    category: "tools",
    usages: "[reply to image]",
    permission: "anyone",
    prefix: true
  },
  initialize: async function ({ api, event, args, send, usages, prefix }) {
    try {
      const linkanh = (event.messageReply && event.messageReply.attachments[0]?.url) || args[0];

      if (!linkanh) return usages(prefix, event)

      const res = await axios.get(`https://tanjiro-api.onrender.com/imgur?link=${encodeURIComponent(linkanh)}&api_key=tanjiro`);
      const lance = res.data.result;
      return send(`${lance}`);
    } catch (error) {
      console.error(error);
      return send("An error occurred while processing the image. Please try again.");
    }
  }
};
