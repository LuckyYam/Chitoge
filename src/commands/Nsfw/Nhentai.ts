import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import { MessageType, Mimetype } from "@adiwajshing/baileys";
import { Doujin } from "@shineiichijo/nhentai-pdf";
import { tmpdir } from "os";
import { readFile } from "fs/promises";
import nHentai from "shentai";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "nhentai",
      description: `Gives you the doujin of the given nhentai as a pdf.`,
      aliases: ["ndoujin"],
      category: "nsfw",
      usage: `${client.config.prefix}nhentai [nhentai_id]`,
      baseXp: 50,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined }: IParsedArgs
  ): Promise<void> => {
    const sHentai = new nHentai();
    const term: any = joined;
    if (!term)
      return void M.reply(
        `Provide the id of the doujin. You can know the id by using ${this.client.config.prefix}nhentai-search [term]`
      );
    const doujin = new Doujin(`https://nhentai.net/g/${term}/`);
    if (!doujin.validate()) return void M.reply("Invalid nhentai id");
    const search = await sHentai.getDoujin(term);
    const filename = `${tmpdir()}/${Math.random().toString(36)}.pdf`;
    await doujin.pdf(filename);
    const img: any = await this.client.getBuffer(search.pages[0]);
    const file = await readFile(filename);
    return void (await this.client.sendMessage(
      M.from,
      file,
      MessageType.document,
      {
        mimetype: Mimetype.pdf,
        quoted: M.WAMessage,
        thumbnail: Buffer.from(img, "binary").toString("base64"),
        filename: search.titles.english,
      }
    ));
  };
}
