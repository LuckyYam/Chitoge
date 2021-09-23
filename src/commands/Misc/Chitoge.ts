import { MessageType } from '@adiwajshing/baileys'
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
        return void M.reply(
            `🌟 *Chitoge* 🌟\n\n🍀 *Description: Maintained Fork of WhatsApp Botto Void*\n\n🌐 *URL: https://github.com/ShinNouzen/Chitoge* \n`
        )
    }
}
          
       


    
        
           
           
            
            
        
    

    
        
           
           
           
   
