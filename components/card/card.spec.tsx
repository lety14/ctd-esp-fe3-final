import { render, screen } from "@testing-library/react";
import { comicMock } from "dh-marvel/test/mocks/comic";
import CardComponent from "./card.component";

describe("Card component", () => {
  describe("when rendering default component", () => {
    it("should render the card title", () => {
      render(<CardComponent comic={comicMock} />);
      const title = screen.getByText("Abomination (Ultimate)");
      expect(title).toBeInTheDocument();
    });
    it("should render the buttons", () => {
      render(<CardComponent comic={comicMock} />);
      const buttonBuyNow = screen.getByText("Comprar ahora");
      const buttonAddToChart = screen.getByText("Agregar al carrito");

      expect(buttonBuyNow).toBeInTheDocument();
      expect(buttonAddToChart).toBeInTheDocument();
    });
  });
});
