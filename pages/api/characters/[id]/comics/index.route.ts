import type { NextApiRequest, NextApiResponse } from "next";
import {
  ERROR_BAD_PARAMETERS_REQUESTS,
  ERROR_BAD_REQUEST,
  ERROR_INVALID_CREDENTIALS,
  ERROR_SERVER,
} from "dh-marvel/services/comic/comic.errors";
import { getComicsByCharacterId } from "dh-marvel/services/marvel/marvel.service";

type Data = any | { error: string; message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.setHeader("Content-Type", "application/json");

  const {
    query: { id, limit },
  } = req;
  const characterId = parseInt(id as string);
  const limitNumber = parseInt(limit as string);

  try {
    const result = await getComicsByCharacterId(characterId, limitNumber);

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
