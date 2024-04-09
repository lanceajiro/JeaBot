exports.leiamnash = async function({ jea, api, axios, bot, cache, database, event, fs, path }) {
    try {
        if (!event.body) return;
        const emotions = [ 
            ["aha", "ha", "heh", "ehe", "aah", "gag", "bob", "tang", "pota", "yawa", "xd", "lol", "lmao", "shit", "sht", "😀", "😃", "😄", "😆", "😅", "😂", "🤣", "🙂", "😸", "😹"],
            ["cry", "sad", "sakit", "ouch", "hurt", "malongkot", "malungkot", "broken", "uhu", "😭", "🥲", "😢", "😥", "😿", "💔", "patay", "dead", "break"],
            ["lewd", "nsfw", "pussy", "dick", "fck", "fuc", "masturbate", "finger", "seg", "sex", "kantot", "bold", "buld", "porn", "prn", "ass", "boob", "tit", "penis", "vagina", "hentai", "hanime", "sauce", "cum", "👀", "🍑", "🍆", "talong", "inch"],
            ["wow", "woah", "amazing", "mind", "😮", "😯", "😲", "😳", "🤯", "😵", "🙀"],
            ["nice", "noice", "great", "cool", "sogoi"],
            ["sigma", "shes", "🗿", "damn", "nig", "neg"],
            ["bye", "night", "sleep", "brb"],
            ["love", "luv", "heart", "pogi", "ganda", "thank", "welcome", "ty", "wc", "ogip", "jowa", "jewa", "babe", "beb", "laby", "❤️", "🧡", "💛", "💚", "💙", "💜", "🤎", "🖤", "🤍", "♥️", "💘", "💝", "💖", "💗", "💓", "💞", "💕", "💟", "❣️", "❤️‍🩹", "❤️‍🔥"],
            ["game", "ml", "cod", "fl", "wr", "pubg", "farlight", "coc", "1v1", "ign", "genshin", "genshit", "duo", "wildrift", "csgo", "steam", "pc", "rank", "classic", "br", "psp", "nintendo", "xbox", "roblox", "bloxfruit", "grind", "comshop"]
        ];

        emotions.forEach(emotion => {
            const emojiArray = [];
            switch(emotion[0]) {
                case "aha":
                case "ha":
                case "heh":
                case "ehe":
                case "aah":
                case "gag":
                case "bob":
                case "tang":
                case "pota":
                case "yawa":
                case "xd":
                case "lol":
                case "lmao":
                case "shit":
                case "sht":
                    emojiArray.push("😄", "😂", "🤣", "😸", "😹");
                    break;
                case "cry":
                case "sad":
                case "sakit":
                case "ouch":
                case "hurt":
                case "malongkot":
                case "malungkot":
                case "broken":
                case "uhu":
                    emojiArray.push("😭", "😢", "😿", "😥", "🥲");
                    break;
                case "lewd":
                case "nsfw":
                case "pussy":
                case "dick":
                case "fck":
                case "fuc":
                case "masturbate":
                case "finger":
                case "seg":
                case "sex":
                case "kantot":
                case "bold":
                case "buld":
                case "porn":
                case "prn":
                case "ass":
                case "boob":
                case "tit":
                case "penis":
                case "vagina":
                case "hentai":
                case "hanime":
                case "sauce":
                case "cum":
                    emojiArray.push("😼", "😏", "🫣", "🥴", "🤧", "😖", "🤨", "🧐");
                    break;
                case "wow":
                case "woah":
                case "amazing":
                case "mind":
                    emojiArray.push("😮", "😲", "😵", "🤯");
                    break;
                case "nice":
                case "noice":
                case "great":
                case "cool":
                case "sogoi":
                    emojiArray.push("🎇", "🎆", "🎑", "🪔");
                    break;
                case "sigma":
                case "shes":
                case "🗿":
                case "damn":
                case "nig":
                case "neg":
                    emojiArray.push("🗿");
                    break;
                case "bye":
                case "night":
                case "sleep":
                case "brb":
                    emojiArray.push("🍃");
                    break;
                case "love":
                case "luv":
                case "heart":
                case "pogi":
                case "ganda":
                case "thank":
                case "welcome":
                case "ty":
                case "wc":
                case "ogip":
                case "jowa":
                case "jewa":
                case "babe":
                case "beb":
                case "laby":
                    emojiArray.push("❤️", "🧡", "💛", "💚", "💙", "💜", "🤎", "🖤", "🤍");
                    break;
                case "game":
                case "ml":
                case "cod":
                case "fl":
                case "wr":
                case "pubg":
                case "farlight":
                case "coc":
                case "1v1":
                case "ign":
                case "genshin":
                case "genshit":
                case "duo":
                case "wildrift":
                case "csgo":
                case "steam":
                case "pc":
                case "rank":
                case "classic":
                case "br":
                case "psp":
                case "nintendo":
                case "xbox":
                case "roblox":
                case "bloxfruit":
                case "grind":
                case "comshop":
                    emojiArray.push("🎮", "🕹️", "👾", "💻", "⌨️", "🖱️");
                    break;
                default:
                    break;
            }

            emotion.forEach(keyword => {
                if (event.body.toLowerCase().includes(keyword)) {
                    const randomEmoji = emojiArray[Math.floor(Math.random() * emojiArray.length)];

const react = async (emoji) => {
                    await api.setMessageReaction(emoji, event.messageID, true);                  
                    react(randomEmoji, event.messageID, (err) => {}, true);
                }
            });
        });
    } catch(error) {
        console.log(error);
    }
}
