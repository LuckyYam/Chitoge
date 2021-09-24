import { MessageType, Mimetype } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import request from '../../lib/request'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'choke',
            description: 'Choke someone',
            category: 'fun-2',
            usage: `${client.config.prefix}choke [tag/quote users]`
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
            'https://c.tenor.com/ixaDEFhZJSsAAAAC/anime-choke.gif',
            'https://c.tenor.com/USfsssJOQOUAAAAC/kurosue-anime.gif',
            'https://c.tenor.com/GHXnJ26Mv9QAAAAd/bungou-stray-dogs-choke.gif',
            'https://c.tenor.com/wwEeNH2M1qoAAAAC/anime-choke.gif',
            'https://c.tenor.com/XLNHiaNsW20AAAAC/choke-anime.gif',
            'https://c.tenor.com/I9bMxR0ETPMAAAAM/dying-anime.gif',
            'https://i.gifer.com/Lt4T.gif',
            'https://image.myanimelist.net/ui/DBvbJ4grTZuOgR3YyWCliY7znqMF1sehfeBTvW4pd3yUZF6Uy-1Ad36eR_Ho11Im1eEWqB8TQcM6mCjpd3LhLg'
        ]
        let hug = n[Math.floor(Math.random() * n.length)]
        return void this.client.sendMessage(M.from, { url: hug }, MessageType.video, {
            mimetype: Mimetype.gif,
            caption: `@${user1.split('@')[0]} choked @${user2.split('@')[0]}`,
            contextInfo: { mentionedJid: [user1, user2] }
        })
    }
}
