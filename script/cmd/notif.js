module.exports = {
  jea: {
    name: "notif",
    prefix: true,
    permission: "admin",
    description: "Send a message to all bots group.",
    cooldown: 5,
    category: "admin",
    usages: "[msg]",
    author: "Deku"
  },

  initialize: async function({ api, event, args, send }) {
    const originalMessage = args.join(" "); // Original message
    const threadList = await api.getThreadList(100, null, ["INBOX"]);

    // Fetch user info using getUserInfo
    const userInfo = await api.getUserInfo(event.senderID);
    const botAdmin = userInfo[event.senderID].name;

    for (const thread of threadList) {
      if (thread.isGroup) {
        const threadName = thread.name || "";

        // Preserve capitalization of each word in the original message
        const formattedMessage = originalMessage.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

        const msg = `${formattedMessage}\n\nfrom Admin: ${botAdmin}`;
        await api.sendMessage(msg, thread.threadID); // Use await instead of return
      }
    }
  }
};
