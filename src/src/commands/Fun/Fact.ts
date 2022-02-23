import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'fact',
            description: 'Will send you random fact.',
            aliases: ['facts'],
            category: 'fun',
            usage: `${client.config.prefix}fact`,
            baseXp: 30
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        await axios
            .get(`https://nekos.life/api/v2/fact`)
            .then((response) => {
                // console.log(response);
                const text = `📛 *Fact:* ${response.data.fact}`
                M.reply(text)
            })
            .catch((err) => {
                M.reply(`✖  An error occurred.`)
            })
    }
}
