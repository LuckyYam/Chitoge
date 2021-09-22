import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'darkjoke',
            description: 'Will send you random dark joke.',
            aliases: ['djoke'],
            category: 'fun',
            usage: `${client.config.prefix}darkjoke`
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        await axios
            .get(`https://v2.jokeapi.dev/joke/Dark?blacklistFlags=nsfw&type=twopart`)
            .then((response) => {
                // console.log(response);
                const text = `🎀 *Category* : ${response.data.category}\n📛 *Joke* : ${response.data.setup}\n🎗️ *Delivery* : ${response.data.delivery}`
                M.reply(text)
            })
            .catch((err) => {
                M.reply(`✖ An error occured: ${err}`)
            })
    }
}
