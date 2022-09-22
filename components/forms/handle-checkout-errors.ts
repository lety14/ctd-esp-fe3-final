import ERROR_MESSAGES_CHECKOUT from "./errors-submit-form";

type Data = {
  error: string;
  message: string;
};

const catchError = (response: Data) => {
  if (response.error === "CARD_DATA_INCORRECT") {
    return ERROR_MESSAGES_CHECKOUT.CARD_DATA_INCORRECT.message;
  }
  if (response.error === "CARD_WITHOUT_FUNDS") {
    return ERROR_MESSAGES_CHECKOUT.CARD_WITHOUT_FUNDS.message;
  }
  if (response.error === "CARD_WITHOUT_AUTHORIZATION") {
    return ERROR_MESSAGES_CHECKOUT.CARD_WITHOUT_AUTHORIZATION.message;
  }
  if (response.error === "INCORRECT_ADDRESS") {
    return ERROR_MESSAGES_CHECKOUT.INCORRECT_ADDRESS.message;
  }

  return ERROR_MESSAGES_CHECKOUT.SERVER_ERROR.message;
};

export default catchError;
