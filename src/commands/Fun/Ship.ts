import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'ship',
            description: 'Ship!',
            aliases: ['s'],
            category: 'fun',
            usage: `${client.config.prefix}ship [tag]`
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        arg = body.trim().split(' ')
            const per = Math.floor(Math.random() * 100)

if (per < 25) { 
var sentence = `${per}% Worse than average 😔`
} else if (per < 50) {
var sentence = `${per}% I don't know about this 😬` 
} else if (per < 75) {
var sentence = `${per}% Good, I guess ⭐️` 
} else if (per < 90) {
var sentence = `${per}% Amazing! You two will be a good couple 💖 ` 
} else {
var sentence = `${per}% You two are fated to be together 💙` 
}
        return void M.reply(
            `❣️ *Matchmaking...*
---------------------------------
    *${arg[1]}  x  ${arg[2]}*
---------------------------------
    ${sentence}`
        ).catch((reason: any) => M.reply(`✖ An error occurred, Reason: ${reason}`))
    }
}
