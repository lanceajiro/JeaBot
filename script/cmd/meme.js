const axios = require('axios');
const fs = require('fs');

module.exports = {
  jea: {
    name: 'meme',
    aliases: ['memes'],
    description: 'Get a random meme.',
    author: 'Lance Ajiro',
    cooldown: 5,
    category: "media",
    usages: [],
    permission: 'anyone',
    prefix: 'both'
  },

  initialize: async function({ api, event }) {
    try {
      const response = await axios.get('https://jayapi.onrender.com/memeapi');
      const memeData = response.data;

      const memeTitle = memeData.meme_title;
      const memeUrl = memeData.meme_url;

      const path = __dirname + `/cache/photo.png`;
      const writer = fs.createWriteStream(path);

      const imageResponse = await axios.get(memeUrl, { responseType: 'stream' });
      imageResponse.data.pipe(writer);

      writer.on('finish', () => {
        api.sendMessage({ body: memeTitle, attachment: fs.createReadStream(path) }, event.threadID, event.messageID).then(() => {
          fs.unlinkSync(path);
        }).catch(error => {
          console.error('Error sending meme:', error);
        });
      });
    } catch (error) {
      console.error('Error fetching meme:', error);
      api.sendMessage('Failed to fetch meme. Please try again later.', event.threadID, event.messageID);
    }
  }
};
