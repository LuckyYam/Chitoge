/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import { Character } from "@shineiichijo/marika";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "characterid",
      description: `Gives you the data of the given character id.`,
      aliases: ["charaid"],
      category: "weeb",
      usage: `${client.config.prefix}charaid [id]`,
      baseXp: 50,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined }: IParsedArgs
  ): Promise<void> => {
    /*eslint-disable @typescript-eslint/no-explicit-any*/
    /*eslint-disable @typescript-eslint/no-unused-vars*/
    if (!joined) return void (await M.reply(`Give me a character id, Baka!`));
    const client = new Character();
    const chitoge: any = joined;
    let chara;
    try {
      chara = await client.getCharacterById(chitoge);
    } catch (error) {
      return void M.reply("Invalid id");
    }
    let source;
    try {
      source = await client.getCharacterAnime(chara.mal_id);
    } catch (error) {
      return void M.reply("✖ An error occurred. Please try again later");
    }
    let text = "";
    text += `💙 *Name: ${chara.name}*\n`;
    if (chara.nicknames.length > 0)
      text += `💚 *Nicknames: ${chara.nicknames.join(", ")}*\n`;
    text += `💛 *Source: ${source.data[0].anime.title}*\n\n`;
    text += `🌐 *URL: ${chara.url}*\n\n`;
    if (chara.about !== null) text += `❤ *Description:* ${chara.about}`;
    const buffer = await request.buffer(chara.images.jpg.image_url);
    await M.reply(
      buffer,
      MessageType.image,
      undefined,
      undefined,
      text,
      undefined
    );
  };
}
