/** @format */

import nHentai from "shentai";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import { MessageType } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "nhentai",
			description: `Searches the given nhentai doujin.`,
			aliases: ["nhentai"],
			category: "nsfw",
			usage: `${client.config.prefix}nhentai [term]`,
			baseXp: 50,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		/*eslint-disable @typescript-eslint/no-explicit-any*/
		/*eslint-disable @typescript-eslint/no-unused-vars*/
		if (!joined)
			return void (await M.reply(
				`Give me an nhentai doujin title to search, Baka!`
			));
		const sHentai = new nHentai();
		const title = joined.trim();
		const doujin = await sHentai.search(title).catch((err: any) => {
			return void M.reply(`Couldn't find any matching doujin.`);
		});
		for (let i = 0; i < 10; i++) {
			let text = "";
			text += `🎀 *Title: ${doujin.results[i].titles.english}*\n`;
			text += `Use ${this.client.config.prefix}ndoujin ${doujin.results[i].id} | 1 to read this doujin.\n\n`;
			this.client.sendMessage(
				M.from,
				{ url: doujin.results[0].cover },
				MessageType.image,
				{
					quoted: M.WAMessage,
					caption: `${text}`,
				}
			);
		}
	};
}
