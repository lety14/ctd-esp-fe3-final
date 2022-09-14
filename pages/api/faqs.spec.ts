import { faqsData } from "../../constants/faqs/faqsData";
import { createMocks } from "node-mocks-http";

import handlerFaqs from "dh-marvel/pages/api/faqs.route";

describe("Faqs", () => {
  describe("when sending a GET request", () => {
    it("should return a status 200", async () => {
      const { req, res } = createMocks({
        method: "GET",
      });
      await handlerFaqs(req, res);
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(faqsData)
      );
    });
  });
});
