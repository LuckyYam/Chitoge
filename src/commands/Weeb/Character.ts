import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import { Character } from "mailist";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";
// import { MessageType, Mimetype } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "character",
			description: `Gives you the data of the given character.`,
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
		if (!joined)
			return void (await M.reply(`Give me an anime character name, Baka!`));
		const chitoge = joined.trim();
		const client = new Character();
		const chara = await client.character(chitoge).catch((err: any) => {
			return void M.reply(`Couldn't find any matching character.`)
		});
		//if (!chara)
			//return void (await M.reply(`Couldn't find any matching character.`));
		let text = "";
		text += `💙 *Name: ${chara.data.characters.results[0].name.full}*\n`;
		text += `💛 *Source: ${chara.data.characters.results[0].media.edges[0].node.title.userPreferred}*\n\n`;
		text += `🌐 *URL: ${chara.data.characters.results[0].siteUrl}*\n\n`;
		text += `❤ *Description:* ${chara.data.characters.results[0].description}\n`;

		const buffer = await request
			.buffer(chara.data.characters.results[0].image.large)
			.catch((e) => {
				return void M.reply(e.message);
			});
		while (true) {
			try {
				M.reply(
					buffer || "✖ An error occurred. Please try again later.",
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
