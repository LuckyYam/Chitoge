import { MessageType } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import request from '../../lib/request'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import  axios  from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'rpaper',
            description: 'Will send you random anime wallpaper',
            category: 'weeb',
            usage: `${client.config.prefix}rpaper`,
            
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {


        const rnekol = ["wallpaper"];
        const rnekolc = rnekol[Math.floor(Math.random() * rnekol.length)];
        const neko = await axios.get('https://nekos.life/api/v2/img/' + rnekolc)

return void M.reply(await request.buffer(neko.data.url), MessageType.image, undefined, undefined, `*Here you go 🌟*`)



    }








}
