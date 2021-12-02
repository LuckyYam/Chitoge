import { MessageType, WAParticipantAction } from '@adiwajshing/baileys'
import chalk from 'chalk'
import request from '../lib/request'
import WAClient from '../lib/WAClient'
import { drawCard } from "discord-welcome-card";
import Canvas from "canvas";

export default class EventHandler {
	constructor(public client: WAClient) {}

	handle = async (event: IEvent): Promise<void> => {
		const group = await this.client.fetchGroupMetadataFromWA(event.jid);
		this.client.log(
			`${chalk.blueBright("EVENT")} ${chalk.green(
				`${this.client.util.capitalize(event.action)}[${
					event.participants.length
				}]`
			)} in ${chalk.cyanBright(group?.subject || "Group")}`
		);
		const data = await this.client.getGroupData(event.jid);
		if (!data.events) return void null;
		const user = event.participants[0];
		const contact = this.client.getContact(user);
		const username =
			contact.notify || contact.vname || contact.name || user.split("@")[0];
		let pfp: string;
		try {
			pfp = await this.client.getProfilePicture(user);
		} catch (err) {
			pfp =
				"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";
		}
		const add = event.action === "add";
		const text = add
			? `- ${group.subject || "___"} -\n\n💠 *Group Description:*\n${
					group.desc
			  }\n\nHope you follow the rules and have fun!\n\n*‣ ${event.participants
					.map((jid) => `@${jid.split("@")[0]}`)
					.join(", ")}*`
			: event.action === "remove"
			? `Goodbye *@${
					event.participants[0].split("@")[0]
			  }* 👋🏻, we're probably not gonna miss you.`
			: `Ara Ara looks like *@${
					event.participants[0].split("@")[0]
			  }* got ${this.client.util.capitalize(event.action)}d${
					event.actor ? ` by *@${event.actor.split("@")[0]}*` : ""
			  }`;
		const contextInfo = {
			mentionedJid: event.actor
				? [...event.participants, event.actor]
				: event.participants,
		};
		if (add) {
			const canvas = Canvas.createCanvas(1772, 633);
			const ctx = canvas.getContext("2d");
			const background = await Canvas.loadImage(`./assets/images/WelcomeCard.png`);
			ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
			ctx.strokeStyle = "#f2f2f2";
			ctx.strokeRect(0, 0, canvas.width, canvas.height);
			const name = `${username}`;
			if (name.length >= 14) {
				ctx.font = "bold 100px Genta";
				ctx.fillStyle = "#f2f2f2";
				ctx.fillText(name, 720, canvas.height / 2 + 20);
			} else {
				ctx.font = "bold 150px Genta";
				ctx.fillStyle = "#f2f2f2";
				ctx.fillText(name, 720, canvas.height / 2 + 20);
			}
			const memberCount = `${event.participants.length}TH MEMBER`;
			ctx.font = "bold 60px Genta";
			ctx.fillStyle = "#f2f2f2";
			ctx.fillText(memberCount, 750, canvas.height / 2 + 125);
			const subject = `${group.subject}`;
			ctx.font = "bold 60px Genta";
			ctx.fillStyle = "#f2f2f2";
			ctx.fillText(subject, 700, canvas.height / 2 - 150);
			ctx.beginPath();
			ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true); //position of img
			ctx.closePath();
			ctx.clip();
			ctx.drawImage(pfp, 65, canvas.height / 2 - 250, 500, 500);
			/*const welcome = await drawCard({
				theme: "circuit",
				text: {
					title: "Hello",
					text: username,
					subtitle: `Welcome to ${group.subject}`,
					color: `#FFFFFF`,
				},
				avatar: {
					image: pfp,
					outlineWidth: 5,
				},
				background:
					"https://images.unsplash.com/photo-1554050857-c84a8abdb5e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
				blur: 1,
				border: true,
				rounded: true,
			});*/
			if (canvas)
				return void (await this.client.sendMessage(
					event.jid,
					canvas.toBuffer(),
					MessageType.image,
					{
						caption: text,
						contextInfo,
					}
				));
		}
		return void this.client.sendMessage(
			event.jid,
			text,
			MessageType.extendedText,
			{ contextInfo }
		);
	};
}

interface IEvent {
    jid: string
    participants: string[]
    actor?: string | undefined
    action: WAParticipantAction
}
