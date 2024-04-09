/*const path = require("path");
const fs = require("fs");

const functions = fs.readdirSync(path.join(__dirname, "..", "function/")).filter(file => file.endsWith(".js"));

exports.event = async function({ api, event }) {
    for (let func of functions) {
        try {
            const { function: funcModule } = require(path.join(__dirname, "..", `function/${func}`));
            const reactAndSend = (message, attachmentPath) => {
                api.react(event.messageID, "👍", (err) => {
                    api.sendMessage({
                        body: message,
                        attachment: fs.createReadStream(attachmentPath)
                    }, event.threadID, (err) => {
                        if (err) return api.sendMessage(message, event.threadID, event.messageID);
                    }, event.messageID);
                }, true);
            };
            require(path.join(__dirname, "..", `function/${func}`))({
                jea: global.jea,
                axios: require("axios"),
                api: api,
                cache: path.join(__dirname, "..", "cache/"),
                database: global.database,
                event: event,
                fs: require("fs"),
                path: require("path"),

            });
        } catch (error) {
            console.log(error);
        }
    }
}
