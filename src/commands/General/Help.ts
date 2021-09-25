import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ICommand, IParsedArgs, ISimplifiedMessage } from '../../typings'
import { MessageType, MessageOptions, Mimetype } from '@adiwajshing/baileys'
import request from '../../lib/request'


export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'help',
            description: 'Displays the help menu or shows the info of the command provided',
            category: 'general',
            usage: `${client.config.prefix}help (command_name)`,
            aliases: ['h']
        })
    }

    run = async (M: ISimplifiedMessage, parsedArgs: IParsedArgs): Promise<void> => {
            const rows = [
 {title: 'help', description: "🚀 *Command:* Help \n⛩ *Category:* General\n♦️ *Aliases:* H\n💎 *Usage:* ${this.client.config.prefix}help [command]\n\n📒 *Description:* Displays the help menu or shows the info of the command provided.", rowId:"rowid1"},
 {title: 'admins', description: "🚀 *Command:* Admins \n⛩ *Category:* General\n💎 *Usage:* ${this.client.config.prefix}admins\n\n📒 *Description:* Tags all admins 🎖️", rowId:"rowid2"},
 {title: 'google', description: "🚀 *Command:* Google \n⛩ *Category:* General\n♦️ *Aliases:* G, Search\n💎 *Usage:* ${this.client.config.prefix}google [title]\n\n📒 *Description:* ️Searches the given title in google.", rowId:"rowid3"},
 {title: 'mods', description: "🚀 *Command:* Mods \n⛩ *Category:* General\n♦️ *Aliases:* Moderators, Mod, Owner\n💎 *Usage:* ${this.client.config.prefix}mod \n\n📒 *Description:* ️Displays the Moderator's contact info.", rowId:"rowid4"},
 {title: 'profile', description: "🚀 *Command:* Profile \n⛩ *Category:* General\n♦️ *Aliases:* P\n💎 *Usage:* ${this.client.config.prefix}profile [Tag/Quote user]\n\n📒 *Description:* ️Displays user-profile 📜", rowId:"rowid5"},
 {title: 'xp', description: "🚀 *Command:* Xp \n⛩ *Category:* General\n♦️ *Aliases:* Exp\n💎 *Usage:* ${this.client.config.prefix}xp [Tag/Quote user] \n\n📒 *Description:* ️Displays user's Xp ⭐", rowId:"rowid6"},
 {title: 'xp', description: "🚀 *Command:* Xp \n⛩ *Category:* General\n♦️ *Aliases:* Exp\n💎 *Usage:* ${this.client.config.prefix}xp [Tag/Quote user] \n\n📒 *Description:* ️Displays user's Xp ⭐", rowId:"rowid7"},
 {title: 'Bite', description: "🚀 *Command:* Bite\n⛩ *Category:* Fun\n💎 *Usage:* ${this.client.config.prefix}bite [Tag/Quote user] \n\n📒 *Description:* ️Bite Someone.", rowId:"rowid8"},
 {title: 'Bonk', description: "🚀 *Command:* Bonk \n⛩ *Category:* Fun\n💎 *Usage:* ${this.client.config.prefix}bite [Tag/Quote user] \n\n📒 *Description:* ️Bonk Someone", rowId:"rowid9"},
 {title: 'Chess', description: "🚀 *Command:* Chess \n⛩ *Category:* Fun\n💎 *Usage:* ${this.client.config.prefix}chess \n\n📒 *Description:* Play chess.", rowId:"rowid10"},
 {title: 'Bonk', description: "🚀 *Command:* Bonk \n⛩ *Category:* Fun\n💎 *Usage:* ${this.client.config.prefix}bite [Tag/Quote user] \n\n📒 *Description:* ️Bonk Someone", rowId:"rowid11"}
]
            const buttons = [
  {buttonId: 'id1', buttonText: {displayText: 'Test'}, type: 1},
  {buttonId: 'id2', buttonText: {displayText: 'Well'}, type: 1}
]
            const buttonMessage = {
    contentText: "Hi it's button message",
    footerText: 'Hello World',
    buttons: buttons,
    headerType: 1
}
            
        if (!parsedArgs.joined) {
            const commands = this.handler.commands.keys()
            const categories: { [key: string]: ICommand[] } = {}
            for (const command of commands) {
                const info = this.handler.commands.get(command)
                if (!command) continue
                if (!info?.config?.category || info.config.category === 'dev') continue
                if (Object.keys(categories).includes(info.config.category)) categories[info.config.category].push(info)
                else {
                    categories[info.config.category] = []
                    categories[info.config.category].push(info)
                }
            }
            let text = `👋🏻 (💙ω💙) Konichiwa! *${M.sender.username}*, I'm Chitoge.\n\nMy prefix is - ":"\n\nThe usable commands are listed below.\n\n`
            const keys = Object.keys(categories)
            for (const key of keys)
                text += `${this.emojis[keys.indexOf(key)]} *${this.client.util.capitalize(key)}*\n❐ \`\`\`${categories[
                    key
                ]
                    .map((command) => command.config?.command)
                    .join(', ')}\`\`\`\n\n`
            return void this.client.sendMessage(M.from, buttonMessage, MessageType.buttonsMessage,
                 `${text} 📝 *Note: Use ${this.client.config.prefix}help <command_name> to view the command info*` }
            )
        }
        const key = parsedArgs.joined.toLowerCase()
        const command = this.handler.commands.get(key) || this.handler.aliases.get(key)
        if (!command) return void M.reply(`No Command of Alias Found | "${key}"`)
        const state = await this.client.DB.disabledcommands.findOne({ command: command.config.command })
        M.reply(
            `🚀 *Command:* ${this.client.util.capitalize(command.config?.command)}\n📉 *Status:* ${
                state ? 'Disabled' : 'Available'
            }\n⛩ *Category:* ${this.client.util.capitalize(command.config?.category || '')}${
                command.config.aliases
                    ? `\n♦️ *Aliases:* ${command.config.aliases.map(this.client.util.capitalize).join(', ')}`
                    : ''
            }\n🎐 *Group Only:* ${this.client.util.capitalize(
                JSON.stringify(!command.config.dm ?? true)
            )}\n💎 *Usage:* ${command.config?.usage || ''}\n\n📒 *Description:* ${command.config?.description || ''}`
        )
    }

    emojis = ['♟', '♻️', '🌈', '🎵', '❄', '👑', '🚫', '♦️', '✨']
}
