import "@testing-library/jest-dom";
import { comic } from "dh-marvel/test/mocks/comic";
import comicWithoutStock from "dh-marvel/test/mocks/comicWithoutStock";
import { server } from "dh-marvel/test/server";
import { createMocks } from "node-mocks-http";
import handleComics from "dh-marvel/pages/api/comics/index.route";
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Comics", () => {
  describe("when sending a valid request", () => {
    it("should return status 200", async () => {
      const serverResponse = await fetch("/marvel/api/comics");
      expect(serverResponse.status).toBe(200);
    });

    it("should return 'comic' mocked data if no query is provided", async () => {
      const serverResponse = await fetch("/marvel/api/comics");
      const data = await serverResponse.json();

      expect(data).toEqual([expect.objectContaining(comic)]);
    });
    it("should return 'comicsWithOffsetAndLimit' mocked data if there is query provided", async () => {
      const serverResponse = await fetch(
        "/marvel/api/comics?offset=10&limit=5"
      );
      const data = await serverResponse.json();
      expect(data).toEqual([expect.objectContaining(comicWithoutStock)]);
    });
  });
});
