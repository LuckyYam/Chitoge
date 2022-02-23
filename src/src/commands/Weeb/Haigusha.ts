import * as mwl from "mywaifulist-scraper";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "haigusha",
			description: `Will send you random anime character with info.`,
			aliases: ["hg"],
			category: "weeb",
			usage: `${client.config.prefix}haigusha`,
			baseXp: 50,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		const mwlClient = new mwl.client();
		const o = Math.floor(Math.random() * 41999);
		const haigusha = await mwlClient.getCharacter(o);
		let text = "";
		text += `💙 *Name: ${haigusha.name}*\n`;
		if (haigusha.original_name !== "")
			text += `💚 *Original Name: ${haigusha.original_name}*\n`;
		if (haigusha.weight !== null) text += `⚖ *Weight: ${haigusha.weight}*\n`;
		if (haigusha.height !== null) text += `📍 *Height: ${haigusha.height}*\n`;
		if (haigusha.bust !== null) text += `💠 *Bust: ${haigusha.bust}*\n`;
		if (haigusha.hip !== null) text += `🎗 *Hip: ${haigusha.hip}*\n`;
		if (haigusha.waist !== null) text += `🎀 *Waist: ${haigusha.waist}*\n`;
		if (haigusha.blood_type !== null)
			text += `🩸 *Blood Type: ${haigusha.blood_type}*\n`;
		if (haigusha.origin !== null) text += `🎐 *Origin: ${haigusha.origin}*\n`;
		if (haigusha.age !== null) text += `🎂 *Age: ${haigusha.age}*\n`;
		if (haigusha.likes !== null) text += `🖤 *Likes: ${haigusha.likes}*\n`;
		text += `🏅 *Like Rank: ${haigusha.like_rank}*\n`;
		text += `📈 *Popularity Rank: ${haigusha.popularity_rank}*\n\n`;
		text += `💛 *Source: ${haigusha.series.name}*\n\n`;
		text += `🌐 *URL: ${haigusha.url}*\n\n`;
		text += `❤ *Description:* ${haigusha.description}\n`;
		if (haigusha == undefined) {
			return void M.reply("✖ An error occurred. Please try again later.");
		}
		//const thumbnail = await request.buffer(
		//`https://mocah.org/thumbs/192010-chitoge-kirisaki-1920x1080.png`
		//);
		const buffer = await request.buffer(haigusha.display_picture).catch((e) => {
			return void M.reply(e.message);
		});
		while (true) {
			try {
				M.reply(
					buffer || "✖ An error occurred. Please try again later",
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
