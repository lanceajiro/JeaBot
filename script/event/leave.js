module.exports = {
  jea: {
    name: "leave",
    type: ["log:unsubscribe"],
  },

  initialize: async function({ api, event }) {
    function reply(data) {
      api.sendMessage(data, event.threadID);
    }

    if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) {
      // Get thread info to retrieve the name
      let { threadName, participantIDs } = await api.getThreadInfo(event.threadID);

      //logs
      api.getUserInfo(event.author, (err, ret) => {
        if (err) return console.error(err);

        const nam = ret[event.author].name;
        api.sendMessage(`Notification\n\nBot has been kicked from a group.\n\nName: ${threadName || "Unnamed Group"}\n\nID: ${event.threadID}\n\nTotal of members: ${participantIDs.length}\n\nKicked by: ${nam}\n\n[ facebook link ]: https://facebook.com/${event.author}`, global.jea.operator[0]);
      });
    }

    const type = (event.author == event.logMessageData.leftParticipantFbId) ? "left the group." : "was kicked by the Admin of the group";
    let name = (await api.getUserInfo(event.logMessageData.leftParticipantFbId))[event.logMessageData.leftParticipantFbId].name;

    reply(name + " has been " + type);
  }
};
