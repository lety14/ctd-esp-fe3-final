import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PaginationComponent from "./pagination.component";

describe("Pagination component", () => {
  describe("when rendering default component", () => {
    it("should render the first and last numbers", () => {
      render(<PaginationComponent pagesQty={5} setCurrentPage={() => {}} />);
      const firstPage = screen.getByLabelText("page 1");
      const lastPage = screen.getByLabelText("Go to page 5");

      expect(firstPage).toBeInTheDocument();
      expect(lastPage).toBeInTheDocument();
    });

    it("should render the button next and prev", () => {
      render(<PaginationComponent pagesQty={5} setCurrentPage={() => {}} />);
      const buttonPrevPage = screen.getByLabelText("Go to previous page");
      const buttonNextPage = screen.getByLabelText("Go to next page");

      expect(buttonPrevPage).toBeInTheDocument();
      expect(buttonNextPage).toBeInTheDocument();
    });
  });

  describe("when the user clicks on a page", () => {
    it("should change the current page", async () => {
      render(<PaginationComponent pagesQty={5} setCurrentPage={() => {}} />);
      const lastPage = screen.getByLabelText("Go to page 5");

      expect(await screen.findByLabelText("page 1")).toBeInTheDocument();

      await userEvent.click(lastPage);

      expect(await screen.findByLabelText("page 5")).toBeInTheDocument();
      expect(screen.queryByLabelText("page 1")).not.toBeInTheDocument();
      expect(screen.queryByLabelText("Go to page 5")).not.toBeInTheDocument();
    });
  });
});
