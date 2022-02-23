/**
 * /*eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/*eslint-disable @typescript-eslint/no-unused-vars*/
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";
import { Mal } from "node-myanimelist";
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
		/*eslint-disable @typescript-eslint/no-explicit-any*/
        /*eslint-disable @typescript-eslint/no-unused-vars*/
		if (!this.client.config.malUsername)
			return void M.reply(`Username not set for myanimelist.net.`);
		if (!this.client.config.malPassword)
			return void M.reply(`Password not set for myanimelist.net.`);
		if (!joined)
			return void (await M.reply(`Give me an anime title to search, Baka!`));
		const chitoge: any = joined.trim();
		const auth = Mal.auth("6114d00ca681b7701d1e15fe11a4987e");
		const logIn = await auth.Unstable.login(
			this.client.config.malUsername,
			this.client.config.malPassword
		);
		const anime = await logIn.anime
			.search(chitoge, Mal.Anime.fields().all())
			.call()
			.catch((err: any) => {
				return void M.reply(`Couldn't find any matching anime.`);
			});
		let text = "";
		const result = anime.data[0].node;
		text += `🎀 *Title: ${result.title}*\n`;
		text += `🎋 *Format: ${result.media_type.toUpperCase()}*\n`;
		text += `📈 *Status: ${result.status.toUpperCase().replace(/\_/g, " ")}*\n`;
		text += `🍥 *Total episodes: ${result.num_episodes}*\n`;
		text += `🧧 *Genres:*\n`;
		for (let i = 0; i < result.genres.length; i++) {
			text += `*${result.genres[i].name}*\n`;
		}
		text += `✨ *Based on: ${result.source.toUpperCase()}*\n`;
		text += `📍 *Studios:*\n`;
		for (let i = 0; i < result.studios.length; i++) {
			text += `*${result.studios[i].name}*\n`;
		}
		text += `💫 *Premiered on: ${result.start_date}*\n`;
		text += `🎗 *Ended on: ${result.end_date}*\n`;
		text += `🎐 *Popularity:* ${result.popularity}*\n`;
		text += `🏅 *Rank: ${result.rank}*\n\n`;
		text += `🌐 *URL: https://myanimelist.net/anime/${result.id}*\n\n`;
		text += `❄ *Description:* ${result.synopsis.replace(
			/\[Written by MAL Rewrite]/g,
			""
		)}`;
		const buffer = await request
			.buffer(result.main_picture.large)
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
