import type { NextApiRequest, NextApiResponse } from "next";
import {
  ERROR_BAD_PARAMETERS_REQUESTS,
  ERROR_BAD_REQUEST,
  ERROR_INVALID_CREDENTIALS,
  ERROR_SERVER,
} from "dh-marvel/services/comic/comic.errors";
import {
  getCharactersById,
  getComics,
  getComicsByCharactersId,
} from "dh-marvel/services/marvel/marvel.service";
import { IComicResponse } from "types/IComic.type";

type Data = IComicResponse | { error: string; message: string };

type Query = {
  comic_id: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.query;
  const { comic_id } = query as Query;

  const comicID = parseInt(comic_id);

  try {
    const result: IComicResponse = await getComicsByCharactersId(comicID);

    if (result.code === "InvalidCredentials") {
      res.status(401).json(ERROR_INVALID_CREDENTIALS);
      return;
    }
    if (result.code === 409) {
      res.status(409).json(ERROR_BAD_PARAMETERS_REQUESTS);
      return;
    }
    if (result.code === 200) {
      res.status(200).json(result);
      return;
    }

    res.status(400).json(ERROR_BAD_REQUEST);
  } catch (err) {
    console.log(err);
    res.status(500).json(ERROR_SERVER);
  }
}
