/** @format */

import { characters } from "genshin-db";

export interface IGenshin {
	name: string;
	title: string;
	description: string;
	rarity: string;
	element: string;
	weapontype: string;
	substat: string;
	gender: string;
	body: string;
	association: string;
	region: string;
	affiliation: string;
	birthdaymmdd: string;
	birthday: string;
	constellation: string;
	cv: {
		english: string;
		chinese: string;
		japanese: string;
		korean: string;
	};
	images: {
		icon: string;
		sideicon: string;
		cover1: string;
		cover2: string;
	};
	url: {
		fandom: string;
	};
}

export default async (
	character: string
): Promise<IGenshin | { error: string }> => {
	try {
		const result = await characters(character);
		if (!result.description) return { error: "No such character" };
		return result;
	} catch (err) {
		return { error: "No such character" };
	}
};
