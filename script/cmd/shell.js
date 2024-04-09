const { exec } = require("child_process");

module.exports = {
  jea: {
    name: "shell",
    description: "Run shell.",
    author: "Deku",
    usages: ["[shell]"],
    category: "operator",
    permission: "operator",
    cooldown: 5,
    prefix: true
  },

  initialize: async function({ api, event, args, send }) {
    let text = args.join(" ");
    exec(`${text}`, (error, stdout, stderr) => {
      if (error) {
          send(`Error Output: \n${error.message}`);
          return;
      }
      if (stderr) {
          send(`Error Output:\n${stderr}`);
          return;
      }
      send(`Output:\n${stdout}`);
    });
  }
};
