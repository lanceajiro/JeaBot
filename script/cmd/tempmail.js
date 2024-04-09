const { TempMail } = require("1secmail-api");

module.exports = {
  jea: {
    name: "tempmail",
    description: "Generate temporary email (auto get inbox)",
    author: "Deku",
    cooldown: 5,
    category: "tools",
    usages: ["[tempmail]"],
    permission: "anyone",
    prefix: "both"
  },

  initialize: async function({ api, event, send }) {
    const reply = (msg) => send(msg);

    try {
      // Generate temporary email
      const mail = new TempMail(generateRandomId());

      // Auto fetch
      mail.autoFetch();

      if (mail) reply("Your temporary email: " + mail.address);

      // Fetch function
      const fetch = () => {
        mail.getMail().then((mails) => {
          if (!mails[0]) {
            return;
          } else {
            let b = mails[0];
            var msg = `You have a message!\n\nFrom: ${b.from}\n\nSubject: ${b.subject}\n\nMessage: ${b.textBody}\nDate: ${b.date}`;
            reply(msg + `\n\nOnce the email and message are received, they will be automatically deleted.`);
            return mail.deleteMail();
          }
        });
      };

      // Auto fetch every 3 seconds
      fetch();
      setInterval(fetch, 3 * 1000);

    } catch (err) {
      console.error(err);
      return reply(err.message);
    }
  }
};

function generateRandomId() {
  var length = 6;
  var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var randomId = '';

  for (var i = 0; i < length; i++) {
    randomId += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return randomId;
}
