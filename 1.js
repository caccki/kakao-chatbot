/*Made By. SJK
무단 수정 및 배포 금지*/

const FS = FileStream;
const path = 'sdcard/chats';
const admin = JSON.parse(FileStream.read('sdcard/managers')).map(s => s + []).concat('1740319527');
let chats;
function onStartCompile() {
    FS.write(path, JSON.stringify(chats, null, 4));
}
function response(room, msg, sender, isGroupChat, replier, imageDB) {
    let hash = java.lang.String(imageDB.getProfileBase64()).hashCode().toString();
    if (!chats) {
        try {
            chats = JSON.parse(FS.read(path));
        }    catch (e) {
    chats = {};
}
    }
    if (!chats[room]) 
        chats[room] = [];
    chats[room].unshift({
    msg: msg, 
    sender: sender, 
    time: new Date().toLocaleString().slice(0, -9).trim(), 
    hash: hash});
    if (chats[room].length > 10000) 
        chats[room].pop();
    if (admin.includes(hash)) {
        if (/^\*chat [^0]\d*( -?\d+)?$/.test(msg)) {
            let c = msg.split(' ');
            let n = +c[1].trim();
            let p = c[2];
            let a = chats[room].slice(1, n + 1);
            if (!!p) 
                a = a.filter(s => s.hash == p);
            let all = '';
            if (a.length > 3) 
                all = '​'.repeat(500);
            let r = a.map(s => {
    with (s) {
        return '[ ' + sender + ' ] ⟮' + hash + '⟯\n【' + time + '】\n➵ ' + '“' + msg + '”';
    }
}).join('\n⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼\n');
            replier.reply('[ ' + a.length + '개의 채팅 기록입니다 ]\n' + all + '\n' + r);
        }
    }
}
