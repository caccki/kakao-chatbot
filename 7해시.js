function response(room, msg, sender, isGroupChat, replier, imageDB) {
    if (msg == '/hash') {
        replier.reply(java.lang.String(imageDB.getProfileBase64()).hashCode());
    }
}


