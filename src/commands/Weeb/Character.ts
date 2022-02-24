/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import { Character } from "@shineiichijo/marika";
import { MessageType } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "character",
      description: `Searches the given character.`,
      aliases: ["chara"],
      category: "weeb",
      usage: `${client.config.prefix}chara [name]`,
      baseXp: 50,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined }: IParsedArgs
  ): Promise<void> => {
    /*eslint-disable @typescript-eslint/no-explicit-any*/
    /*eslint-disable @typescript-eslint/no-unused-vars*/
    if (!joined) return void (await M.reply(`Give me a character name, Baka!`));
    const chitoge = joined.trim();
    const client = new Character();
    let chara;
    try {
      chara = await client.searchCharacter(chitoge, { page: 1, limit: 10 });
    } catch (error) {
      return void M.reply("Couldn't find any matching character");
    }
    let text = "";
    for (const Chara of chara.data) {
      text += `💙 *Name: ${Chara.name}*\n`;
      text += `🌐 *URL: ${Chara.url}*\n\n`;
      text += `Use ${this.client.config.prefix}charaid ${Chara.mal_id} to get the full info of this character.\n\n`;
    }
    return void M.reply(await this.client.getBuffer(chara.data[0].images.jpg.image_url), MessageType.image, undefined, undefined, text)
  };
}
