/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";
import akaneko from "akaneko";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";
// import { MessageType, Mimetype } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "pussy",
			description: `Will send you random pussy image.`,
			aliases: ["pussy"],
			category: "nsfw",
			usage: `${client.config.prefix}pussy`,
			baseXp: 50,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		// fetch result of https://nekos.life/api/v2/img/wallpaper from the API using axios
		const wall = await akaneko.nsfw.pussy();
		if (!(await this.client.getGroupData(M.from)).nsfw)
			return void M.reply(
				`Don't be a pervert, Baka! This is not an NSFW group.`
			);
		const buffer = await request.buffer(wall).catch((e) => {
			return void M.reply(e.message);
		});
		while (true) {
			try {
				M.reply(
					buffer || "Could not fetch image. Please try again later",
					MessageType.image,
					undefined,
					undefined,
					`🌟\n`,
					undefined
				).catch((e) => {
					console.log(
						`This Error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`
					);
					// console.log('Failed')
					M.reply(`Could not fetch image. Here's the URL: ${wall}`);
				});
				break;
			} catch (e) {
				// console.log('Failed2')
				M.reply(`Could not fetch image. Here's the URL : ${wall}`);
				console.log(
					`This Error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`
				);
			}
		}
		return void null;
	};
}
