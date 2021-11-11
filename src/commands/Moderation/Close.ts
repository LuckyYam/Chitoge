import { GroupSettingChange } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            adminOnly: true,
            command: 'close',
            description: 'Close the group for all participants. Only Admins can message',
            category: 'moderation',
            usage: `${client.config.prefix}close`,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
            return void M.reply("How can I close the group without being an admin?")
        if (M.groupMetadata.announce === 'true') return void M.reply('Group is already closed, Baka!')
        this.client.groupSettingChange(M.groupMetadata.id, GroupSettingChange.messageSend, true)
        return
    }
}
