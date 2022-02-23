import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";
//import axios from "axios";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";
// import { MessageType, Mimetype } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "loli",
			description: `Will send you random loli image.`,
			aliases: ["loli"],
			category: "weeb",
			usage: `${client.config.prefix}loli `,
			baseXp: 50,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		const images = JSON.parse((this.client.assets.get('lolis') as Buffer).toString()) as unknown as {
			lolis: {
				id: number,
				url: string
			}[]
		}
		const loli = images.lolis[Math.floor(Math.random() * images.lolis.length)]
		const buffer = await request
			.buffer(loli.url)
			.catch((e) => {
				return void M.reply(e.message);
			});
		while (true) {
			try {
				M.reply(
					buffer || "Could not fetch image. Please try again later",
					MessageType.image,
					undefined,
					undefined,
					`*Ya...*\n`,
					undefined
				).catch((e) => {
					console.log(
						`This Error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`
					);
					// console.log('Failed')
					M.reply(
						`Could not fetch image. Here's the URL: ${loli.url}`
					);
				});
				break;
			} catch (e) {
				// console.log('Failed2')
				M.reply(
					`Could not fetch image. Here's the URL : ${loli.url}`
				);
				console.log(
					`This Error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`
				);
			}
		}
		return void null;
	};
}
