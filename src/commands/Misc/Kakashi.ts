import { MessageType } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import request from '../../lib/request'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'chitoge',
            description: 'Displays the info',
            category: 'misc',
            usage: `${client.config.prefix}chitoge`,
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        

        
        
return void M.reply(await request.buffer('https://freeaddon.com/wallpaper/kakashi/thumb444x250-07.jpg'),
MessageType.image,
            undefined,
            undefined,
            `✇ *Kakashi* ✇ \n\n🍀 *Description:* Maintained Fork of WhatsApp Botto Void\n\n🌐 *URL:* https://github.com/ShinNouzen/Chitoge#readme\n\n📂 *Repository:* https://github.com/ShinNouzen/Chitoge`
           

)


    }







}
