const axios = require('axios');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

module.exports = {
  jea: {
    name: "adc",
    prefix: true,
    permission: "operator",
    cooldown: 5,
    description: "manage the file",
    category: "operator",
    usages: "[file name]",
    author: "Mirai team"
  },

  initialize: async function ({ api, event, args, send }) {
    const { senderID, threadID, messageID, messageReply, type } = event;
    var name = args[0];
    var text;

    if (type === "message_reply") {
      text = messageReply.body;
    }

    if (!text && !name) {
      send('Please reply to the link you want to apply the code to or write the file name to upload the code to pastebin!');
      return;
    }

    if (!text && name) {
      fs.readFile(`${__dirname}/${args[0]}.js`, "utf-8", async (err, data) => {
        if (err) {
          send(`Command ${input[0]} does not exist!.`);
          return;
        }

        const { PasteClient } = require('pastebin-api');
        const client = new PasteClient("R02n6-lNPJqKQCd5VtL4bKPjuK6ARhHb");

        async function pastepin(name) {
          const url = await client.createPaste({
            code: data,
            expireDate: 'N',
            format: "javascript",
            name: name,
            publicity: 1
          });
          var id = url.split('/')[3]
          return 'https://pastebin.com/raw/' + id
        }

        var link = await pastepin(args[1] || 'noname');
        send(link);
      });
      return;
    }

    var urlR = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    var url = text.match(urlR);

    if (url[0].indexOf('pastebin') !== -1) {
      axios.get(url[0]).then(i => {
        var data = i.data
        fs.writeFile(
          `${__dirname}/${input[0]}.js`,
          data,
          "utf-8",
          function (err) {
            if (err) {
              send(`An error occurred while applying the code ${args[0]}.js`);
              return;
            }
            send(`Applied the code to ${args[0]}.js, use command load to use!`);
          }
        );
      })
    }

    if (url[0].indexOf('buildtool') !== -1 || url[0].indexOf('tinyurl.com') !== -1) {
      const options = {
        method: 'GET',
        url: messageReply.body
      };
      request(options, function (error, response, body) {
        if (error) {
          send('Please only reply to the link (doesnt contain anything other than the link)');
          return;
        }
        const load = cheerio.load(body);
        load('.language-js').each((index, el) => {
          if (index !== 0) return;
          var code = el.children[0].data
          fs.writeFile(`${__dirname}/${args[0]}.js`, code, "utf-8",
            function (err) {
              if (err) {
                send(`An error occurred while applying the new code to "${args[0]}.js".`);
                return;
              }
              send(`Added this code "${args[0]}.js", use command load to use!`);
            }
          );
        });
      });
      return;
    }

    if (url[0].indexOf('drive.google') !== -1) {
      var id = url[0].match(/[-\w]{25,}/)
      const path = resolve(__dirname, `${args[0]}.js`);
      try {
        await utils.downloadFile(`https://drive.google.com/u/0/uc?id=${id}&export=download`, path);
        send(`Added this code "${args[0]}.js" If there is an error, change the drive file to txt!`);
      } catch(e) {
        send(`An error occurred while applying the new code to "${args[0]}.js".`);
      }
    }
  }
};
