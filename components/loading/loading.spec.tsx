import { render, screen } from "@testing-library/react";
import { Loader } from "./loading.component";

describe("Loader component", () => {
  describe("when rendering default component", () => {
    it("should render the accordion title", () => {
      render(<Loader />);
      const image = screen.getByAltText("loading");
      expect(image).toBeInTheDocument();
    });
  });
});
