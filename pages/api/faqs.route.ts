import { faqsData } from "../../constants/faqs/faqsData";
import type { NextApiRequest, NextApiResponse } from "next";
import IFaq from "types/IFaq.type";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IFaq[]>
) {
  res.status(200).json(faqsData);
}
