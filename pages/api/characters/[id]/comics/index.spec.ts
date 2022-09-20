import { createMocks } from "node-mocks-http";
import { handlers } from "dh-marvel/test/server-handlers";
import "@testing-library/jest-dom";
import comicsWithOffsetAndLimit from "dh-marvel/test/mocks/comicsWithOffsetAndLimit";
import { Query } from "express-serve-static-core";
import { server } from "dh-marvel/test/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Comics", () => {
  describe("when sending a valid request", () => {
    it("should return status 200", async () => {
      const query = { offset: "10", limit: "1" } as Query;

      const { req, res } = createMocks({
        method: "GET",
        query: query,
      });

      await handlers(req, res);
      console.log(res._getData());
      console.log(req.query);
      console.log({ ...comicsWithOffsetAndLimit });

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({ ...comicsWithOffsetAndLimit })
      );
    });
    // });

    it("should return status 200", async () => {
      const query = { offset: "10", limit: "1" } as Query;

      const { req, res } = createMocks({
        method: "GET",
        body: { id: 1 },
      });

      await handlers(req, res);
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toHaveProperty("name");
    });
  });
});
