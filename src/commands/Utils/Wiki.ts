/** @format */

import wiki from "wikipedia";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "wikipedia",
			aliases: ["wiki"],
			description: "Will fetch the result of the given query from wikipedia. ",
			category: "utils",
			usage: `${client.config.prefix}wiki [query]`,
			baseXp: 20,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!joined) return void M.reply("Provide a query, Baka!");
		const query = joined.trim();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const results = await wiki.summary(query);
		const text = `*🌐 URL: ${results.content_urls.mobile.page}*\n\n*🎀 Title: ${results.title}*\n *📜 Description: ${results.description}*\n\n*❄ Summary:* ${results.extract}`;
		await M.reply(text);
	};
}
