let info = {};
const path = 'sdcard/note/Database';
const FS = FileStream;
const all = '​'.repeat(500);
let reload;
function response(room, msg, sender, isGroupChat, replier, imageDB) {
    if (!isGroupChat)
        return;
    let DB = java.lang.String(imageDB.getProfileBase64()).hashCode().toString();
    if (!reload) {
        info = JSON.parse(FS.read(path));
        reload = true;
    }
    if (!info[DB]) {
        info[DB] = {
    start: new Date().toLocaleString().slice(0, -9).trim(), 
    notes: [], 
    hash: DB, 
    name: sender, 
    notification: false, 
    noting: false};
        FS.write(path, JSON.stringify(info, null, 4));
    }
    if (info[DB].notification) {
        let a = Object.keys(info[DB].notes).map((s, i) => {
    s = info[DB].notes[i];
    return '[ ' + (i + 1) + ' ] - { ' + s.from + '(' + s.fromhash + ')' + ' }\n< ' + s.time + ' >\n(' + s.room + ')\n⌁ ' + s.content;
});
        replier.reply('[ ' + sender + '(' + DB + ') 님, ' + a.length + '개의 쪽지가 ' + sender + ' 님을 기다리고 있어요! ]\n' + all + '\n' + a.join('\n\n\n'));
        info[DB].notes = [];
        info[DB].notification = false;
        FS.write(path, JSON.stringify(info, null, 4));
    }
    if (msg.startsWith('; ;')) {
        let t = msg.slice(3).trim();
        let a = Object.keys(info).map((s, i) => {
    if (info[s].name.includes(t)) {
        return '[' + (i + 1) + '] ' + info[s].name + '(' + info[s].hash + ') - < ' + info[s].start + ' >';
    }
});
        replier.reply('====== [ Database ] ======\n' + all + '\n' + a.join('\n') + '\n\n');
    }
    if (msg.startsWith('; @')) {
        let a = msg.slice(3).trim();
        let f = Object.keys(info).map(s => info[s].name);
        if (f.includes(a)) {
            f = f.filter(s => a == s);
            if (f.length > 1) {
                replier.reply('동일 닉네임을 가진 사용자가 2명 이상 감지되었습니다.\n\'; ; 닉네임\' 명령어로 사용자의 아이디를 찾아 입력하십시오.');
                return;
            }
            a = info[Object.keys(info).find(s => info[s].name == a)].hash;
        }
        try {
            info[a].notes;
        }    catch (e) {
    replier.reply('아직 데이터베이스(Database)에 저장되지 않은 사용자입니다.');
    return;
}
        replier.reply(info[a].name + ' 님에게 쪽지를 전송합니다.\n쪽지 내용은 무엇인가요?');
        info[DB].noting = true;
        info[DB].target = a;
        FS.write(path, JSON.stringify(info, null, 4));
        return;
    }
    if (info[DB].noting) {
        let a = info[DB].target;
        replier.reply('🗹 ' + info[a].name + ' 님이 오면 쪽지를 전달할게요!');
        info[a].notes.push({
    from: sender, 
    fromhash: DB, 
    to: a, 
    tohash: info[a].hash, 
    content: msg, 
    room: room, 
    time: new Date().toLocaleString().slice(0, -9).trim()});
        info[a].notification = true;
        info[DB].noting = false;
        delete info[DB].target;
        FS.write(path, JSON.stringify(info, null, 4));
    }
}
