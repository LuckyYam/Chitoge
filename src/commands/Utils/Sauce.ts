/** @format */

import Sauce from "node-sauce";
import { MessageType } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";
import request from "../../lib/request";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "sauce",
			description: `Gives you the source of the given image/gif.`,
			aliases: ["trace", "source"],
			category: "weeb",
			usage: `${client.config.prefix}sauce [tag_image/gif]`,
			baseXp: 50,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		if (!this.client.config.gimmeSauce)
			return void M.reply("No SauceNao key set.");
		let buffer;
		if (M.quoted?.message?.message?.imageMessage)
			buffer = await this.client.downloadMediaMessage(M.quoted.message);
		else if (M.WAMessage.message?.imageMessage)
			buffer = await this.client.downloadMediaMessage(M.WAMessage);
		else if (M.quoted?.message?.message?.videoMessage)
			buffer = await this.client.downloadMediaMessage(M.quoted.message);
		else if (M.WAMessage.message?.videoMessage)
			buffer = await this.client.downloadMediaMessage(M.WAMessage);
		if (!buffer) return void M.reply(`Give me an image/gif to search, Baka!`);
		const api = new Sauce(this.client.config.gimmeSauce);
		const sauce = await api(buffer).catch((err: any) => {
			return void M.reply(
				`Couldn't find any matching source of the given image/gif.`
			);
		});
		if (!sauce)
			return void (await M.reply(
				`Couldn't find any matching source of the given anime image/gif.`
			));
		const similarity = sauce[0].similarity;
		let sentence;
		if (similarity < 50) {
			sentence = `Ahh... I have low confidence in this one but please take a look.`;
		} else if (similarity < 80) {
			sentence = `I have good confidence in this result.`;
		} else {
			sentence = `I have super confidence in this one. Take a look at the results.`;
		}
		let text = "";
		text += `*${sentence}*\n\n`;
		text += `🎀 *Title: ${sauce[0].source || sauce[0].title}*\n`;
		text += `💠 *Similarity: ${similarity}%*\n\n`;
		text += `🌐 *URL: ${sauce[0].ext_urls[0]}*`;

		const img = await request.buffer(sauce[0].thumbnail).catch((e) => {
			return void M.reply(e.message);
		});
		while (true) {
			try {
				M.reply(
					img || "✖ An error occurred. Please try again later.",
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
