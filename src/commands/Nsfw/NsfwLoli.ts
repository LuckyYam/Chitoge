/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";
import Loli from "lolis.life";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";
// import { MessageType, Mimetype } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "nsfwloli",
			description: `Will send you random nsfw loli image.`,
			aliases: ["nloli"],
			category: "nsfw",
			usage: `${client.config.prefix}nsfwloli `,
			baseXp: 50,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		// fetch result of https://waifu.pics/api/sfw/waifu from the API using axios
		const loli = new Loli();
		const i = await loli.getNSFWLoli();
		if (!(await this.client.getGroupData(M.from)).nsfw)
			return void M.reply(
				`Don't be a pervert, Baka! This is not an NSFW group.`
			);
		const buffer = await request.buffer(i.url).catch((e) => {
			return void M.reply(e.message);
		});
		while (true) {
			try {
				M.reply(
					buffer || "Could not fetch image. Please try again later",
					MessageType.image,
					undefined,
					undefined,
					`*Onee-chan*\n`,
					undefined
				).catch((e) => {
					console.log(
						`This Error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`
					);
					// console.log('Failed')
					M.reply(`Could not fetch image. Here's the URL: ${i.url}`);
				});
				break;
			} catch (e) {
				// console.log('Failed2')
				M.reply(`Could not fetch image. Here's the URL : ${i.url}`);
				console.log(
					`This Error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`
				);
			}
		}
		return void null;
	};
}
