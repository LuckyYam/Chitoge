import { MessageType } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { validateID } from "ytdl-core";
import { ISimplifiedMessage, IParsedArgs } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "ytaudio",
      description: "Downloads given YT Video and sends it as Audio",
      category: "media",
      aliases: ["yta"],
      usage: `${client.config.prefix}ytv [URL]`,
      baseXp: 20,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined }: IParsedArgs
  ): Promise<void> => {
    if (!joined)
      return void M.reply(
        "🔎 Provide the URL of the YT video you want to download as an audio"
      );
    const url = joined
      .trim()
      .split(" ")[0]
      .replace(/\https:\/\/youtu.be\//g, "")
      .replace(/\https:\/\/youtube.com\/watch?v=/g, "");
    if (!validateID(url)) return void M.reply("⚓ Provide a Valid YT URL");
    await M.reply(
      await this.client.util.Mp4ToMp3(
        await this.client.util.getYoutubeVideo(url)
      ),
      MessageType.audio
    ).catch((reason: Error) =>
      M.reply(`✖ An error occurred, Reason: ${reason}`)
    );
  };
}
