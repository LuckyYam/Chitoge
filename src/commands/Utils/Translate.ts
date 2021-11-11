/** @format */

import translate from "translate-google";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "translate",
			aliases: ["tr"],
			description: "Will translate the given word to your selected language. ",
			category: "utils",
			usage: `${client.config.prefix}tr <code of the language that you want>|<word>\n\nExample: ${client.config.prefix}tr zh-cn|Hello`,
			baseXp: 40,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		const texts = joined.trim().split("|");
		if (texts[0] === "")
			return void M.reply(
				`Use ${this.client.config.prefix}tr (language code|word)`
			);
		const code = texts[0];
		const word = texts[1];
		if (!word) return void M.reply("Give me the word to translate, Baka!");
		const response = await translate(word, { to: code });
		const text = `${response}`;
		M.reply(text);
	};
}
