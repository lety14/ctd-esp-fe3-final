import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AccordionComic from "./accordion-comic.component";
import { IComic } from "types/IComic.type";
import { comicMock } from "dh-marvel/test/mocks/comic";

const comicMockEmptyData = {
  creators: { items: [] },
  description: "",
  characters: { items: [] },
};

describe("AccordionComic component", () => {
  describe("when rendering default component", () => {
    it("should render the accordion title", () => {
      render(<AccordionComic comic={comicMockEmptyData as IComic} />);

      const titleI = screen.getByText("Descripción");
      const titleII = screen.getByText("Personajes");
      const titleIII = screen.getByText("Creadores");

      expect(titleI).toBeInTheDocument();
      expect(titleII).toBeInTheDocument();
      expect(titleIII).toBeInTheDocument();
    });

    it("should not show the accordion content by default", () => {
      render(<AccordionComic comic={comicMockEmptyData as IComic} />);

      const contentI = screen.getByText("Sin descripción disponible.");
      const contentII = screen.getByText(
        "Sin listado de personajes disponible."
      );
      const contentIII = screen.getByText(
        "Sin listado de creadores disponible."
      );

      expect(contentI).not.toBeVisible();
      expect(contentII).not.toBeVisible();
      expect(contentIII).not.toBeVisible();
    });
    it("should not show the accordion content by default", () => {
      render(<AccordionComic comic={comicMockEmptyData as IComic} />);

      const contentI = screen.getByText("Sin descripción disponible.");
      const contentII = screen.getByText(
        "Sin listado de personajes disponible."
      );
      const contentIII = screen.getByText(
        "Sin listado de creadores disponible."
      );

      expect(contentI).not.toBeVisible();
      expect(contentII).not.toBeVisible();
      expect(contentIII).not.toBeVisible();
    });
  });

  describe("when the user clicks on a title", () => {
    it("should render the no content message if ther isn't any", async () => {
      render(<AccordionComic comic={comicMockEmptyData as IComic} />);

      const titleI = screen.getByText("Descripción");
      const titleII = screen.getByText("Descripción");
      const titleIII = screen.getByText("Personajes");

      userEvent.click(titleI);
      userEvent.click(titleII);
      userEvent.click(titleIII);

      expect(
        await screen.findByText("Sin descripción disponible.")
      ).toBeInTheDocument();
      expect(
        await screen.findByText("Sin listado de creadores disponible.")
      ).toBeInTheDocument();
      expect(
        await screen.findByText("Sin listado de personajes disponible.")
      ).toBeInTheDocument();
    });

    it("should render the list of items if it has content", async () => {
      render(<AccordionComic comic={comicMock as IComic} />);

      const titleI = screen.getByText("Descripción");
      const titleII = screen.getByText("Descripción");
      const titleIII = screen.getByText("Personajes");

      userEvent.click(titleI);
      userEvent.click(titleII);
      userEvent.click(titleIII);

      expect(await screen.findByText("descripción...")).toBeInTheDocument();
      expect(await screen.findByText(/Jim Nausedas/i)).toBeInTheDocument();
      expect(
        await screen.findByText("Spider-Man (Peter Parker)")
      ).toBeInTheDocument();
    });
  });
});
