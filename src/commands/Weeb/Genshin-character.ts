import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'genshin-character',
            aliases: ['gchara'],
            description: 'Displays the stats of the given genshin character.',
            category: 'weeb',
            dm: true,
            usage: `${client.config.prefix}genshin-character [character]`
        })
    }
    // static count = 0
    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        if (!joined) return void M.reply('✖ Please provide the name of the character you wanna search.')
        const term = joined.trim()
        await axios
            .get(
                `https://api.genshin.dev/characters/${term}`
            )
            .then((res) => {
        if (res.status !== 200) return void M.reply(`✖ Error: ${res.status}`)
                let result = ``
                let index = 1
                for (const item of res.data?.items) {
                    result += `🌟 *Name: ${response.data.name}*\n💠 *Vision: ${response.data.vision}*\n🎋 *Nation: ${response.data.nation}\n📛 *Affiliation: ${response.data.affiliation}*\n♦️ *Rarity: ${response.data.rarity}* 🌟\n❄ *Constellation: ${response.data.constellation}\n🎁 *Birthday: ${response.data.birthday}\n📒 *Description: ${response.data.description}  `
                    index++
                }
                // return void M.reply(`🔍 Command Used : Result for *${term} character*\n\n\n ${result}`)
                return void M.reply(`${result}`)
            })
            .catch((err) => {
                M.reply(`🔍 Error: ${err}`)
            })
    }
}
