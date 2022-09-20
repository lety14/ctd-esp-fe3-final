import * as yup from "yup";
import { errorMesages } from "./error-mesages";

const paymentSchema = yup
  .object({
    number: yup
      .string()
      .min(16, errorMesages.number.min)
      .required(errorMesages.number.required),
    nameOnCard: yup.string().required(errorMesages.nameOnCard.required),
    expDate: yup
      .string()
      .min(4, errorMesages.expDate.min)
      .required(errorMesages.expDate.required),
    cvc: yup
      .string()
      .min(3, errorMesages.cvc.min)
      .required(errorMesages.cvc.required),
  })
  .required(errorMesages.form.required);

export default paymentSchema;
