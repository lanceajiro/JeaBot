const usetube = require('usetube');
const ytdl = require('ytdl-core');
const fs = require('fs');

module.exports = {
  jea: {
    name: "music",
    prefix: "both",
    permission: "anyone",
    cooldown: 60,
    description: "Play a music via title",
    category: "media",
    usages: "[title]",
    author: "Deku"
  },

  initialize: async function ({ api, event, args }) {
    let txt = args.join(' ');
    if (!txt) return api.sendMessage("Missing title of song to execute", event.threadID, event.messageID);
    try {
      const random = Math.floor(Math.random() * 3) + 1;
      const res = await usetube.searchVideo(txt);
      var ok = res.videos[random];
      const stream = ytdl("https://www.youtube.com/watch?v=" + ok.id, { filter: 'audioonly' });
      api.sendMessage("Downloading your request...", event.threadID, event.messageID);
      const path = `${__dirname}/cache/song.mp3`;
      stream.pipe(fs.createWriteStream(path)).on('finish', () => {
        api.sendMessage({
          body: "Here's your request!\nTitle: " + ok.title + "\nDuration: " + ok.duration + "\nPublished at " + ok.publishedAt,
          attachment: fs.createReadStream(path)
        }, event.threadID, () => fs.unlinkSync(path), event.messageID);
      });
    } catch (e) {
      return api.sendMessage("Error: " + e.message, event.threadID, event.messageID);
    }
  }
};
