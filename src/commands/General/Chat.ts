/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";
import axios from "axios";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "chat",
			description: "Chat with the bot.",
			aliases: ["bot"],
			category: "general",
			usage: `${client.config.prefix}chat (text)`,
			baseXp: 30,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		if (this.client.config.mods) {
			//const myUrl = new URL(this.client.config.chatBotUrl)
			//const params = myUrl.searchParams
			await axios
				.get(
					`${encodeURI(
						`http://api.brainshop.ai/get?bid=159672&key=Lavy3jVtQdfKLvKc&uid=${M.sender.jid}&msg=${M.args}`
					)}`
				)
				.then((res) => {
					if (res.status !== 200)
						return void M.reply(`🔍 Error: ${res.status}`);
					return void M.reply(res.data.cnt);
				})
				.catch(() => {
					M.reply(`Intriguing...`);
				});
		} else {
			M.reply(
				`Chat Bot Url not set\nRefer to ${this.client.config.prefix}guide to get Chat Bot Url`
			);
		}
	};
}
