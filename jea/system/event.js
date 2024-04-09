/*const path = require("path");
const { function: func } = require(path.join(__dirname, "..", "system/function.js"));

exports.event = async function({ api, event }) {
    try {
        switch (event.type) {
            case "message":
            case "message_reply":
            case "message_unsend":
                func({ api: api, event: event });
                break;
            case "message_reaction":
                break;
            default:
                break;
        }
    } catch (error) { 
        console.log(error); 
    }
}
