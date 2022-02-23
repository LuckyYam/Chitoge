import prettier from "prettier";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "prettier",
      description: "Formats the quoted or given code",
      aliases: ["format"],
      category: "coding",
      usage: `${client.config.prefix}prettier [quote message] | [code]`,
      baseXp: 30,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined, flags }: IParsedArgs
  ): Promise<void> => {
    flags.forEach((flag) => (joined = joined.replace(flag, "")));
    if (!M.quoted?.message?.message?.conversation && !joined)
      return void M.reply(`Quote the code or provide it, Baka!`);
    let semi = false;
    if (flags.includes("--true")) semi = true;
    let code: string;
    if (M.quoted?.message?.message?.conversation) {
      code = M.quoted.message.message.conversation;
    } else {
      code = joined.trim();
    }
    const result = prettier.format(code, { semi, parser: "babel" });
    const text = `\`\`\`${result}\`\`\``;
    return void M.reply(text);
  };
}
