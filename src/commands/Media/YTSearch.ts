import { MessageType } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "ytsearch",
      description: "Searches YT",
      category: "media",
      aliases: ["yts"],
      usage: `${client.config.prefix}yts [term]`,
      baseXp: 20,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined }: IParsedArgs
  ): Promise<void> => {
    if (!joined) return void M.reply("🔎 Provide a search term");
    const term = joined.trim();
    const { videos } = await this.client.util.getYoutubeSearch(term);
    if (!videos || videos.length <= 0)
      return void M.reply(`⚓ No Matching videos found for : *${term}*`);
    const length = videos.length < 10 ? videos.length : 10;
    let text = `🔎 *Results for ${term}*\n`;
    for (let i = 0; i < length; i++) {
      text += `*#${i + 1}*\n📗 *Title:* ${videos[i].title}\n📕 *Channel:* ${
        videos[i].author
      }\n 📙 *Duration:* ${videos[i].metadata.duration.seconds} seconds (${
        videos[i].metadata.duration.simple_text
      })\n📘 *URL:* ${videos[i].url}\n\n`;
    }
    this.client
      .sendMessage(M.from, text, MessageType.extendedText, {
        quoted: M.WAMessage,
        contextInfo: {
          externalAdReply: {
            title: `Search Term: ${term}`,
            body: `🌟 Chitoge 🌟`,
            mediaType: 2,
            thumbnail: await this.client.getBuffer(
              videos[0].metadata.thumbnails[0].url
            ),
            thumbnailUrl: videos[0].metadata.thumbnails[0].url,
            mediaUrl: videos[0].url,
          },
        },
      })
      .catch((reason: any) =>
        M.reply(`✖  An error occurred, Reason: ${reason}`)
      );
  };
}
