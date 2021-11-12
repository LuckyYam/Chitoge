import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import { Mal } from "node-myanimelist";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";
// import { MessageType, Mimetype } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "manga",
			description: `Gives you the data of the given manga from MyAnimeList.`,
			aliases: ["mnga"],
			category: "weeb",
			usage: `${client.config.prefix}manga [title]`,
			baseXp: 50,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!this.client.config.malUsername && !this.client.config.malPassword)
			return void M.reply("No Username and Password set for manga search. ");
		if (!joined) return void (await M.reply(`Give me a manga title, Baka!`));
		const chitoge = joined.trim();
		const auth = Mal.auth("6114d00ca681b7701d1e15fe11a4987e");
		const acount = await auth.Unstable.login(
			this.client.config.malUsername,
			this.client.config.malPassword
		);
		const search = await acount.manga
			.search(
				chitoge,
				Mal.Manga.fields()
					.alternativeTitles()
					.startDate()
					.endDate()
					.synopsis()
					.mean()
					.rank()
					.popularity()
					.numListUsers()
					.numScoringUsers()
					.nsfw()
					.genres()
					.createdAt()
					.updatedAt()
					.mediaType()
					.status()
					.myListStatus(
						Mal.Manga.listStatusFields()
							.startDate()
							.finishDate()
							.priority()
							.numTimesReread()
							.rereadValue()
							.tags()
							.comments()
					)
					.numVolumes()
					.numChapters()
					.authors()
			)
			.call()
			.catch(() => null);
		if (!search) return void M.reply(`Couldn't find any matching manga title.`);
		const buffer = await request
			.buffer(search.data[0].node.main_picture.large)
			.catch((e) => {
				return void M.reply(e.message);
			});
		while (true) {
			try {
				M.reply(
					buffer || "✖ An error occurred. Please try again later.",
					MessageType.image,
					undefined,
					undefined,
					`🎀 *Title: ${search.data[0].node.title}*\n📈 *Status: ${search.data[0].node.status}*\n🌸 *Total Volume: ${search.data[0].node.num_volumes}*\n🎗 *Total Chapters: ${search.data[0].node.num_chapters}*\n✨ *Published on: ${search.data[0].node.start_date}*\n🌟 *Score: ${search.data[0].node.mean}*\n💮 *Updated at: ${search.data[0].node.updated_at}*\n✍ *Author: ${search.data[0].node.authors[0].node.first_name} ${search.data[0].node.authors[0].node.last_name}*\n\n🌐 *MyAnimeList URL: https://myanimelist.net//manga//${search.data[0].node.id}*\n\n❄️ *Description:* ${search.data[0].node.synopsis}`,
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
