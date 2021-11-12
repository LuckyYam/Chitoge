import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import { Anime } from "mailist";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";
// import { MessageType, Mimetype } from '@adiwajshing/baileys'

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
		if (!joined) return void (await M.reply(`Give me an anime title, Baka!`));
		const chitoge = joined.trim();
		const client = new Anime();
		const ani = await client.anime(chitoge).catch(() => null);
		if (!ani) return void (await M.reply(`Couldn't find any matching term.`));
		const buffer = await request
			.buffer(ani.data.anime.results[0].coverImage.large)
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
					`🎀 *Title: ${ani.data.anime.results[0].title.romaji}*\n🎋 *Format: ${ani.data.anime.results[0].format}*\n📈 *Status: ${ani.data.anime.results[0].status}*\n💮 *Genres: ${ani.data.anime.results[0].genres}*\n🔅 *Premiered on: ${ani.data.anime.results[0].startDate.day}-${ani.data.anime.results[0].startDate.month}-${ani.data.anime.results[0].startDate.year}*\n🎐 *Season: ${ani.data.anime.results[0].season}*\n💠 *Total Episodes: ${ani.data.anime.results[0].episodes}*\n🎗 *Duration: ${ani.data.anime.results[0].duration}/min*\n🚫 *Eechi: ${ani.data.anime.results[0].isAdult}*\n🌟 *Score: ${ani.data.anime.results[0].meanScore}*\n\n🌐 *URL: ${ani.data.anime.results[0].siteUrl}*\n\n❄ *Description:* ${ani.data.anime.results[0].description}`,
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
