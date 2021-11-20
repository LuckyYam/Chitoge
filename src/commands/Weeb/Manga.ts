import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import { Manga } from "mailist";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";
// import { MessageType, Mimetype } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "manga",
			description: `Gives you the data of the given manga from MyAnimeList.`,
			aliases: ["mnga"],
			category: "weeb",
			usage: `${client.config.prefix}manga [title]`,
			baseXp: 50,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!joined) return void (await M.reply(`Give me a manga title, Baka!`));
		const chitoge = joined.trim();
		const get = new Manga();
		const search = await get
			.manga(chitoge)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.catch((err: any) => {
				return void M.reply(`Couldn't find any matching manga title.`);
			});
		let text = "";
		text += `🎀 *Title: ${search.data.anime.results[0].title.romaji}*\n`;
		text += `📈 *Status: ${search.data.anime.results[0].status}*\n`;
		text += `🎋 *Format: ${search.data.anime.results[0].format}*\n`;
		text += `💮 *Genres: ${search.data.anime.results[0].genres.join(", ")}*\n`;
		text += `🌸 *Total Volumes: ${search.data.anime.results[0].volumes}*\n`;
		text += `🎗 *Total Chapters: ${search.data.anime.results[0].chapters}*\n`;
		text += `✨ *Published on: ${search.data.anime.results[0].startDate.day}-${search.data.anime.results[0].startDate.month}-${search.data.anime.results[0].startDate.year}*\n`;
		text += `🚫 *Eechi: ${search.data.anime.results[0].isAdult}*\n`;
		text += `🌟 *Score: ${search.data.anime.results[0].meanScore}\n\n`;
		text += `🌐 *URL: ${search.data.anime.results[0].siteUrl}*\n\n`;
		text += `❄️ *Description:* ${search.data.anime.results[0].description}`;
		//	if (!search) return void M.reply(`Couldn't find any matching manga title.`);
		const buffer = await request
			.buffer(search.data.anime.results[0].coverImage.large)
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
