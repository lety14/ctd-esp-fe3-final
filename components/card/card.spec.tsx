import { render, screen, waitFor } from "@testing-library/react";
import { comicMock } from "dh-marvel/test/mocks/comic";
import { IComic } from "types/IComic.type";
import CardComponent from "./card.component";
import { useRouter } from "next/router";
import userEvent from "@testing-library/user-event";

const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
(useRouter as jest.Mock).mockImplementation(() => ({
  push: mockPush,
}));

describe("Card component", () => {
  describe("when rendering default component", () => {
    it("should render the card title", () => {
      render(<CardComponent comic={comicMock as IComic} />);
      const title = screen.getByText("Marvel Previews (2017)");
      expect(title).toBeInTheDocument();
    });
    it("should render the card image", () => {
      render(<CardComponent comic={comicMock as IComic} />);
      const title = screen.getByAltText("Marvel Previews (2017)");
      expect(title).toBeInTheDocument();
    });
    it("should render the buttons", () => {
      render(<CardComponent comic={comicMock as IComic} />);
      const buttonBuyNow = screen.getByText(/comprar/i);
      const buttonAddToChart = screen.getByText(/ver detalles/i);

      expect(buttonBuyNow).toBeInTheDocument();
      expect(buttonAddToChart).toBeInTheDocument();
    });
  });

  describe("when the user click on a button", () => {
    it("should go to products", async () => {
      render(<CardComponent comic={comicMock as IComic} />);

      userEvent.click(screen.getByRole("button", { name: "COMPRAR" }));

      waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith(1, "/checkout?comic=82967");
      });
    });
    it("should redirect to comic detail page if the comic hasn't got stock", async () => {
      const comicMockWhitoutStock = {
        id: 82967,
        stock: 0,
        title: "Marvel Previews (2017)",
        thumbnail: {
          path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
          extension: "jpg",
        },
      };

      render(<CardComponent comic={comicMockWhitoutStock as IComic} />);

      userEvent.click(screen.getByRole("button", { name: "COMPRAR" }));
      waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith(1, "/checkout/comics/82967");
      });
    });
  });
});
