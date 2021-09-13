import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'
import request from '../../lib/request'
import { MessageType } from '@adiwajshing/baileys'
// import { MessageType, Mimetype } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'megumin-paper',
            description: 'Sends you random megumin image',
            aliases: ['megumin-simp'],
            category: 'weeb',
            usage: `${client.config.prefix}megumin-paper`
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        // fetch result of https://api.waifu.pics/sfw/megumin from the API using axios
        const { data } = await axios.get('https://api.waifu.pics/sfw/megumin')
        const buffer = await request.buffer(data.url).catch((e) => {
            return void M.reply(e.message)
        })
        let counter = 0
        while (true) {
            counter += 1
            try {
                M.reply(
                    buffer || 'Could not fetch image. Please try again later',
                    MessageType.image,
                    undefined,
                    undefined,
                    `🌟 For Megumin Simp UwU\n`,
                    undefined
                )
                break
            } catch (e) {
                console.log(e)
            }
        }
        return void null
    }
}
