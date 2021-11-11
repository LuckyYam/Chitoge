/** @format */

import { MessageType, Mimetype } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "chitoge",
			description: "Displays the info",
			category: "general",
			usage: `${client.config.prefix}chitoge`,
			baseXp: 200,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		const n = ["./assets/videos/Chitoge/chitoge-git.mp4"];
		const chitoge = n[Math.floor(Math.random() * n.length)];
		return void this.client.sendMessage(
			M.from,
			{ url: chitoge },
			MessageType.video,
			{
				quoted: M.WAMessage,
				mimetype: Mimetype.gif,
				caption: `🌟 *Chitoge* 🌟\n\n🍀 *Description: Maintained Fork of WhatsApp Botto Void*\n\n🌐 *URL: https://github.com/ShinNouzen/Chitoge* \n\n 📒 *Guide: https://github.com/ShinNouzen/Chitoge-Guides* \n`,
			}
		);
	};
}
