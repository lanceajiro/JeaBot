const axios = require("axios");

module.exports = {
  jea: {
    name: "qwen",
    author: "Deku", // https://facebook.com/joshg101
    description: "Talk to Qwen AI (with 72 billion parameters)",
    prefix: "both",
    category: "AI",
    usages: ["[prompt]"],
    permission: "anyone",
    url: "https://deku-rest-api.replit.app/qwen-72b?prompt="
  },

  initialize: async function ({ api, event, args, send }) {
    const prompt = args.join(" ");

    if (!prompt) {
      send(`Please enter a prompt.`);
      return;
    }

    try {
      const response = await axios.get(this.jea.url + encodeURIComponent(prompt));
      const result = response.data.result;
      send(result);
    } catch (error) {
      console.error(error);
      send(error.message);
    }
  }
};
