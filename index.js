const TeleBot = require('telebot');
const bot = new TeleBot('token');
//proxima invasion = 18:00 depois de 18:30 vem outra
var schedule = require('node-schedule');

bot.on(/^\/schedule (.+)$/, (msg, props) => {
    const text = props.match[1];
    console.log(text);
    var min = text.split(':');
    scheduleInvasion({
        hour: min[0],
        minute: min[1]
    });
});


function scheduleInvasion(when) {
    var j = schedule.scheduleJob({ hour: when.hour, minute: when.minute }, function () {
        var t = when.hour + ':' + when.minute;
        t = nextInvasionTimer(t);
        var min = t.split(':');
        scheduleInvasion({
            hour: min[0],
            minute: min[1]
        });
        return bot.sendMessage('where', '@bunda_mole @kposter @MoltenBrain' + ' invasion');
    });
}

function timeToMins(time) {
    var b = time.split(':');
    return b[0] * 60 + +b[1];
}
function timeFromMins(mins) {
    function z(n) { return (n < 10 ? '0' : '') + n; }
    var h = (mins / 60 | 0) % 24;
    var m = mins % 60;
    return z(h) + ':' + z(m);
}
function addTimes(t0, t1) {
    return timeFromMins(timeToMins(t0) + timeToMins(t1));
}
function nextInvasionTimer(t) {
    return addTimes(t, '18:30');
}

bot.start();
