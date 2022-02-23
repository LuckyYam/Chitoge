import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import { MessageType, Mimetype } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "blowjob",
			description: `Just a random gif of girls sucking a sharp sword.`,
			aliases: ["bj"],
			category: "nsfw",
			usage: `${client.config.prefix}blowjob`,
			baseXp: 50,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		let caption = "";
		caption += `🌟`;
		if (!(await this.client.getGroupData(M.from)).nsfw)
			return void M.reply(
				`Don't be a pervert, Baka! This is not an NSFW group.`
			);
		M.reply(
			await this.client.util.GIFBufferToVideoBuffer(
				await this.client.getBuffer(
					(
						await this.client.fetch<{ url: string }>(
							`https://api.waifu.pics/nsfw/blowjob`
						)
					).url
				)
			),
			MessageType.video,
			Mimetype.gif,
			[caption],
			caption
		);
	};
}
