/** @format */

import vTuberWiki, { IVTuber } from "../../lib/vTuberWiki";
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
		if (!joined) return void (await M.reply(`Give me a vTuber, Baka!`));
		const result = await vTuberWiki(joined.toLowerCase().trim());
		if ((result as { error: string }).error)
			return void (await M.reply("No such vTuber, Baka!"));
		const vtuber = result as IVTuber;
		let text = "";
		text += `💙 *Name: ${vtuber.title1}*\n`;
		text += `💛 *Nickname: ${vtuber.nick_name
			.replace(/\[/g, "")
			.replace(/\]/g, "")
			.replace(/\<ref>/g, " ")
			.replace(/\<br>/g, " ")}*\n`;
		if (vtuber.original_name !== "")
			text += `💚 *Original Name: ${vtuber.original_name}*\n`;
		text += `✨ *Debuted on: ${vtuber.debut_date
			.replace(/\[/g, "")
			.replace(/\]/g, "")
			.replace(/\<ref>/g, " ")
			.replace(/\<br>/g, " ")
			.replace(/\<\/ref>/g, "")}*\n`;
		text += `💫 *Gender: ${vtuber.gender}*\n`;
		if (vtuber.age !== "")
			text += `🎂 *Age: ${vtuber.age
				.replace(/\[/g, "")
				.replace(/\]/g, "")
				.replace(/\<ref>/g, "")
				.replace(/\<br>/g, "")}*\n`;
		if (vtuber.birthday !== "") text += `🎁 *Birthday: ${vtuber.birthday}*\n`;
		if (vtuber.height !== "")
			text += `📍 *Height: ${vtuber.height
				.replace(/\[/g, "")
				.replace(/\]/g, "")
				.replace(/\<ref>/g, "")
				.replace(/\<br>/g, "")
				.replace(/\:File:Hololive VTuber Height Difference.jpg/g, "")}*\n`;
		if (vtuber.weight !== "") text += `⚖ *Weight: ${vtuber.weight}*\n`;
		if (vtuber.zodiac_sign !== "")
			text += `❄ *Zodiac Sign: ${vtuber.zodiac_sign}*\n`;
		if (vtuber.emoji !== "") text += `🧧 *Emoji: ${vtuber.emoji}*\n\n`;
		text += `♦️ *Channels : ${vtuber.channel
			.replace(/\[/g, "")
			.replace(/\]/g, "")
			.replace(/\YouTube/g, "")
			.replace(/\<br>/g, "")}*\n\n`;
		text += `🌐 *URL: ${vtuber.more}*\n\n`;
		text += `❤ *Description:* ${vtuber.description
			.replace(/\[/g, "")
			.replace(/\]/g, "")
			.replace(/\<ref>/g, " ")
			.replace(/\<br>/g, " ")}`;
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
