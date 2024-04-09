[Contact me here!](https://facebook.com/joshg101)

# Bot Introduction

This bot is designed to assist users in various tasks. Here's how to use it:

1. Send a specific command to initiate an action.
2. Follow the prompts and provide any required inputs.
3. The bot will process the request and provide the desired output.

Sample command: `!bot command_name`

Please note that this is just a general guide. Refer to the bot's documentation for detailed instructions and available commands.

## HOW TO ADD COMMAND:

```javascript
//The command will not work if something is missing in the code (ex: desc: "")
module.exports = {
  jea: {
    name: "", // name of command
    aliases: [],
    description: "", // description
    author: "", // Creator of command
    cooldown: 5,
    category: "",
    usages: "", // usage
    permission: "anyone", // if anyone, anyone can use the command; if admin, only admin can use the command; if groupAdmin, only group admin can use the command; if vip, only vip can use the command.
    prefix: true // if false, you don't need to use prefix; if true, you need prefix before the command name; "both" for with or without prefix
  },
  initialize: async function ({ api, event, args, send, react, database, usages, prefix }) {
    // Do something
  }
};

```
