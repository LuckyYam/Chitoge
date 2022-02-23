/** @format */

import AnimeQuotes from "animequotes";

export interface IQuotes {
	quote: string;
	anime: string;
	id: number;
	name: string;
	success: boolean;
}

export default async (
	character: string
): Promise<IQuotes | { error: string }> => {
	try {
		const result = await AnimeQuotes.getRandomQuoteByCharacter(character);
		if (!result.success)
			return { error: "Couldn't find any quote for the given character." };
		return result;
	} catch (err) {
		return { error: "Couldn't find any quote for the given character." };
	}
};
