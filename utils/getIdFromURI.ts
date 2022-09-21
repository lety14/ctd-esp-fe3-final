export const getIdfromURI = (uri: string): number => {
  const array = uri.split("/");
  const id = array[array.length - 1];

  return parseInt(id);
};
