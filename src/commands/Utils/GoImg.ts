/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import request from "../../lib/request";
import { MessageType, Mimetype } from "@adiwajshing/baileys";
import googleImage from "@marsron/google-image";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "goimage",
			description: `Will search the given image from google.`,
			aliases: ["goimg", "googleimg", "googleimage"],
			category: "utils",
			usage: `${client.config.prefix}goimg [term|amount]`,
			baseXp: 50,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		const search: any = joined.trim().split("|");
		const term: string = search[0];
		const amount: number = search[1];
		if (amount > 20)
			return void M.reply(`Do you want me to spam in this group?`);
		const img = await googleImage(term);
		for (let i = 0; i < amount; i++) {
			const res = `*🌟 Here you go.*`;
			this.client.sendMessage(M.from, { url: img[i].url }, MessageType.image, {
				quoted: M.WAMessage,
				mimetype: Mimetype.png,
				caption: `${res}`,
			});
			await M.reply(`Wait..`);
		}
	};
}
