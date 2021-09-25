import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'genshin-chara',
            description: 'Gives you the stats of the given character.',
            aliases: ['gchara'],
            category: 'dev',
            usage: `${client.config.prefix}quote`
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        await axios.get(`https://api.genshin.dev/characters/albedo`)
        .then((response) => {
                // console.log(response);
                const text = `💎 *Name: ${response.data.name}*\n💠 *Vision: ${response.data.vision}*\n📛 *Weapon: ${response.data.weapon}*\n⛩ *Nation: ${response.data.nation}*\n📛 *Affiliation: ${response.data.affiliation}*\n❄ *Constellation: ${response.data.constellation}*\n🎗 *Rarity: ${response.data.rarity}*\n🎁 *Birthday: ${response.data.birthday}*\n💚 *Description: ${response.data.description}* `
                M.reply(text);
            }).catch(err => {
                M.reply(`✖ An error occurred: ${err}`)
            }
            )
    };
}
