const TelegramBot = require('node-telegram-bot-api');
const token = '';
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/roll/, function (msg, match) {
    const chatId = msg.chat.id;
    var name = msg.from.first_name;
    console.log(msg.from.first_name+" fez um request /roll");
    var random = Math.floor((Math.random() * 100) + 1);
    bot.sendMessage(chatId, name + ": " + random);
});

bot.onText(/\/power/, function (msg, match) {
    const chatId = msg.chat.id;
    var random = Math.floor((Math.random() * 5) + 1);
    console.log(msg.from.first_name+" fez um request /power");

    if (random == 1) {
        bot.sendMessage(chatId, "Muito ruim");
    } else if (random == "2") {
        bot.sendMessage(chatId, "Fraco");
    } else if (random == "3") {
        bot.sendMessage(chatId, "Médio");
    } else if (random == "4") {
        bot.sendMessage(chatId, "Forte");
    } else {
        bot.sendMessage(chatId, "Irrefutável");
    }
});
bot.onText(/\/help/, function (msg, match) {
    const chatId = msg.chat.id;
    console.log(msg.from.first_name+"fez um request /helpluisbot");
    bot.sendMessage(chatId, "/roll\n/power\n/test");
});