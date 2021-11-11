/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import axios from "axios";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "npmpackage",
			aliases: ["npm"],
			description: "Gives you the info of the given npm package. ",
			category: "coding",
			usage: `${client.config.prefix}npm [package-name]`,
			baseXp: 50,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!joined) return void M.reply("Give me a package name, Baka!");
		const chitoge = joined.trim();
		await axios
			.get(`https://api.popcat.xyz/npm?q=${chitoge}`)
			.then((response) => {
				// console.log(response);
				const text = `🌟 *Name:* ${response.data.name}\n🎗 *Author:* ${response.data.author}\n📧 *Author Email:* ${response.data.author_email}\n💮 *Last Published on:* ${response.data.last_published}\n👨‍💻 *Maintainers:* ${response.data.maintainers}\n📁 *GitHub Repository:* ${response.data.repository}\n〽️ *Downloads This Year:* ${response.data.downloads_this_year}\n🎋 *Keywords:* ${response.data.keywords}\n🔖 *Description:* ${response.data.description}\n\n🌐 *URL: https://www.npmjs.com/package/${response.data.name}*\n `;
				M.reply(text);
			})
			.catch((err) => {
				M.reply(`Couldn't find package name *${chitoge}*`);
			});
	};
}
