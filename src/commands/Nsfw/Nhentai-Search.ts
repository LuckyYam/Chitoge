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
			command: "nhentai-search",
			description: `Searches the given nhentai doujin.`,
			aliases: ["nhentai-s"],
			category: "nsfw",
			usage: `${client.config.prefix}nhentai [term]`,
			baseXp: 50,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!(await this.client.getGroupData(M.from)).nsfw)
			return void M.reply(
				`Don't be a pervert, Baka! This is not an NSFW group.`
			);
		if (!joined)
			return void (await M.reply(
				`Give me an nhentai doujin title to search, Baka!`
			));
		const sHentai = new nHentai();
		const title = joined.trim();
		let text = "";
		let doujin
		try {
			doujin = await sHentai.search(title)
		} catch (error) {
return void M.reply(`Couldn't find any matching doujin.`);
		}
		for (let i = 0; i < 10; i++) {
			text += `🎀 *Title: ${doujin.results[i].titles.english}*\n`;
			text += `Use ${this.client.config.prefix}nhentai ${doujin.results[i].id} to read this doujin.\n\n`;
		}
		return void M.reply(await this.client.getBuffer(doujin.results[0].cover), MessageType.image, undefined, undefined, text)
	};
}
