import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'joke',
            description: 'Will send you random joke.',
            aliases: ['j'],
            category: 'fun-2',
            usage: `${client.config.prefix}joke`
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        await axios
            .get(`https://v2.jokeapi.dev/joke/Any?safe-mode`)
            .then((response) => {
                // console.log(response);
                const text = `🎀 *Category:* ${response.data.category}\n\n*📛 Joke:* ${response.data.setup}\n\n*📝 Answer:* ${response.data.delivery}`
                M.reply(text)
            })
            .catch((err) => {
                M.reply(`✖ An error occured: ${err}`)
            })
    }
}
