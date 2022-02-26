import { MessageType } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "play",
      description: "🎵 Play a song with just search term!",
      category: "media",
      aliases: ["music"],
      usage: `${client.config.prefix}play [term]`,
      baseXp: 30,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined }: IParsedArgs
  ): Promise<void> => {
    if (!joined) return void M.reply(" Provide a search term, Baka!");
    const term = joined.trim();
    const { videos } = await this.client.util.getYoutubeSearch(term);
    if (!videos || videos.length <= 0)
      return void M.reply(
        `⚓ No Matching videos found for the term : *${term}*`
      );
    this.client
      .sendMessage(
        M.from,
        await this.client.util.getYoutubeAudio(videos[0].url),
        MessageType.audio,
        {
          quoted: M.WAMessage,
          contextInfo: {
            externalAdReply: {
              title: videos[0].title.substr(0, 30),
              body: `Author : ${videos[0].author.substr(0, 20)}\n🌟 Chitoge 🌟`,
              mediaType: 2,
              thumbnail: await this.client.getBuffer(
                `https://i.ytimg.com/vi/${videos[0].id}/hqdefault.jpg`
              ),
              thumbnailUrl: `https://i.ytimg.com/vi/${videos[0].id}/hqdefault.jpg`,
              mediaUrl: videos[0].url,
            },
          },
        }
      )
      .catch((reason: Error) =>
        M.reply(`✖ An error occurred. Please try again later.`)
      );
  };
}
