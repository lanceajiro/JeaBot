const { readdirSync } = require("fs-extra");

module.exports = {
  jea: {
    name: "help",
    aliases: ["cmd", "command", "commands"],
    description: "Shows the command list and their descriptions",
    author: "Lance Ajiro",
    cooldown: 10,
    category: "general",
    usages: "[command_name]",
    permission: "anyone", // Set permission to "anyone" for regular users
    prefix: "both" // Prefix required
  },

  initialize: async function({ api, event, args, send }) {
    try {
      const pageNumber = parseInt(args[0]) || 1;
      const commandsPerPage = 15;
      const start = (pageNumber - 1) * commandsPerPage;
      const end = start + commandsPerPage;

      const cmds = process.cwd() + "/script/cmd";

      if (args[0] === "all" || args[0] === "-all" || args[0] === "-a") {
        // Show all commands according to their category
        const allCommands = {};
        const commandFiles = readdirSync(cmds).filter(file => file.endsWith(".js"));

        commandFiles.forEach(file => {
          const path = require("path").join(cmds, file);
          const script = require(path);
          const command = script.jea || {};
          const { category } = command;

          if (category) {
            if (!allCommands[category]) {
              allCommands[category] = [];
            }
            allCommands[category].push(command);
          }
        });

        const categories = Object.keys(allCommands);
        const helpMessage = categories.map(category => {
          const commands = allCommands[category];
          const commandList = commands.map(command => {
            const { name, prefix } = command;
            const commandPrefix = prefix === "both" || prefix === true ? global.jea.prefix : '';
            return `⦿ ${commandPrefix}${name}`;
          }).join("\n");
          return `Category: ${category}\n${commandList}\n`;
        }).join("\n");

        return send(helpMessage);
      }

      // Read all command files and filter out non-JS files
      const commandFiles = readdirSync(cmds).filter(file => file.endsWith(".js"));

      // Map each command file to its configuration object
      const commandConfigs = commandFiles.map(file => {
        const path = require("path").join(cmds, file);
        const script = require(path);
        return script.jea || {}; // Ensure that script.jea exists
      });

      const lance = global.jea.admin;

      const isAdminBot = lance.includes(event.senderID); // Check if the user is in the admin bot list

      const filteredCommands = isAdminBot
        ? commandConfigs // Show all commands to admin bot
        : commandConfigs.filter(command => command.permission === "anyone" || command.permission === "vip" || (command.permission === "groupAdmin" && event.isGroup && event.isAdmin));

      const totalCommands = filteredCommands.length;
      const totalPages = Math.ceil(totalCommands / commandsPerPage);

      if (pageNumber < 1 || pageNumber > totalPages) {
        return send(`Invalid page number. Please use a number between 1 and ${totalPages}`);
      }

      const slicedCommands = filteredCommands.slice(start, end);

      const commandList = slicedCommands.map((command, index) => {
        const { name, prefix } = command;
        const commandPrefix = prefix === "both" || prefix === true ? global.jea.prefix : '';
        return `⦿ ${commandPrefix}${name}`;
      }).join("\n");

      const helpMessage = `List of Commands\n\n${commandList}\n\nPage ${pageNumber}/${totalPages}\nTotal Commands ${totalCommands}`;

      // Get the command name from arguments
      const commandName = (args[0] || "").toLowerCase();

      // Retrieve the command configuration from the commandConfigs array
      const command = filteredCommands.find(command => command.name && command.name.toLowerCase() === commandName);

      if (command) {
        const { name, aliases, description, author, usages, permission, cooldown, prefix } = command;

        let permissionInfo;
        if (permission === "admin") {
          permissionInfo = "admin";
        } else if (permission === "operator") {
          permissionInfo = "operator";
        } else if (permission === "vip") {
          permissionInfo = "vip";
        } else if (permission === "groupAdmin") {
          permissionInfo = "groupAdmin";
        } else {
          permissionInfo = "anyone";
        }

        const commandInfo = `『 ${name} 』\n${description}\n\n` + `⦿ Other Names: ${aliases.join(", ")}\n` +
          `⦿ Usage: ${prefix === "both" || prefix === true ? global.jea.prefix : ''}${name} ${usages}\n` +
          `⦿ Permission: ${permissionInfo}\n` +
          `⦿ Cooldown: ${cooldown} seconds\n` +
          `⦿ Author: ${author}`;

        return send(commandInfo);
      }

      return send(helpMessage);
    } catch (error) {
      console.error(error);
      return send("An error occurred while running the command.");
    }
  }
};
