import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import { Manga } from "@shineiichijo/marika";
import { MessageType } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "manga",
      description: `Gives you the data of the given manga from MyAnimeList.`,
      aliases: ["mnga"],
      category: "weeb",
      usage: `${client.config.prefix}manga [title]`,
      baseXp: 50,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined }: IParsedArgs
  ): Promise<void> => {
    /*eslint-disable @typescript-eslint/no-explicit-any*/
    /*eslint-disable @typescript-eslint/no-unused-vars*/
    if (!joined) return void (await M.reply(`Give me a manga title, Baka!`));
    const chitoge = joined.trim();
    const client = new Manga();
    let search;
    try {
      search = await client.searchManga(chitoge);
    } catch (error) {
      return void M.reply("Couldn't find any manga");
    }
    let text = "";
    text += `🎀 *Title: ${search.data[0].title}*\n`;
    text += `📈 *Status: ${search.data[0].status}*\n`;
    text += `🌸 *Total Volumes: ${search.data[0].volumes}*\n`;
    text += `🎗 *Total Chapters: ${search.data[0].chapters}*\n`;
    text += `🧧 *Genres:*\n`;
    for (let i = 0; i < search.data[0].genres.length; i++) {
      text += `\t\t\t\t\t\t\t\t*${search.data[0].genres[i].name}*\n`;
    }
    text += `✨ *Published on: ${search.data[0].published.from}*\n`;
    text += `🌟 *Score: ${search.data[0].scored}*\n`;
    text += `🎐 *Popularity: ${search.data[0].popularity}*\n`;
    text += `🎏 *Favorites: ${search.data[0].favorites}*\n`;
    text += `✍ *Authors:*\n`;
    for (let i = 0; i < search.data[0].authors.length; i++) {
      text += `\t\t\t\t\t\t\t\t\t*${search.data[0].authors[i].name}* *(${search.data[0].authors[0].type})*\n`;
    }
    text += `\n🌐 *URL: ${search.data[0].url}*\n\n`;
    if (search.data[0].background !== null)
      text += `🎆 *Background:* ${search.data[0].background}`;
    text += `❄️ *Description:* ${search.data[0].synopsis.replace(
      /\[Written by MAL Rewrite]/g,
      ""
    )}`;
    return void M.reply(
      await this.client.getBuffer(search.data[0].images.jpg.large_image_url),
      MessageType.image,
      undefined,
      undefined,
      text
    );
  };
}
