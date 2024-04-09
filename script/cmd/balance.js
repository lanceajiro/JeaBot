module.exports = {
  jea: {
    name: "balance",
    aliases: ["money", "bal"],
    description: "Check lycoris coin balance",
    author: "leiamnash",
    cooldown: 10,
    category: "economy",
    usages: "balance",
    permission: "anyone",
    prefix: true
  },
  initialize: async function ({ event, database, send }) {
    try {
      const leiam = (await database.coinData())[event.senderID];
      if (!leiam) return send("Sorry, your account doesn't have data on JEA database. Please try using ⟨ " + global.jea.prefix + "daily ⟩ to earn some lycoris coins.");
      return send("Your lycoris coin balance is ˖۪⸙͎" + leiam);
    } catch (error) {
      console.error("[ balance ] »", error);
      return send("[ balance ] » An error occurred");
    }
  }
};
