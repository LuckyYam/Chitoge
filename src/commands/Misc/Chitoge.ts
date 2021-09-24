import { MessageType, Mimetype } from '@adiwajshing/baileys'
import { join } from 'path'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'chitoge',
            description: 'Displays the info.',
            category: 'misc',
            usage: `${client.config.prefix}chitoge`
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        const n = [
            'https://pa1.narvii.com/5906/669dfb4c7243b2d4d511fbee7ef0d7884c65c675_hq.gif'
        ]
        let chitoge = n[Math.floor(Math.random() * n.length)]
        return void this.client.sendMessage(M.from, { url: chitoge }, MessageType.video, {
            mimetype: Mimetype.gif,
            caption: `🌟 *Chitoge* 🌟\n\n🍀 *Description: Maintained Fork of WhatsApp Botto Void*\n\n🌐 *URL: https://github.com/ShinNouzen/Chitoge* \n\n 📒 *Guide: https://github.com/ShinNouzen/Chitoge-Guides* \n` }
        )
    }
}
          
       


    
        
           
           
            
            
        
    

    
        
           
           
           
   
