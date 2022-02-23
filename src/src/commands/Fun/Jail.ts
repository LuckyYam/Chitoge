/** @format */

import Canvacord from "canvacord";
import { MessageType } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "jail",
			description: "Who wanna go to jail for being horny?",
			category: "fun",
			usage: `${client.config.prefix}jail [tag/quote]`,
			baseXp: 30,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		const image = await (M.WAMessage?.message?.imageMessage
			? this.client.downloadMediaMessage(M.WAMessage)
			: M.quoted?.message?.message?.imageMessage
			? this.client.downloadMediaMessage(M.quoted.message)
			: M.mentioned[0]
			? this.client.getProfilePicture(M.mentioned[0])
			: this.client.getProfilePicture(M.quoted?.sender || M.sender.jid));
		if (!image) return void M.reply(`Couldn't fetch the required Image`);
		const result = await Canvacord.Canvacord.jail(image, false);
		await M.reply(
			result,
			MessageType.image,
			undefined,
			undefined,
			undefined,
			undefined
		);
	};
}
