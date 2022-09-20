import "@testing-library/jest-dom";
import { server } from "dh-marvel/test/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Comics", () => {
  describe("when sending a valid request", () => {
    it("should return status 200", async () => {
      const serverResponse = await fetch("/marvel/api/comics/1");
      console.log(serverResponse);
      expect(serverResponse.status).toBe(200);
      expect(serverResponse.body).toBe(200);
    });
  });
});
