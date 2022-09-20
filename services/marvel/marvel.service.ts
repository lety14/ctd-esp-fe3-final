import { generateAuthenticationString } from "dh-marvel/services/marvel/marvel-auth.service";
import { IComic, IComicResponse } from "types/IComic.type";

const MARVEL_API_URL = process.env.MARVEL_API_URL;

const fetchApi = async (endpoint: string, urlParams?: string) => {
  const authString = generateAuthenticationString();
  const url = `${MARVEL_API_URL}/${endpoint}?${authString}&${urlParams || ""}`;

  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "GET", headers });
  return await response.json();
};

export const getComics = async (offset?: number, limit?: number) => {
  const params = new URLSearchParams();
  if (offset) params.set("offset", `${offset}`);
  if (limit) params.set("limit", `${limit}`);
  return fetchApi("comics", params.toString());
};

export const getComic = async (comicId: number) => {
  const data = await fetchApi(`comics/${comicId}`);
  const results = data.data.results;
  if (results.length > 0) {
    const comic = results[0];
    if (`${comic.id}`.endsWith("0")) {
      comic.price = 48;
      comic.oldPrice = 48;
      comic.stock = 0;
    } else {
      comic.price = 72;
      comic.oldPrice = 87;
      comic.stock = 2;
    }
    return comic;
  } else return null;
};

export const getCharacters = async (offset?: number, limit?: number) => {
  const params = new URLSearchParams();
  if (offset) params.set("offset", `${offset}`);
  if (limit) params.set("limit", `${limit}`);
  return fetchApi("characters", params.toString());
};

export const getCharacter = async (characterId: number) => {
  const data = await fetchApi(`characters/${characterId}`);
  const results = data.data.results;
  if (results.length > 0) return results[0];
  else return null;
};
//
export const getCharactersByComicId = async (comicID: number) => {
  const result = await fetchApi(`comics/${comicID}/characters`);

  return result;
};

export const getComicsByCharacterId = async (
  characterID: number,
  limit?: number
) => {
  const params = new URLSearchParams();
  if (limit) params.set("limit", `${limit}`);

  return await fetchApi(`characters/${characterID}/comics`, params.toString());
};
