import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'anime-line',
            description: 'Will send you random anime line said by a character.',
            aliases: ['ani-line'],
            category: 'weeb',
            usage: `${client.config.prefix}anime-line`
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        await axios
            .get(`https://animechan.vercel.app/api/random`)
            .then((response) => {
                // console.log(response);
                const text = `*🎀 Line: ${response.data.quote}*\n*🎗 Said by: ${response.data.character}*\n*📛 Source: ${response.data.anime}*`
                M.reply(text)
            })
            .catch((err) => {
                M.reply(`✖ An error occurred: ${err}`)
            })
    }
}
