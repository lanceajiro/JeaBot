const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const cooldowns = {};

global.handleCommand = (api, event) => {
    if (event.attachments.length > 0) return;

    const prefix = global.jea.prefix;
    const operator = global.jea.operator;
    const admin = global.jea.admin;
    const vip = global.jea.vip;

    const cmds = path.join(process.cwd(), "script", "cmd");
    const timeNow = Date.now();

    fs.readdir(cmds)
        .then(files => {
            files.forEach(file => {
                if (file.endsWith(".js")) {
                    const filePath = path.join(cmds, file);
                    const script = require(filePath);
                    const input = event.body;
                    const args = input.split(" ").slice(1);
                    const t = input.split(" ")[0].toLowerCase();

                    const send = (text, attachment) => {
                        if (!text) return Promise.resolve();
                        return api.sendMessage(attachment ? { body: text, attachment } : text, event.threadID, event.messageID);
                    };

                    const usages = (prefix, event) => {
                        const usageText = `Usage:\n⦿ ${prefix}${jea.name} ${jea.usages}`;
                        return send(usageText);
                    };

                    const react = (emoji) => {
                        return api.setMessageReaction(emoji, event.messageID, true);
                    };

                    const database = global.database;

                    const obj = { api, event, args, send, react, database, usages, prefix };

                    if (t === "prefix") return send(`Prefix: ${prefix}`);

                    const jea = script.jea;

                    const matchesCommand = (command) => {
                        return (jea.prefix === true && t === prefix + command) ||
                            (jea.prefix === false && t === command) ||
                            (jea.prefix === "both" && (t === prefix + command || t === command));
                    };

                    if (jea && (matchesCommand(jea.name) || (jea.aliases && jea.aliases.some(alias => matchesCommand(alias))))) {
                        if (jea.cooldown) {
                            const cooldownKey = `${jea.name}-${event.senderID}`;
                            const cooldownDuration = jea.cooldown * 1000;

                            if (cooldowns[cooldownKey] && timeNow - cooldowns[cooldownKey] < cooldownDuration) {
                                const remainingCooldownSeconds = Math.ceil((cooldownDuration - (timeNow - cooldowns[cooldownKey])) / 1000);
                                return send(`Please wait ${remainingCooldownSeconds} seconds before using ${jea.name} again.`);
                            }

                            cooldowns[cooldownKey] = timeNow;
                        }

                        if (jea.permission === "anyone" || (jea.permission === "operator" && operator.includes(event.senderID)) || (admin.includes(event.senderID) && jea.permission === "admin") || (vip.includes(event.senderID) && jea.permission === "vip")) {
                            return script.initialize(obj)
                                .then(() => {
                                    if (script.auto) {
                                        return script.auto(obj);
                                    }
                                });
                        } else {
                            return send(`You don't have permission to use ${jea.name}`);
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });

    if (event.body.toLowerCase().trim() === prefix) {
        const msg = ["Do you need something from me?", "Yes, what can I do for you?", `Type ${prefix}help to view all commands.`, 'Stop!', "Try using the ai command."];
        const randomMsg = msg[Math.floor(Math.random() * msg.length)];
        api.sendMessage(randomMsg, event.threadID, event.messageID)
            .catch(error => {
                console.error("Error:", error);
            });
    }
};
