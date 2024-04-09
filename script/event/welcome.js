module.exports = {
  jea: {
    name: "welcome",
    type: "log:subscribe",
  },

  initialize: async function ({ api, event }) {
    function reply(msg) {
      api.sendMessage(msg, event.threadID);
    }

    let { threadName, participantIDs } = await api.getThreadInfo(event.threadID);
    let tn = threadName || "Unnamed Group";

    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
      api.changeNickname(`${global.jea.name} • [ ${global.jea.prefix} ]`, event.threadID, api.getCurrentUserID())
        .catch(err => {
          console.error("Error changing nickname:", err);
        });
      reply(`${global.jea.name} Connected Successfully!\nType "${global.jea.prefix}help" to view my commands\n\n`);

      // Retrieve user info
      api.getUserInfo(event.author, (err, ret) => {
        if (err) return console.error(err);

        const nam = ret[event.author].name;
        api.sendMessage(`Notification:\n\nBot has been added to a group.\n\nName: ${threadName || "Unnamed Group"}\n\nID: ${event.threadID}\n\nTotal of members: ${participantIDs.length}\n\nAdded by: ${nam}\n\n[ facebook link ]: https://facebook.com/${event.author}`, global.jea.operator[0])
          .catch(err => {
            console.error("Error sending notification:", err);
          });
      });
    } else {
      try {
        let addedParticipants = event.logMessageData.addedParticipants;
        let nameArray = [];

        for (let newParticipant of addedParticipants) {
          let userID = newParticipant.userFbId;
          let userData = await api.getUserInfo(parseInt(userID));
          let userName = userData[userID].name.replace("@", "");
          if (userID !== api.getCurrentUserID()) {
            nameArray.push(userName);
          }
        }

        let msg = `Hello, ${nameArray.join(", ")}, Welcome to ${tn}\nYou're the ${participantIDs.length}th member of our community; please enjoy! and have a lot of new friends!`;
        reply(msg);
      } catch (err) {
        console.log("ERROR: " + err);
      }
    }
  }
};
