/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";
import Canvas from "canvas";
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
			// const contact = this.client.getContact(user)
			// username = contact.notify || contact.vname || contact.name || user.split('@')[0]
			username = user.split("@")[0];
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
		let pfp: string;
		try {
			pfp = await this.client.getProfilePicture(user);
		} catch (err) {
			M.reply(`Profile Picture not Accessible of ${username}`);
			pfp = "https://wallpaperaccess.com/full/5304840.png";
		}
		const xp = ((required - exp) / required) * 490;
		const canvas = Canvas.createCanvas(800, 300);
		const ctx = canvas.getContext("2d");
		const background = await Canvas.loadImage(
			"https://i.pinimg.com/originals/bb/4c/c3/bb4cc3b2fae7978db32f35b4519cc0f8.jpg"
		);
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = "#FFFFF";
		ctx.strokeRect(0, 0, canvas.width, canvas.height);
		ctx.font = '35px "Roboto"';
		ctx.fillStyle = "#fff";
		ctx.fillText(`${username}`, 215, 125);
		ctx.font = '28px "Roboto Black"';
		ctx.fillStyle = "#fff";
		ctx.fillText(`Exp: ${exp}/${xp} `, 575, 150);
		ctx.closePath();
		ctx.font = '38px "Roboto"';
		ctx.fillStyle = "#fff";
		ctx.fillText(`Level: ${level}`, 215, 230);
		ctx.font = '38px "Roboto"';
		ctx.fillStyle = "#fff";
		ctx.fillText(`Role: ${role}`, 440, 230);
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.fillStyle = "#fff";
		ctx.moveTo(220, 135);
		ctx.lineTo(690, 135);
		ctx.quadraticCurveTo(710, 135, 710, 152.5);
		ctx.quadraticCurveTo(710, 170, 690, 170);
		ctx.lineTo(220, 170);
		ctx.lineTo(220, 135);
		ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.fillStyle = "#000000";
		ctx.moveTo(220, 135);
		ctx.lineTo(220 + xp - 20, 135);
		ctx.quadraticCurveTo(220 + xp, 135, 220 + xp, 152.5);
		ctx.quadraticCurveTo(220 + xp, 170, 220 + xp - 20, 170);
		ctx.lineTo(220, 170);
		ctx.lineTo(220, 135);
		ctx.fill();
		ctx.font = "30px calibri";
		ctx.fillStyle = "#000";
		ctx.closePath();
		ctx.beginPath();
		ctx.arc(125, 150, 100, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();
		const profile = await Canvas.loadImage(pfp);
		ctx.drawImage(profile, 25, 50, 200, 200);
		const text = `🏮 *Username: ${username}*\n\n〽️ *Level: ${level}*\n\n⭐ *Exp: ${
			exp || 0
		}/${required}*\n\n💫 *Role: ${role}*\n\n`;
		await M.reply(
			canvas.toBuffer(),
			MessageType.image,
			undefined,
			undefined,
			text,
			undefined
		);
	};
}
	