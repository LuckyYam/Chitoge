import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'anime-quote',
            description: 'Will send you random anime quote',
            aliases: ['ani-quote'],
            category: 'fun',
            usage: `${client.config.prefix}anime-quote`
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        await axios
            .get(`https://animechan.vercel.app/api/random`)
            .then((response) => {
                // console.log(response);
                const text = `🍀 *Source:* ${response.data.anime}\n*💠 Charecter:* ${response.data.character}\n*🌀 Quote:* ${response.data.quote}`
                M.reply(text)
            })
            .catch((err) => {
                M.reply(`✖ An error occurred: ${err}`)
            })
    }
}
