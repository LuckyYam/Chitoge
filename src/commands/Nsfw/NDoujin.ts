/** @format */

import nHentai from "shentai";
import { evaluate } from "mathjs";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "nsfwdoujin",
			description: `Gives you the doujin of the given idea and page.`,
			aliases: ["ndoujin"],
			category: "nsfw",
			usage: `${client.config.prefix}ndoujin [id|page]`,
			baseXp: 50,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		const sHentai = new nHentai();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const terms: any = joined.trim().split("|");
		if (terms[0] === "")
			return void M.reply(
				`Give me the id and page of the nhentai doujin, Baka!`
			);
		const id: string = terms[0];
		const page: number = terms[1];
		if (!page) return void M.reply("Give me the page, Baka!");
		const o = evaluate(page - 1);
		if (!(await this.client.getGroupData(M.from)).nsfw)
			return void M.reply(
				`Don't be a pervert, Baka! This is not an NSFW group.`
			);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const doujin = await sHentai.getDoujin(id).catch((err: any) => {
			return void M.reply(`Invalid doujin id, Baka!.`);
		});
		if (page > doujin.pages.length)
			return void M.reply(
				`I think you should check the total pages of the doujin.`
			);
		if (page == undefined) {
			return void M.reply(
				`*https://en.wikipedia.org/wiki/Number*\nI think this might help you.`
			);
		}

		let text = "";
		text += `🎀 *Title: ${doujin.titles.english}*\n`;
		text += `🎗 *Tags: ${doujin.tags.join(", ")}*\n`;
		text += `✍ *Author: ${doujin.author}*\n`;
		text += `📒 *Reading Progress: ${page} out of ${doujin.pages.length}*`;
		const buffer = await request.buffer(doujin.pages[o]).catch((e) => {
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
					M.reply(
						`✖ An error occurred. Please try again later. Here's the page URL: *${doujin.pages[o]}*`
					);
				});
				break;
			} catch (e) {
				// console.log('Failed2')
				M.reply(
					`✖ An error occurred. Please try again later. Here's the page URL: *${doujin.pages[o]}*`
				);
				console.log(
					`This error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`
				);
			}
		}
		return void null;
	};
}
