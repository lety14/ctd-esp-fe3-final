import * as yup from "yup";
import { errorMesages } from "./error-mesages";

export const personalDataSchema = yup
  .object({
    name: yup
      .string()
      .required(errorMesages.firstname.required)
      .min(2, errorMesages.firstname.min)
      .max(50, errorMesages.firstname.max),

    lastname: yup
      .string()
      .required(errorMesages.lastname.required)
      .min(2, errorMesages.lastname.min)
      .max(50, errorMesages.lastname.max),

    email: yup
      .string()
      .required(errorMesages.email.required)
      .email(errorMesages.email.format),
  })
  .required();
