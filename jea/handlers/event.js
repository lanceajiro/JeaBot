const fs = require("fs");
const { join } = require("path");

global.handleEvent = (api, event) => {
    const cmdss = process.cwd() + "/script/event";
    for (let file of fs.readdirSync(cmdss)) {
        if (file.endsWith('.js')) {
            const path = join(cmdss, file);
            const script = require(path);
            const obj = {
                'api': api,
                'event': event
            };
            if (event.type == "event" && event.logMessageType == script.jea?.['type']) {
                script.initialize(obj);
            }
        }
    }
};
