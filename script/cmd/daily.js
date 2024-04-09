module.exports = {
  jea: {
    name: "daily",
    aliases: [],
    description: "Get daily coins",
    author: "leiamnash",
    cooldown: 600,
    category: "economy",
    usages: "daily",
    permission: "anyone",
    prefix: true
  },
  initialize: async function ({ event, database, send }) {
    try {
      const randomCoinAmount = Math.floor(Math.random() * 10000);
      await database.addCoin(event.senderID, randomCoinAmount);
      return send(`you receive ˖۪⸙͎${randomCoinAmount} lycoris coin`);
    } catch (error) {
      console.error(`[ daily ] » ${error}`);
      return send(`[ daily ] » Error occurred`);
    }
  }
};
