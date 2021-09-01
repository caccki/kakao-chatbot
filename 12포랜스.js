var player = [];
var num = [];
var power = false;
var DropNum = '123456789'.split('');
response = (room, msg, sender, isGroupChat, replier) => {
    sender = sender.replace(/||　/g, '').trim();
    msg = msg.replace(/||　/g, '').trim();
    NextTurn = _ => {
    player.shift();
    player.push(sender);
    var l = num[0];
    num.shift();
    num.push(l);
    replier.reply(player.map((s, p) => '[ ' + s + ' 님의 숫자 ]\n' + num[p]).join('\n'));
    replier.reply('[ 드랍된 숫자 ]\n' + DropNum.join(', '));
    replier.reply('차례: ' + player[0]);
};
    if (msg == '/포런스넘버' && !power) 
        replier.reply('/포런 참가');
    if (msg == '/포런 참가' && !power) {
        if (player.indexOf(sender) != -1) {
            replier.reply('이미 참가돼 있습니다!');
            return;
        }
        ;
        replier.reply('참가됐습니다!');
        player.push(sender);
        var q = [];
        for (var s = 0; s < 10; s++) {
            var g = Math.floor(Math.random() * 10);
            if (q.indexOf(g) == -1) {
                q.push(g);
            } else 
                s--;
        }
        num.push(q.join(''));
    }
    if (msg == '/포런 시작' && !power) {
        if (player.length < 2) {
            replier.reply('게임을 시작하는 데 2명 이상의 플레이어가 요구됩니다.');
            return;
        }
        ;
        replier.reply('게임을 시작합니다.\n자신의 턴일 때 ‘/drop (num)’ 명령어로 자신의 숫자를 떨어트릴 수 있으며 ‘/catch (num)’ 명령어로 떨어진 숫자를 가져 올 수 있습니다.\n자신의 숫자를 0123456789로 만들면 승리합니다.');
        power = true;
        replier.reply(player.map((s, p) => '[ ' + s + ' 님의 숫자 ]\n' + num[p]).join('\n'));
        replier.reply('[ 드랍된 숫자 ]\n' + DropNum.join(', '));
        replier.reply('차례: ' + player[0]);
    }
    if (msg.indexOf('/') == 0 && power && player[0] == sender) {
        msg = msg.slice(1);
        var aa = Math.random() * 9 | 0;
        if (aa == 3) {
aa = Math.random() * 10 | 0;
            replier.reply('보급 도착! [ ' + aa + ' ]');
DropNum.push(aa);
            replier.reply('[ 드랍된 숫자 ]\n' + DropNum.join(', '));
        }
        if (msg.indexOf('drop ') == 0) {
            var f = msg.split(' ')[1];
            if (!f || isNaN(f)) 
                return;
            if (num[player.indexOf(sender)].split('').indexOf(f) == -1) {
                replier.reply('그런 숫자는 ' + sender + ' 님이 소지하고 있지 않습니다.');
                return;
            }
            var sendernum = num[player.indexOf(sender)];
            if (sendernum.length < 8) {
                replier.reply('더 이상 드랍할 수 없을 정도로 소지한 숫자의 양이 적습니다.');
                return;
            }
            var k = sendernum.split('');
            k.splice(sendernum.indexOf(f), 1);
            num[player.indexOf(sender)] = k.join('');
            DropNum.push(f);
            NextTurn();
        }
        if (msg.indexOf('catch ') == 0) {
            var f = msg.split(' ')[1];
            if (!f || isNaN(f)) 
                return;
            if (DropNum.indexOf(f) == -1) {
                replier.reply('그런 숫자는 드랍되지 않았습니다.');
                return;
            }
            if (num[player.indexOf(sender)].length > 10) {
                replier.reply('가지고 있는 숫자의 양이 너무 많습니다.');
                return;
            }
            DropNum.splice(DropNum.indexOf(f), 1);
            num[player.indexOf(sender)] += f;
            NextTurn();
        }
    }
    if (num[player.indexOf(sender)] == '0123456789' && power) {
        replier.reply(sender + ' 님의 숫자가 0123456789가 되었습니다.\n' + sender + ' 님의 승리입니다!');
        power = false;
        player = [];
        num = [];
        DropNum = '123456789'.split('');
    }
};





