import { TraceMoe } from "trace.moe.ts";
import anilist from "anilist-node";
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
			description: `Gives you the source of the given anime scene.`,
			aliases: ["trace", "source"],
			category: "weeb",
			usage: `${client.config.prefix}sauce [tag_image]`,
			baseXp: 50,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
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
		const api = new TraceMoe();
		const sauce = await api.fetchAnimeFromBuffer(buffer);
		if (!sauce == undefined) {
			return void M.reply(
				`Couldn't find any matching source of the given image/gif. 📝 *Note: Make sure your image/gif is from anime scene and hentai stuffs do not work here.*`
			);
		}
		const Anilist = new anilist();
		const details = await Anilist.media.anime(sauce.result[0].anilist);
		const similarity = sauce.result[0].similarity;
		let sentence;
		if (similarity < 0.9) {
			sentence = `Ahh... I have low confidence in this one but please take a look.`;
		} else {
			sentence = `I have super confidence in this one. Take a look at the results.`;
		}
		let text = "";
		text += `*${sentence}*\n\n`;
		text += `🎀 *Title: ${details.title.romaji}*\n`;
		text += `🎗 *Episode: ${sauce.result[0].episode}*\n`;
		text += `💠 *Similarity: ${sauce.result[0].similarity} / 1*\n`;
		text += `💮 *Genres: ${details.genres}*\n`;
		text += `🎋 *Type: ${details.format}*\n`;
		text += `📈 *Status: ${details.status}*\n\n`;
		text += `🌐 *URL: ${details.siteUrl}*`;

		const img = await request.buffer(sauce.result[0].image).catch((e) => {
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
