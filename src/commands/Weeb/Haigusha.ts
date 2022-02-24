import { Character } from "@shineiichijo/marika";
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
    const client = new Character();
    let haigusha;
    try {
      haigusha = await client.getRandomCharacter();
    } catch (error) {
      return void M.reply("✖ An error occurred. Please try again later");
    }
    let source;
    try {
      source = await client.getCharacterAnime(haigusha.mal_id);
    } catch (error) {
      return void M.reply("✖ An error occurred. Please try again later");
    }
    let text = "";
    text += `💙 *Name: ${haigusha.name}*\n`;
    if (haigusha.nicknames.length > 0)
      text += `💚 *Nicknames: ${haigusha.nicknames.join(", ")}*\n`;
    text += `🖤 *Favorites: ${haigusha.favorites}*\n`;
    text += `💛 *Source: ${source.data[0].anime.title}*\n\n`;
    text += `🌐 *URL: ${haigusha.url}*\n\n`;
    if (haigusha.about !== null) text += `❤ *Description:* ${haigusha.about}`;
    return void M.reply(
      await this.client.getBuffer(haigusha.images.jpg.image_url),
      MessageType.image,
      undefined,
      undefined,
      text
    );
  };
}
