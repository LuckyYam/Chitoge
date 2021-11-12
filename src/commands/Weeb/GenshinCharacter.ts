import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import genshindb from "genshin-db";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "genshincharacter",
			description: `Gives you the data of the given genshin character.`,
			aliases: ["gchara", "genshinchara"],
			category: "weeb",
			usage: `${client.config.prefix}genshincharacter [name]`,
			baseXp: 50,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!joined) return void (await M.reply(`Give me a character name, Baka!`));
		const chitoge = joined.trim();
		const genshin = await genshindb.characters(chitoge);
		if (genshin === undefined) {
			return void M.reply("No such character, Baka!");
		}
		let text = "";
		text += `💎 *Name: ${genshin.name}*\n`;
		text += `💠 *Elemnent: ${genshin.element}*\n`;
		text += `📛 *Weapon: ${genshin.weapontype}*\n`;
		text += `🎗 *Speciality: ${genshin.substat}*\n`;
		text += `🌟 *Rarity: ${genshin.rarity}*\n`;
		text += `🌸 *Gender: ${genshin.gender}*\n`;
		text += `❄ *Constellation: ${genshin.constellation}*\n`;
		text += `⛩ *Region: ${genshin.region}*\n`;
		text += `💮 *Affiliation: ${genshin.affiliation}*\n`;
		text += `🎁 *Birthday: ${genshin.birthday}*\n\n`;
		text += `💛 *Description: ${genshin.description}*\n\n`;
		text += `🌐 *URL: ${genshin.url.fandom}*`;
		const buffer = await request.buffer(genshin.images.cover1).catch((e) => {
			return void M.reply(e.message);
		});

		while (true) {
			try {
				M.reply(
					buffer || "✖ An error occurred. Please try again later.",
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
