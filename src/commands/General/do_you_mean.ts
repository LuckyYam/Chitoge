import { MessageType } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import request from '../../lib/request'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: '',
         

        })
    }



    run = async (M: ISimplifiedMessage): Promise<void> => {




return void M.reply(await request.buffer('https://wallpapercave.com/uwp/uwp1414983.png'),
MessageType.image,
            undefined,
            undefined,
            `*No such command! Aah...*`


)


    }







}
