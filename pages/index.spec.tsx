import { render, screen } from "@testing-library/react";
import Index from "dh-marvel/pages/index.page";
import { comicsMock } from "dh-marvel/test/mocks/comics";
import { IComicResponse } from "types/IComic.type";

describe("IndexPage", () => {
  describe("when rendering default", () => {
    it("should render card title", () => {
      render(<Index comics={comicsMock as IComicResponse} />);
      const title = screen.getByText("Marvel Previews (2017)");
      expect(title).toBeInTheDocument();
    });
    it("should render card image", () => {
      render(<Index comics={comicsMock as IComicResponse} />);
      const title = screen.getByAltText("Marvel Previews (2017)");
      expect(title).toBeInTheDocument();
    });
  });
});
