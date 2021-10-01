import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'
import request from '../../lib/request'
import { MessageType } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'screenshot',
            description: 'Takes screenshot from the given url.',
            aliases: ['ss', 'ssweb'],
            category: 'utils',
            usage: `${client.config.prefix}screenshot [url]`
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (!joined) return void (await M.reply(`Provide the url, Baka!`))
        const chitoge = joined.trim()
        return void M.reply( await request.buffer(`https://shot.screenshotapi.net/screenshot?&url=${chitoge}&full_page=true&fresh=true&output=image&file_type=jpeg&image_quality=80&wait_for_event=load`),
        MessageType.image,
                    undefined,
                    undefined,
                    `🌟 Here you go\n`,
                    undefined
                ).catch((e) => {
                    console.log(`This Error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`)
                    // console.log('Failed')
                    M.reply(`✖ An error occurred. Please try again later.`)
                })
                break
            } catch (e) {
                // console.log('Failed2')
                M.reply(`✖ An error occurred. Please try again later.`)
                console.log(`This Error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`)
            }
        }
        return void null
    }
}
