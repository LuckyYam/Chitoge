/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import axios from "axios";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "element",
			aliases: ["e"],
			description: "Gives you the info of the given element. ",
			category: "educative",
			usage: `${client.config.prefix}element [name]`,
			baseXp: 30,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!joined) return void M.reply("Give me an element name, Baka!");
		const chitoge = joined.trim();
		await axios
			.get(
				`https://neelpatel05.pythonanywhere.com/element/atomicname?atomicname=${chitoge}`
			)
			.then((response) => {
				// console.log(response);
				const text = `🔴 *Elelment: ${response.data.name}*\n⬜ *Atomic No.: ${response.data.atomicNumber}*\n🟡 *Atomic Mass: ${response.data.atomicMass}*\n⬛ *Symbol: ${response.data.symbol}*\n🟢 *Standard State: ${response.data.standardState}*\n♨️ *Boiling Point: ${response.data.boilingPoint} K*\n️💧 *Melting Point: ${response.data.meltingPoint} K*\n🟣 *Density: ${response.data.density} g/mL*\n⚫ *Bonding Type: ${response.data.bondingType}*\n⚪ *Electron Configuration: ${response.data.electronicConfiguration}*\n🌀 *Discovered on: ${response.data.yearDiscovered}*\n`;
				M.reply(text);
			})
			.catch((err) => {
				M.reply(
					`https://en.m.wikipedia.org/wiki/Periodic_table\n\nI think this might help you.\n `
				);
			});
	};
}
