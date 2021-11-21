/** @format */

import { MessageType, Mimetype } from "@adiwajshing/baileys";
import { Sticker, Categories, StickerTypes } from "wa-sticker-formatter";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "steal",
			aliases: ["take"],
			description: "Will format the given sticker.",
			category: "utils",
			usage: `${client.config.prefix}steal [tag sticker]|pack_name|author`,
			baseXp: 30,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		parsedArgs: IParsedArgs
	): Promise<void> => {
		let buffer;
		if (M.quoted?.message?.message?.stickerMessage)
			buffer = await this.client.downloadMediaMessage(M.quoted.message);
		buffer = await this.client.downloadMediaMessage(M.WAMessage);
		if (!buffer) return void M.reply(`Provide a sticker, Baka!`);

		const getQuality = (): number => {
			const qualityFlag = parsedArgs.joined.match(/--(\d+)/g) || "";
			return qualityFlag.length
				? parseInt(qualityFlag[0].split("--")[1], 10)
				: parsedArgs.flags.includes("--broke")
				? 1
				: parsedArgs.flags.includes("--low")
				? 10
				: parsedArgs.flags.includes("--high")
				? 100
				: 50;
		};

		let quality = getQuality();
		if (quality > 100 || quality < 1) quality = 50;

		parsedArgs.flags.forEach(
			(flag) => (parsedArgs.joined = parsedArgs.joined.replace(flag, ""))
		);
		const getOptions = () => {
			const pack = parsedArgs.joined.split("|");
			const categories = (() => {
				const categories = parsedArgs.flags.reduce((categories, flag) => {
					switch (flag) {
						case "--angry":
							categories.push("💢");
							break;
						case "--love":
							categories.push("💕");
							break;
						case "--sad":
							categories.push("😭");
							break;
						case "--happy":
							categories.push("😂");
							break;
						case "--greet":
							categories.push("👋");
							break;
						case "--celebrate":
							categories.push("🎊");
							break;
					}
					return categories;
				}, new Array<Categories>());
				categories.length = 2;
				if (!categories[0]) categories.push("❤", "🌹");
				return categories;
			})();
			return {
				categories,
				pack: pack[1] || "🌟 Here you go ",
				author: pack[2] || "Chitoge 🌟",
				quality,
				type: StickerTypes[
					parsedArgs.flags.includes("--crop") ||
					parsedArgs.flags.includes("--c")
						? "CROPPED"
						: parsedArgs.flags.includes("--stretch") ||
						  parsedArgs.flags.includes("--s")
						? "DEFAULT"
						: "FULL"
				],
			};
		};
		parsedArgs.flags.forEach(
			(flag) => (parsedArgs.joined = parsedArgs.joined.replace(flag, ""))
		);
		if (!buffer)
			return void M.reply(`You didn't provide any Image/Video to convert`);
		const sticker = await new Sticker(buffer, getOptions())
			.build()
			.catch(() => null);
		if (!sticker) return void M.reply(`An Error Occurred While Converting`);
		await M.reply(sticker, MessageType.sticker, Mimetype.webp);
	};
}
