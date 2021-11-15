import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import oakdexPokedex from "oakdex-pokedex";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "pokemon",
			description: `Gives you the data of the given pokemon.`,
			aliases: ["pkmn"],
			category: "weeb",
			usage: `${client.config.prefix}pokemon [name/id]`,
			baseXp: 50,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!joined)
			return void M.reply(
				"Do you want me to give you the data of an unknown pokemon, Baka!"
			);
		const name = joined.trim();
		console.log(name);
		const pkmn = await oakdexPokedex.findPokemon(name).catch((err: any) => {
			return void M.reply(`No such pokemon name or id, Baka!`);
		});
		let text = "";
		text += `💫 *Name: ${pkmn.names.en}*\n`;
		text += `〽️ *Pokedex ID: ${pkmn.national_id}*\n`;
		text += `⚖ *Weight: ${pkmn.weight_eu}*\n`;
		text += `🔆 *Height: ${pkmn.height_eu}*\n`;
		text += `🌟 *Base Experience: ${pkmn.base_exp_yield}*\n`;
		text += `📛 *Abilities: ${pkmn.abilities[0].name}, ${pkmn.abilities[1].name}*\n`;
		text += `🎀 *Type:  ${pkmn.types}*\n`;
		text += `📈 *Leveling Rate: ${pkmn.leveling_rate}*\n`;
		text += `💮 *Colour: ${pkmn.color}*\n`;
		if (pkmn.evolution_from !== null)
			text += `🌸 *Evolved from: ${pkmn.evolution_from}*\n`;
		text += `🎗 *Evolves to: ${pkmn.evolutions[0].to || "None"}*\n`;
		text += `✳ *HP: ${pkmn.base_stats.hp}*\n`;
		text += `⚔ *Attack: ${pkmn.base_stats.atk}*\n`;
		text += `🔰 *Defense: ${pkmn.base_stats.def}*\n`;
		text += `☄ *Special Attack: ${pkmn.base_stats.sp_atk}*\n`;
		text += `🛡 *Special Defense:${pkmn.base_statd.sp_def}*\n`;
		text += `🎐 *Speed: ${pkmn.base_stats.speed}*\n\n`;
		text += `💬 *Summary: ${pkmn.pokedex_entries.Gold.en}*`;
		const buffer = await request
			.buffer(
				`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pkmn.national_id.id}.png`
			)
			.catch((e) => {
				return void M.reply(e.message);
			});
		while (true) {
			try {
				M.reply(
					buffer || "✖ An error occurred. Please try again later",
					MessageType.image,
					undefined,
					undefined,
					`${text}`,
					undefined
				).catch((err) => {
					console.log(`${err}`);
					M.reply(`✖ An error occurred. Please try again later.`);
				});
				break;
			} catch (err) {
				M.reply(`✖ An error occurred. Please try again later.`);
				console.log(`${err}`);
			}
		}
		return void null;
	};
}
