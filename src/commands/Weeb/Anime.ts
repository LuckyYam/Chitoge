import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import { Anime } from "mailist";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";
import malScraper from "mal-scraper";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "anime",
			description: `Gives you the data of the given anime from MyAnimeList.`,
			aliases: ["ani", "a"],
			category: "weeb",
			usage: `${client.config.prefix}anime [title]`,
			baseXp: 50,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!joined)
			return void (await M.reply(`Give me an anime title to search, Baka!`));
		const chitoge = joined.trim();
		const anime = await malScraper
			.getInfoFromName(chitoge)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.catch((err: any) => {
				return void M.reply(`Couldn't find any matching anime.`);
			});
		const client = new Anime();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const ani = await client.anime(chitoge).catch((err: any) => {
			return void M.reply(`Couldn't find any matching anime.`);
		});
		let text = "";
		text += `🎀 *Title: ${ani.data.anime.results[0].title.romaji}*\n`;
		text += `🎋 *Format: ${ani.data.anime.results[0].format}*\n`;
		text += `📈 *Status: ${ani.data.anime.results[0].status}*\n`;
		text += `💮 *Genres: ${ani.data.anime.results[0].genres.join(", ")}*\n`;
		text += `✨ *Based on: ${anime.source}*\n`;
		text += `📍 *Studios: ${anime.studios.join(", ")}*\n`;
		text += `🍥 *Producers: ${anime.producers.join(", ")}*\n`;
		text += `🔅 *Premiered on: ${ani.data.anime.results[0].startDate.day}-${ani.data.anime.results[0].startDate.month}-${ani.data.anime.results[0].startDate.year}*\n`;
		text += `🎐 *Season: ${ani.data.anime.results[0].season}*\n`;
		text += `🌟 *Score: ${anime.score}*\n`;
		text += `💎 *Rating: ${anime.rating}*\n`;
		text += `🏅 *Rank: ${anime.ranked}*\n`;
		text += `💫 *Popularity: ${anime.popularity}*\n`;
		text += `🎗 *Duration: ${ani.data.anime.results[0].duration}min/episode*\n`;
		text += `🚫 *Eechi: ${ani.data.anime.results[0].isAdult}*\n\n`;
		text += `♦️ *Trailer: ${anime.trailer}*\n\n`;
		text += `🌐 *URL: ${anime.url}*\n\n`;
		text += `❄ *Description:* ${anime.synopsis}`;
		const buffer = await request.buffer(ani.data.anime.results[0].coverImage.large).catch((e) => {
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
