module.exports = {
  jea: {
    name: "sup",
    aliases: ["hello", "hey"],
    description: "Responds with a greeting when someone says hi.",
    author: "Your Name",
    cooldown: 5,
    category: "Fun",
    usages: "hi",
    permission: "anyone",
    prefix: true
  },
  auto: async function ({ api, event, args, send }) {
    // Check if the message contains "hi" in any part of the message
    if (event.body.toLowerCase().trim().includes("hi")) {
      return send("Hi there! How can I assist you?");
    }
  }
};
