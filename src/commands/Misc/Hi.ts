import { MessageType } from '@adiwajshing/baileys'
import { join } from 'path'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'hi',
            description: 'Say hi to the bot.',
            category: 'misc',
            usage: `${client.config.prefix}hi`
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        // from assets/images/chitoge.png
        const image = this.client.assets.get('chitoge')
        if (!image) return void null
        return void M.reply(
            image,
            MessageType.image,
            undefined,
            undefined,
            `I don't have time to have a conversation with someone like you. Use something from *:help* list if you want anything.\n`
        )
    }
}
          
       


    
        
           
           
            
            
       
        
           
           
           
   
