import { MessageType, Mimetype } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import request from '../../lib/request'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import  axios  from 'axios'


export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'blowjob',
            description: 'Will send u random blowjob',
            category: 'nsfw',
            usage: `${client.config.prefix}blowjob`,
            
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        
        const rnekol = ["blowjob"];
        const rnekolc = rnekol[Math.floor(Math.random() * rnekol.length)];
        const neko = await axios.get('https://api.pics.waifu/nsfw/' + rnekolc)

return void M.reply(await request.buffer(neko.data.payload.url), MessageType.video, undefined, undefined,`*🌟 Here you go*`)
}
}
