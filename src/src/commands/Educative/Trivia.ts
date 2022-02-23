/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import axios from "axios";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "trivia",
			aliases: ["t"],
			description: "Gives you random question based on the level. ",
			category: "educative",
			usage: `${client.config.prefix}trivia [easy/medium/hard]`,
			baseXp: 30,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!joined) return void M.reply("Give me a level, Baka!");
		const chitoge = joined.trim();
		await axios
			.get(
				`https://opentdb.com/api.php?amount=1&difficulty=${chitoge}&type=multiple`
			)
			.then((response) => {
				// console.log(response);
				const text = `🎀 *Category: ${response.data.results[0].category}*\n❄ *Difficulty: ${response.data.results[0].difficulty}*\n📒 *Question:${response.data.results[0].question}*\n\n\n🎋 *Answer: ${response.data.results[0].correct_answer}*\n `;
				M.reply(text);
			})
			.catch((err) => {
				M.reply(`No such level, Baka!`);
			});
	};
}
