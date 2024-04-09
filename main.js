const fs = require("fs");
const path = require("path");
const login = require("alicezetion");
const cron = require("node-cron");
require("./jea/system/index.js");
const l = require("chalk");
const m = require("moment-timezone");
var n = m.tz("Asia/Manila").format("HH:mm:ss DD/MM/YYYY");
var t = m.tz("Asia/Manila").format("HH:mm:ss");
const { commands, hm, command, warn, error, msg } = require("./jea/system/logs.js");
const { handleCommand } = require("./jea/handlers/command.js");
const { handleEvent } = require("./jea/handlers/event.js");
global.database = require(path.join(__dirname, "jea/system/database.js"));
global.jea = require(path.join(__dirname, "config.json"));
global.command = new Map();
global.reply = new Array();
global.react = new Array(); 

// Function to delete all files in the cache directory
function deleteCacheFiles() {
    const cacheDir = "./script/cmd/cache";
    fs.readdirSync(cacheDir).forEach(file => {
        try {
            fs.unlinkSync(path.join(cacheDir, file));
        } catch (err) {
            error("Error deleting file from cache:", err);
        }
    });
}

deleteCacheFiles();

function autoRestart() {
    process.exit(1);
}
setInterval(autoRestart, global.jea.autoRestart.perMins * 60 * 1000);

hm("Logging in");

login({
    appState: JSON.parse(fs.readFileSync('instance.json', 'utf8'))
}, (err, api) => {
    console.clear();

    const cmds = path.join(process.cwd(), "/script/cmd");
    const cmde = path.join(process.cwd(), "/script/event");

    const deployCommands = () => {
        hm("Deploying Commands");
        for (let file of fs.readdirSync(cmds)) {
            if (file.endsWith(".js")) {
                try {
                    command("Deployed Command: " + file);
                } catch (e) {
                    warn("Can't deploy command: " + file + "\nReason: " + e);
                }
            }
        }
    };

    const deployEvents = () => {
        hm("Deploying Events");
        for (let file of fs.readdirSync(cmde)) {
            if (file.endsWith(".js")) {
                try {
                    command("Deployed Event: " + file);
                } catch (e) {
                    warn("Can't deploy Event: " + file + "\nReason: " + e);
                }
            }
        }
    };

    const deployCommandsAndEvents = async () => {
        deployCommands();
        deployEvents();
    };

    deployCommandsAndEvents();

    command("Bot: " + api.getCurrentUserID() + " Successfully Login");
    command("Bot Name: " + global.jea.name);
    command("Bot Prefix: " + global.jea.prefix);
    if (err) {
        console.error(err);
    }

    // Update bot's bio if enabled
    if (global.jea.bio) {
        const bio = `Prefix: ${global.jea.prefix}\nBot made by: ${global.jea.facebook}\n\n🟢 Active: ${n}`;
        api.changeBio(bio, (err) => {
            if (err) {
                warn('Failed to change bio:', err);
            } else {
                command("bot's bio has been updated");
            }
        });
    }

    /*----GREET---*/
    if (typeof global.jea.greet === 'function') {
        const greet = require("./jea/assets/greet.js");
        greet(api);
    }
    /*---END OF GREET---*/
    api.setOptions(global.jea.setOpt);
    api.listenMqtt(async function (err, event) {
        if (err) {
            console.log(err);
        }
        if (event.body != null) {
            if (event.type === "message" || event.type === "message_reply") {
                if (global.jea.logs == true) {
                    const { threadID, senderID } = event;
                    // Retrieve thread info
                    api.getThreadInfo(threadID, (err, threadInfo) => {
                        if (err) return console.error(err);
                        const threadName = threadInfo.threadName || "Unnamed Group";
                        // Retrieve user info
                        api.getUserInfo(senderID, (err, userInfo) => {
                            if (err) return console.error(err);
                            const userName = userInfo[senderID].name;
                            msg(`${threadName} » ${userName}: ${event.body}`);
                        });
                    });
                }
                global.handleCommand(api, event);
            }
        }
        // Handle events
        global.handleEvent(api, event);
    });
    api.sendMessage("Bot started at " + n, global.jea.admin[0]);
});
