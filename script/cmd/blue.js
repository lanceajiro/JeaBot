module.exports = {
  jea: {
    name: "blue",
    version: "1.0.0",
    description: "cmd ai powered by blue",
    author: "Jonell Magallanes",
    cooldown: 5,
    category: "AI",
    usages: "[question]",
    permission: "anyone",
    prefix: "both"
  },

  initialize: async function({ api, event, args, send, usages, prefix }) {
    if (args.length === 0) return usages(prefix, event)
    
    const content = args.join('');
    const apiUrl = `https://bluerepoapislasttry.onrender.com/hercai?content=${encodeURIComponent(content)}`;

    try {
      const axios = require('axios');
      const response = await axios.get(apiUrl);
      const reply = response.data.reply;

      send(reply);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      send("An error occurred while processing your request.");
    }
  }
};
