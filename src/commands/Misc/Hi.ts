import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'hi',
            description: 'Well....',
            category: 'misc',
            usage: `${client.config.prefix}hi`,
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        return void (await M.reply(`I don't have time to have a conversation with someone like you. Use something from *-help* list if you want anything.`))
    }
}
