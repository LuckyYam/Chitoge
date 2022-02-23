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
			command: "character",
			description: `Searches the given character.`,
			aliases: ["chara"],
			category: "weeb",
			usage: `${client.config.prefix}chara [name]`,
			baseXp: 50,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		/*eslint-disable @typescript-eslint/no-explicit-any*/
		/*eslint-disable @typescript-eslint/no-unused-vars*/
		if (!joined) return void (await M.reply(`Give me a character name, Baka!`));
		const chitoge = joined.trim();
		const chara = await axios
			.get(`https://api.jikan.moe/v3/search/character?q=${chitoge}`)
			.catch((err: any) => {
				return void M.reply(`Couldn't find any matching character.`);
			});
		const amount = chara?.data.results.length;
		let text = "";
		for (let i = 0; i < amount; i++) {
			text += `💙 *Name: ${chara?.data.results[i].name}*\n`;
			text += `🌐 *URL: ${chara?.data.results[i].url}*\n\n`;
			text += `Use ${this.client.config.prefix}charaid ${chara?.data.results[i].mal_id} to get the full info of this character.\n\n`;
		}

		const buffer = await request.buffer(chara?.data.results[0].image_url);
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