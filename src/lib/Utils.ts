import { readdirSync, statSync } from "fs";
import { join } from "path";
import getUrls from "get-urls";
import { exec } from "child_process";
import { readFile, unlink, writeFile } from "fs/promises";
import { createWriteStream } from "fs-extra";
import { tmpdir } from "os";
import { promisify } from "util";
import YT from "youtubei.js";

interface detailsResult {
  title: string;
  description: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  metadata: {
    embed: {
      iframeUrl: string;
      flashUrl: string;
      width: number;
      height: number;
      flashSecureUrl: string;
    };
    likes: number;
    dislikes: number;
    view_count: number;
    average_rating: number;
    length_seconds: string;
    channel_id: string;
    channel_url: string;
    external_channel_id: string;
    is_live_content: boolean;
    is_family_safe: boolean;
    is_unlisted: boolean;
    is_private: boolean;
    has_ypc_metadata: boolean;
    category: string;
    channel_name: string;
    publish_date: string;
    upload_date: string;
    keywords: string[];
  };
}

interface searchResult {
  search_metadata: {
    query: string;
    corrected_query: string;
    estimated_results: number;
  };
  videos: {
    title: string;
    description: string;
    author: string;
    id: string;
    url: string;
    channel_url: string;
    metadata: {
      view_count: string;
      short_view_count_text: {
        simple_text: string;
        accessobility_label: string;
      };
      thumbnails: {
        url: string;
        width: number;
        height: number;
      }[];
      duration: {
        seconds: number;
        simple_text: string;
        accessibility_label: string;
      };
      published: string;
      badges: string[];
      owner_badges: string[];
    };
  }[];
}

export default class {
  exec = promisify(exec);
  GIFBufferToVideoBuffer = async (image: Buffer): Promise<Buffer> => {
    const filename = `${tmpdir()}/${Math.random().toString(36)}`;
    await writeFile(`${filename}.gif`, image);
    await this.exec(
      `ffmpeg -f gif -i ${filename}.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${filename}.mp4`
    );
    const buffer = await readFile(`${filename}.mp4`);
    Promise.all([unlink(`${filename}.mp4`), unlink(`${filename}.gif`)]);
    return buffer;
  };

  Mp4ToMp3 = async (video: Buffer): Promise<Buffer> => {
    const filename = `${tmpdir()}/${Math.random().toString(36)}`;
    await writeFile(`${filename}.mp4`, video);
    await this.exec(`ffmpeg -i ${filename}.mp4 ${filename}.mp3`);
    const result = await readFile(`${filename}.mp3`);
    Promise.all([unlink(`${filename}.mp3`), unlink(`${filename}.mp4`)]);
    return result;
  };

  readdirRecursive = (directory: string): string[] => {
    const results: string[] = [];

    const read = (path: string): void => {
      const files = readdirSync(path);

      for (const file of files) {
        const dir = join(path, file);
        if (statSync(dir).isDirectory()) read(dir);
        else results.push(dir);
      }
    };
    read(directory);
    return results;
  };

  capitalize = (text: string): string =>
    `${text.charAt(0).toUpperCase()}${text.slice(1)}`;

  getUrls = (text: string): string[] => Array.from(getUrls(text));

  chunk = <T>(arr: T[], length: number): T[][] => {
    const result = [];
    for (let i = 0; i < arr.length / length; i++) {
      result.push(arr.slice(i * length, i * length + length));
    }
    return result;
  };

  getYoutubeVideoDetails = async (url: string): Promise<detailsResult> => {
    const yt = await new YT();
    const result = await yt.getDetails(url);
    return result;
  };

  getYoutubeSearch = async (query: string): Promise<searchResult> => {
    const yt = await new YT();
    const result = await yt.search(query);
    return result;
  };

  getYoutubeVideo = async (
    url: string,
    filename = `${tmpdir()}/${Math.random().toString(36)}.mp4`
  ): Promise<Buffer> => {
    const yt = await new YT();
    const video = yt.download(url, {
      format: "mp4",
      quality: "480p",
      type: "videoandaudio",
    });
    video.pipe(createWriteStream(filename));
    filename = await new Promise((resolve, reject) => {
      video.on("end", () => resolve(filename));
      video.on("error", (err: any) => reject(err && console.log(err)));
    });
    return await readFile(filename);
  };
}
