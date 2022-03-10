import MWL, { IWaifuResponse } from "../../lib/MWL";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";
import { MessageType } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "haigusha",
      description: `Will send you random anime character with info.`,
      aliases: ["hg"],
      category: "weeb",
      usage: `${client.config.prefix}haigusha`,
      baseXp: 50,
    });
  }

  run = async (M: ISimplifiedMessage): Promise<void> => {
    const random = await MWL()
    if ((random as { error: string }).error)
			return void (await M.reply(
				"✖ An error occurred. Please try again later."
			));
    const haigusha = random as IWaifuResponse
    let text = "";
		text += `💙 *Name: ${haigusha.name}*\n`;
		if (haigusha.original_name !== "" && haigusha.original_name !== null)
			text += `💚 *Original Name: ${haigusha.original_name}*\n`;
		if (haigusha.weight !== null) text += `⚖ *Weight: ${haigusha.weight}*\n`;
		if (haigusha.height !== null) text += `📍 *Height: ${haigusha.height}*\n`;
		if (haigusha.bust !== null) text += `💠 *Bust: ${haigusha.bust}*\n`;
		if (haigusha.hip !== null) text += `🎗 *Hip: ${haigusha.hip}*\n`;
		if (haigusha.waist !== null) text += `🎀 *Waist: ${haigusha.waist}*\n`;
		if (haigusha.blood_type !== null)
			text += `🩸 *Blood Type: ${haigusha.blood_type}*\n`;
		if (haigusha.origin !== null && haigusha.origin !== "") text += `🎐 *Origin: ${haigusha.origin}*\n`;
		if (haigusha.age !== null&& haigusha.age !== 0) text += `🎂 *Age: ${haigusha.age}*\n`;
		if (haigusha.likes !== null) text += `🖤 *Likes: ${haigusha.likes}*\n`;
		text += `🏅 *Like Rank: ${haigusha.like_rank}*\n`;
		text += `📈 *Popularity Rank: ${haigusha.popularity_rank}*\n\n`;
		text += `💛 *Source: ${haigusha.series.name}*\n\n`;
		text += `🌐 *URL: ${haigusha.url}*\n\n`;
		text += `❤ *Description:* ${haigusha.description}\n`;
    return void M.reply(await this.client.getBuffer(haigusha.display_picture), MessageType.image, undefined, undefined, text)
  };
}
