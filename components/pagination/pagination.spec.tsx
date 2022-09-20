import { render, screen } from "@testing-library/react";
import character from "dh-marvel/test/mocks/character";
import CardComponent from "./pagination.component";

describe("Card component", () => {
  describe("when rendering default component", () => {
    it("should render the card title", () => {
      render(<CardComponent character={character} />);
      const title = screen.getByText("Abomination (Ultimate)");
      expect(title).toBeInTheDocument();
    });
    it("should render the buttons", () => {
      render(<CardComponent character={character} />);
      const buttonBuyNow = screen.getByText("Comprar ahora");
      const buttonAddToChart = screen.getByText("Agregar al carrito");

      expect(buttonBuyNow).toBeInTheDocument();
      expect(buttonAddToChart).toBeInTheDocument();
    });
  });
});
