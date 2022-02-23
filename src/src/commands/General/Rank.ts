/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";
import Canvacord from "canvacord";
import { MessageType } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "rank",
			description: "Displays User's Stats",
			category: "general",
			usage: `${client.config.prefix}rank [tag/quote]`,
			aliases: ["stats"],
			baseXp: 10,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		if (M.quoted?.sender) M.mentioned.push(M.quoted.sender);
		const user = M.mentioned[0] ? M.mentioned[0] : M.sender.jid;
		let username = user === M.sender.jid ? M.sender.username : "";
		if (!username) {
			const contact = this.client.getContact(user);
			username =
				contact.notify || contact.vname || contact.name || user.split("@")[0];
		}
		let pfp: string;
		try {
			pfp = await this.client.getProfilePicture(user);
		} catch (err) {
			M.reply(`Profile Picture not Accessible of ${username}`);
			pfp =
				"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";
		}
		const exp = (await this.client.getUser(user)).Xp;
		let role: string;
		if (exp < 500) {
			role = "🌸 Citizen";
		} else if (exp < 1000) {
			role = "🔎 Cleric";
		} else if (exp < 2000) {
			role = "🔮 Wizard";
		} else if (exp < 5000) {
			role = "♦️ Mage";
		} else if (exp < 10000) {
			role = "🎯 Noble";
		} else if (exp < 25000) {
			role = "✨ Elite";
		} else if (exp < 50000) {
			role = "🔶️ Ace";
		} else if (exp < 75000) {
			role = "🌀 Hero";
		} else if (exp < 100000) {
			role = "💎 Supreme";
		} else {
			role = "❄️ Mystic";
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let level: number;
		if (exp < 500) {
			level = 1;
		} else if (exp < 1000) {
			level = 2;
		} else if (exp < 2000) {
			level = 3;
		} else if (exp < 5000) {
			level = 4;
		} else if (exp < 10000) {
			level = 5;
		} else if (exp < 25000) {
			level = 6;
		} else if (exp < 50000) {
			level = 7;
		} else if (exp < 75000) {
			level = 8;
		} else if (exp < 100000) {
			level = 9;
		} else {
			level = 10;
		}
		let required: number;
		if (exp < 500) {
			required = 500;
		} else if (exp < 1000) {
			required = 1000;
		} else if (exp < 2000) {
			required = 2000;
		} else if (exp < 5000) {
			required = 5000;
		} else if (exp < 10000) {
			required = 10000;
		} else if (exp < 25000) {
			required = 25000;
		} else if (exp < 50000) {
			required = 50000;
		} else if (exp < 75000) {
			required = 75000;
		} else if (exp < 100000) {
			required = 100000;
		} else {
			required = 0;
		}
		const rank = new Canvacord.Rank()
			.setAvatar(pfp)
			.setCurrentXP(exp || 0)
			.setRequiredXP(required)
			.setStatus("online", false)
			.setLevel(level, "Level:", true)
			.setRank(0, `Role: ${role}`, true)
			.setProgressBar("#FFC0CB", "COLOR")
			.setOverlay("#FFFFFF")
			.setUsername(username)
			.setDiscriminator("0007")
			.setBackground("COLOR", "#FFC0CB");
		rank.build({}).then((rankcard) => {
			const text = `🏮 *Username: ${username}*\n\n〽️ *Level: ${level}*\n\n⭐ *Exp: ${
				exp || 0
			} / ${required}*\n\n💫 *Role: ${role}*\n\n`;
			M.reply(
				rankcard,
				MessageType.image,
				undefined,
				undefined,
				text,
				undefined
			);
		});
	};
}