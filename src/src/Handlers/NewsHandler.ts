import { MessageType } from "@adiwajshing/baileys";
import { getNewsNoDetails } from "mal-scraper";
import WAClient from "../lib/WAClient";
import cron from "node-cron";

export default class NewsHandler {
  constructor(public client: WAClient) {}

  broadcastNews = async (): Promise<void> => {
    cron.schedule("*/15 * * * *", async () => {
      const news: any = await getNewsNoDetails(20);
      const data = await await this.client.getFeatures("news");
      if (data.id === news[0].newsNumber) return void null;
      for (let i = 0; i < data.jids.length; i++) {
        const text = `*━━━━━❰ JUST IN ❱━━━━━━*\n\n\t\t\t\t\t\t\t📰 *News* 📰\n\n🎀 *Title: ${news[0].title}*\n\n❄ *Short Details*: ${news[0].text}\n\n🌐 *URL: ${news[0].link}*`;
        const image = await this.client.getBuffer(news[0].image);
        await this.client.sendMessage(data.jids[i], image, MessageType.image, {
          caption: text,
          contextInfo: {
            externalAdReply: {
              title: news[0].title,
              body: news[0].text,
              thumbnail: image,
              sourceUrl: news[0].link,
            },
          },
        });
        setTimeout(async () => {
          await this.client.DB.feature.updateOne(
            { feature: "news" },
            { $set: { id: news[0].newsNumber } }
          );
        }, 300000);
      }
    });
  };
}
