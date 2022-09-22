import { render, screen } from "@testing-library/react";
import { comicMock } from "dh-marvel/test/mocks/comic";
import { IComic } from "types/IComic.type";
import { useRouter } from "next/router";
import CardCheckoutProduct from "./card-checkout-product";

const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
(useRouter as jest.Mock).mockImplementation(() => ({
  push: mockPush,
}));

describe("CardCheckoutProduct component", () => {
  describe("when rendering default component", () => {
    it("should render the card title", () => {
      render(<CardCheckoutProduct comic={comicMock as IComic} />);
      const title = screen.getByText("Marvel Previews (2017)");
      expect(title).toBeInTheDocument();
    });
    it("should render the isbn", () => {
      render(<CardCheckoutProduct comic={comicMock as IComic} />);
      const isbn = screen.getByText(/ISBN: 123456/i);
      expect(isbn).toBeInTheDocument();
    });
    it("should render the card image", () => {
      render(<CardCheckoutProduct comic={comicMock as IComic} />);
      const image = screen.getByAltText("Marvel Previews (2017)");
      expect(image).toBeInTheDocument();
    });
    it("should render the price", () => {
      render(<CardCheckoutProduct comic={comicMock as IComic} />);
      const price = screen.getByText(/50/i);
      expect(price).toBeInTheDocument();
    });
  });
  describe("when rendering default component whit data undifined", () => {
    it("should render the card title", () => {
      render(<CardCheckoutProduct comic={undefined} />);
      const title = screen.getByTestId("skeleton-title");
      expect(title).toBeInTheDocument();
    });
    it("should render the card image", () => {
      render(<CardCheckoutProduct comic={undefined} />);
      const image = screen.getByTestId("skeleton-image");
      expect(image).toBeInTheDocument();
    });
    it("should render the price", () => {
      render(<CardCheckoutProduct comic={undefined} />);
      const price = screen.getByTestId("skeleton-price");
      expect(price).toBeInTheDocument();
    });
  });
});
