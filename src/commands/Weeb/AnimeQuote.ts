import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import animeQuotes, { IQuotes } from "../../lib/animeQuotes";
import AnimeQuotes from "animequotes";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "animequote",
			description: "Will give you random anime quote for the given character.",
			aliases: ["aq"],
			category: "weeb",
			usage: `${client.config.prefix}animequote [character_name]`,
			baseXp: 10,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		const random = await AnimeQuotes.randomQuote();
		let randomText = "";
		randomText += `*✏ Quote: ${random.quote}*\n\n`;
		randomText += `*🎗 Said by: ${random.name}*\n\n`;
		randomText += `*📛 Source: ${random.anime}*`;
		if (!joined) return void (await M.reply(`${randomText}`));
		const result = await animeQuotes(joined.toLowerCase().trim());
		if ((result as { error: string }).error)
			return void (await M.reply(
				"Couldn't find any quote for the given character."
			));
		const chara = result as IQuotes;
		let charaText = "";
		charaText += `*✏ Quote: ${chara.quote}*\n\n`;
		charaText += `*🎗 Said by: ${chara.name}*\n\n`;
		charaText += `*📛 Source: ${chara.anime}*`;
		await M.reply(charaText);
	};
}
