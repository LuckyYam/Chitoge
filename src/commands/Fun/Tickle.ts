import { MessageType, Mimetype } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import request from '../../lib/request'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'tickle',
            description: 'Tickle someone',
            category: 'fun-2',
            usage: `${client.config.prefix}tickle [tag/quote users]`
        })
    }
    run = async (M: ISimplifiedMessage): Promise<void> => {
        const user1 = M.sender.jid
        const user2 = M.mentioned[0]
        //  let username1 = user1.split('@')[0]
        //  let username2 = user2.split('@')[0]
        // let username1 = user1.replace('@s.whatsapp.net', '')
        // let username2 = user2.replace('@s.whatsapp.net', '')
        const n = [
            './assets/videos/tickle/tickle2.mp4',
            './assets/videos/tickle/tickle1.mp4',
            './assets/videos/tickle/tickle.mp4'
        ]
        let hug = n[Math.floor(Math.random() * n.length)]
        return void this.client.sendMessage(M.from, { url: hug }, MessageType.video, {
            mimetype: Mimetype.gif,
            caption: `*@${user1.split('@')[0]} tickled @${user2.split('@')[0]}*`,
            contextInfo: { mentionedJid: [user1, user2] }
        })
    }
}
