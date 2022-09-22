import { ICheckout } from "types/ICheckout.type";

export const postCheckout = async (data: ICheckout): Promise<any> => {
  const dataCkeckout = JSON.stringify(data);
  const response = await fetch(`/api/checkout`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: dataCkeckout,
  });

  return await response.json();
};
