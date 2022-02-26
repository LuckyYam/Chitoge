import { MessageType } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { validateID } from "ytdl-core";
import { ISimplifiedMessage, IParsedArgs } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "ytvideo",
      description: "Downloads given YT Video",
      category: "media",
      aliases: ["ytv"],
      usage: `${client.config.prefix}ytv [URL]`,
      baseXp: 10,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined }: IParsedArgs
  ): Promise<void> => {
    if (!joined)
      return void M.reply(
        "🔎 Provide the URL of the YT video you want to download"
      );
    const url = joined
      .trim()
      .split(" ")[0]
      .replace(/\https:\/\/youtu.be\//g, "")
      .replace(/\https:\/\/youtube.com\/watch?v=/g, "");
    if (!validateID(url)) return void M.reply("⚓ Provide a Valid YT UR");
    const details = await this.client.util.getYoutubeVideoDetails(url);
    const text = `📗 *Title: ${details.title}*\n📕 *Channel: ${details.metadata.channel_name}*\n📙 *Duration: ${details.metadata.length_seconds} seconds*`;
    await M.reply(
      await this.client.util.getYoutubeVideo(url),
      MessageType.video,
      undefined,
      undefined,
      text
    ).catch((reason: Error) =>
      M.reply(`✖ An error occurred, Reason: ${reason}`)
    );
  };
}
