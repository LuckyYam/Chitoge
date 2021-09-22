import { MessageType } from '@adiwajshing/baileys'
import { join } from 'path'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IPackage, ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'hi',
            description: 'Well....',
            category: 'misc',
            usage: `${client.config.prefix}hi`
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const image = this.client.assets.get('HI')
        if (!image) return void null
        return void M.reply(
            image,
            MessageType.image,
            undefined,
            undefined,
            `I don't have to have a conversation with someone like you. Use something from *:help* list if you want anything.`
        )
    }
}
