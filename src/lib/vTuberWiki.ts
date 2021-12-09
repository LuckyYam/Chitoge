/** @format */

import { wiki } from "vtuber-wiki";

export interface IVTuber {
	title1: string;
	image1: string;
	caption1: string;
	original_name: string;
	nick_name: string;
	debut_date: string;
	character_designer: string;
	affiliation: string;
	channel: string;
	social_media: string;
	official_website: string;
	gender: string;
	age: string;
	birthday: string;
	height: string;
	weight: string;
	zodiac_sign: string;
	emoji: string;
	class: string;
	Original: string;
	description: string;
	image_url: string;
	more: string;
}

export default async (vtuber: string): Promise<IVTuber | { error: string }> => {
	try {
		const result = await wiki(vtuber);
		if (!result.image_url) return { error: "No such vTuber" };
		return result;
	} catch (err) {
		return { error: "No such vTuber" };
	}
};
