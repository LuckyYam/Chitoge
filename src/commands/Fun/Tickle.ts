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
            'https://m.imgur.com/bt2ZRjJ',
            'https://c.tenor.com/L5-ABrIwrksAAAAC/tickle-anime.gif',
            'https://c.tenor.com/PXL1ONAO9CEAAAAC/tickle-laugh.gif'
        ]
        let tickle = n[Math.floor(Math.random() * n.length)]
        return void this.client.sendMessage(M.from, { url: tickle }, MessageType.video, {
            mimetype: Mimetype.gif,
            caption: `@${user1.split('@')[0]} tickled @${user2.split('@')[0]}`,
            contextInfo: { mentionedJid: [user1, user2] }
        })
    }
}
