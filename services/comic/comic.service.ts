export const getComicsByPage = async (
  qtyOfCards: number,
  pageNumber: number
): Promise<any> => {
  const offset = qtyOfCards * pageNumber - qtyOfCards;
  const params = new URLSearchParams();

  if (offset) params.set("offset", `${offset}`);
  if (qtyOfCards) params.set("limit", `${qtyOfCards}`);

  const paramsToFetch = params.toString();
  const response = await fetch(`/api/comics?${paramsToFetch || ""}`);
  return await response.json();
};

export const getComicsById = async (id: number): Promise<any> => {
  const response = await fetch(`/api/comics/${id}`);

  return await response.json();
};

export const getComicsByCharacterId = async (
  id: number,
  limit?: number
): Promise<any> => {
  const params = new URLSearchParams();

  if (limit) params.set("limit", `${limit}`);
  const paramsToFetch = params.toString();

  const response = await fetch(
    `/api/characters/${id}/comics?${paramsToFetch || ""}`
  );

  return await response.json();
};
