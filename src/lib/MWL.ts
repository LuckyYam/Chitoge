import axios from "axios"

export interface IWaifuResponse {
    id: number;
      slug: string;
      name: string;
      original_name: string;
      romaji_name: string;
      display_picture: string;
      description: string;
      weight: string;
      height: string;
      bust: string;
      hip: string;
      waist: string;
      blood_type: string;
      origin: string;
      age: number;
      birthday_month: string;
      birthday_day: number;
      birthday_year: string;
      likes: number;
      trash: number;
      popularity_rank: number;
      like_rank: number;
      trash_rank: number;
      husbando: boolean;
      nsfw: boolean;
      creator: {
        id: number;
        name: string;
      },
      tags: {
           id: number;
           name: string ;
        }[];
      url: string;
      appearances: ISeries[]
      series: ISeries
}

export default async (url = "https://reina-api.vercel.app/api/mwl/random"): Promise<IWaifuResponse | { error: string }> => {
 try {
   const { data } = await axios.get(url)
   return data
 } catch (error) {
   return { error: "An error occurred. Try again later"}
 }
}

interface ISeries {
    name: string;
          original_name: string;
          romaji_name: string;
          description: string;
          slug: string;
          airing_start: string;
          airing_end: string;
          episode_count: string;
          release: string;
          display_picture: string;
          studio: string;
}