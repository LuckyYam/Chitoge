/** @format */

import { AnimeWallpaper } from "anime-wallpaper";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import { MessageType } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "wallpaper",
			description: `Will send you random anime wallpaper of the given term.`,
			aliases: ["wpaper"],
			category: "weeb",
			usage: `${client.config.prefix}wallpaper [term]`,
			baseXp: 20,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const chitoge: any = joined.trim().split("|");
		const term: string = chitoge[0];
		const amount: number = chitoge[1];
		if (term === "")
			return void M.reply(
				`Give me the wallpaper term and page to search, Baka!`
			);
		if (!amount)
			return void M.reply(
				`Give me the number of wallpapers to send, Baka!\n\nExample: *${this.client.config.prefix}wallpaper chitoge|5*`
			);
		if (amount > 20)
			return void M.reply(`Do you want me to spam in this group?`);
		const wall = new AnimeWallpaper();
		const pages = [1, 2, 3, 4, 5];
		const random = pages[Math.floor(Math.random() * pages.length)];
		const wallpaper = await wall
			.getAnimeWall4({ title: term, type: "sfw", page: random })
			.catch(() => null);
		if (!wallpaper)
			return void (await M.reply(
				`Couldn't find any matching term of wallpaper.`
			));
		if (amount > wallpaper.length) return void (await M.reply(`*Try again.*`));
		for (let i = 0; i < amount; i++) {
			const res = `*🌟 Here you go.*`;
			this.client.sendMessage(
				M.from,
				{ url: wallpaper[i].image },
				MessageType.image,
				{
					quoted: M.WAMessage,
					caption: `${res}`,
				}
			);
		}
	};
}
	
		
