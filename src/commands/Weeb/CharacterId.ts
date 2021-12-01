/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import axios from "axios";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "characterid",
			description: `Gives you the data of the given character id.`,
			aliases: ["charaid"],
			category: "weeb",
			usage: `${client.config.prefix}charaid [id]`,
			baseXp: 50,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		/*eslint-disable @typescript-eslint/no-explicit-any*/
		/*eslint-disable @typescript-eslint/no-unused-vars*/
		if (!joined) return void (await M.reply(`Give me a character id, Baka!`));
		const chitoge: any = joined.trim();
		const chara = await axios
			.get(`https://api.jikan.moe/v3/character/${chitoge}`)
			.catch((err: any) => {
				return void M.reply(`Couldn't find any character id.`);
			});

		let text = "";
		text += `💙 *Name: ${chara?.data.name}*\n`;
		text += `🤍 *Kanji name: ${chara?.data.name_kanji}*\n`;
		text += `💚 *Nicknames: ${chara?.data.nicknames.join(", ")}*\n`;
		text += `💛 *Source: ${chara?.data.animeography[0].name}*\n\n`;
		text += `🌐 *URL: ${chara?.data.url}*\n\n`;
		text += `❤ *Description:* ${chara?.data.about}`;
		const buffer = await request.buffer(chara?.data.image_url);
		await M.reply(
			buffer,
			MessageType.image,
			undefined,
			undefined,
			text,
			undefined
		);
	};
}