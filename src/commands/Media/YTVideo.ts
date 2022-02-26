import { MessageType, Mimetype } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import YT from "../../lib/YT";
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
    if (!joined) return void M.reply("Provide a url, Baka!");
    M.reply(
      await this.client.util.getYoutubeVideo(joined.trim()),
      MessageType.video
    );
  };
}
