module.exports = {
  jea: {
    name: 'ai',
    description: 'Interact with an AI to get responses to your questions.',
    author: 'Lance Ajiro',
    cooldown: 5,
    category: "AI",
    usages: ['[question]'],
    permission: 'anyone',
    prefix: 'both'
  },

  initialize: async function({ api, event, args, send, usages, prefix }) {
    if (args.length === 0) return usages(prefix, event)
    const question = args.join(' ');

    if (!question) {
      send('Please provide a question.');
      return; 
    }

    try {
      const axios = require('axios');
      const response = await axios.get(`https://openai-rest-api.vercel.app/hercai?ask=${encodeURIComponent(question)}`);
      const aiResponse = response.data.reply;
      send(aiResponse);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      send('Failed to get AI response. Please try again later.');
    }
  }
};
