import { MessageType, Mimetype } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import request from '../../lib/request'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'ship',
            description: 'Ship!',
            category: 'fun',
            usage: `${client.config.prefix}ship [tag users]`
        })
    }
    run = async (M: ISimplifiedMessage): Promise<void> => {
        const per = Math.floor(Math.random() * 100)

if (per < 25) { 
var sentence = `${per}% Worse than average 😔`
} else if (per < 50) {
var sentence = `${per}% I don't know about this 😬` 
} else if (per < 75) {
var sentence = `${per}% Good, I guess ⭐️` 
} else if (per < 90) {
var sentence = `${per}% Amazing! You two will be a good couple 💖 ` 
} else {
var sentence = `${per}% You two are fated to be together 💙` 
}
        const user1 = M.sender.jid
        const user2 = M.mentioned[0]
        //  let username1 = user1.split('@')[0]
        //  let username2 = user2.split('@')[0]
        // let username1 = user1.replace('@s.whatsapp.net', '')
        // let username2 = user2.replace('@s.whatsapp.net', '')
        const n = [
            './assets/videos/chitoge/ship.mp4'
        ]
        let chitoge = n[Math.floor(Math.random() * n.length)]
        return void this.client.sendMessage(M.from, { url: chitoge }, MessageType.video, {
            mimetype: Mimetype.gif,
            caption: `❣️ *Matchmaking...*
---------------------------------
    @${user1.split('@')[0]}  x  @${user2.split('@')[0]}
---------------------------------
    ${sentence}`,
            contextInfo: { mentionedJid: [user1, user2] }
        })
    }
}
