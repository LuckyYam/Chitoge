/** @format */

import { wiki } from "vtuber-wiki";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "vtuber",
			description: `Will give you the data of the given vtuber.`,
			aliases: ["vt"],
			category: "weeb",
			usage: `${client.config.prefix}vtuber [name]`,
			baseXp: 40,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!joined) return void (await M.reply(`Give me a vtuber name, Baka!`));
		const name = joined.trim();
		const vtuber = await wiki(name);
		let text = "";
		text += `💙 *Name: ${vtuber.title1}*\n`;
		text += `💛 *Nickname: ${vtuber.nick_name}*\n`;
		text += `💚 *Original Name: ${vtuber.original_name}*\n`;
		text += `✨ *Debuted on: ${vtuber.debut_date}*\n`;
		text += `💫 *Gender: ${vtuber.gender}*\n`;
		text += `🎂 *Age: ${vtuber.age}*\n`;
		text += `🎁 *Birthday: ${vtuber.birthday}*\n`;
		text += `📍 *Height: ${vtuber.height}*\n`;
		text += `⚖ *Weight: ${vtuber.weight}*\n`;
		text += `❄ *Zodiac Sign: ${vtuber.zodiac_sign}*\n`;
		text += `🧧 *Emoji: ${vtuber.emoji}*\n\n`;
		text += `♦️ *YouTube : ${vtuber.channel}*\n\n`;
		text += `🌐 *URL: ${vtuber.more}*\n\n`;
		text += `❤ *Description:* ${vtuber.description}`;
		if (vtuber == null) {
			return void M.reply(`Couldn't find any matching VTuber.`);
		}
		const buffer = await request.buffer(vtuber.image_url).catch((e) => {
			return void M.reply(e.message);
		});
		while (true) {
			try {
				M.reply(
					buffer || "✖ An error occurred. Please try again later",
					MessageType.image,
					undefined,
					undefined,
					`${text}`,
					undefined
				).catch((e) => {
					console.log(
						`This error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`
					);
					// console.log('Failed')
					M.reply(`✖ An error occurred. Please try again later.`);
				});
				break;
			} catch (e) {
				// console.log('Failed2')
				M.reply(`✖ An error occurred. Please try again later.`);
				console.log(
					`This error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`
				);
			}
		}
		return void null;
	};
}
