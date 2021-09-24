import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'ship',
            description: 'Ship!',
            aliases: ['s'],
            category: 'fun',
            usage: `${client.config.prefix}ship [tag]`
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        const user1 = M.sender.jid
        const user2 = M.mentioned[0]
        const n = [
            './assets/videos/chitoge/ship.mp4'
        ]
        let chitoge = n[Math.floor(Math.random() * n.length)]
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
        return void M.reply(M.from, { url: chitoge }, MessageType.video, {
            mimetype: Mimetype.gif,
            caption: `❣️ *Matchmaking...*
---------------------------------
    @${user1.split('@')[0]}  x  @${user2.split('@')[0]}
---------------------------------
    ${sentence}`
        contextInfo: { mentionedJid: [user1, user2] }
        })
    }
}
