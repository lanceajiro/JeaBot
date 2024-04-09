const cron = require("node-cron");

module.exports = function greet(api) {
  cron.schedule('0 7 * * *', function () {
    api.getThreadList(100, null, ["INBOX"]).then(function (threadList) {
      threadList.forEach(function (thread) {
        if (thread.isGroup) {
          const threadName = thread.name || "";
          const greeting = "Good morning {groupName}, have a nice day!".replace("{groupName}", threadName);
          api.sendMessage(greeting, thread.threadID);
        }
      });
    }).catch(function (error) {
      console.error('Failed to get Thread List:', error);
    });
  }, {
    scheduled: true,
    timezone: "Asia/Manila"
  });
  cron.schedule('0 13 * * *', function () {
    api.getThreadList(100, null, ["INBOX"]).then(function (threadList) {
      threadList.forEach(function (thread) {
        if (thread.isGroup) {
          const threadName = thread.name || "";
          const greeting = "Good afternoon {groupName}, let's eat 🍛!".replace("{groupName}", threadName);
          api.sendMessage(greeting, thread.threadID);
        }
      });
    }).catch(function (error) {
      console.error('Failed to get Thread List:', error);
    });
  }, {
    scheduled: true,
    timezone: "Asia/Manila"
  });
  cron.schedule('0 18 * * *', function () {
    api.getThreadList(100, null, ["INBOX"]).then(function (threadList) {
      threadList.forEach(function (thread) {
        if (thread.isGroup) {
          const threadName = thread.name || "";
          const greeting = "Good evening {groupName}, don't forget to eat (⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)!".replace("{groupName}", threadName);
          api.sendMessage(greeting, thread.threadID);
        }
      });
    }).catch(function (error) {
      console.error('Failed to get Thread List:', error);
    });
  }, {
    scheduled: true,
    timezone: "Asia/Manila"
  });
};
