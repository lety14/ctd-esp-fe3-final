import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Faqs from "dh-marvel/pages/faqs/index.page";

describe("FaqsPage", () => {
  describe("when rendering default page", () => {
    it("should render the title", () => {
      render(<Faqs />);
      const title = screen.getByText("Preguntas Frecuentes");
      expect(title).toBeInTheDocument();
    });

    it("should render all the questions", () => {
      render(<Faqs />);
      const questionI = screen.getByText("¿Cuántos comics tienen?");
      const questionII = screen.getByText(
        "¿Se puede reservar nuevos lanzamientos?"
      );
      const questionIII = screen.getByText("¿Cuanto demoran las entregas?");
      const questionIV = screen.getByText(
        "¿Qué métodos de pago están disponibles?"
      );
      const questionV = screen.getByText("¿Se aceptan devoluciones?");

      expect(questionI).toBeInTheDocument();
      expect(questionII).toBeInTheDocument();
      expect(questionIII).toBeInTheDocument();
      expect(questionIV).toBeInTheDocument();
      expect(questionV).toBeInTheDocument();
    });
  });
  describe("when the user clicks on a question", () => {
    it("should display the answer", async () => {
      render(<Faqs />);
      const questionI = screen.getByText("¿Cuántos comics tienen?");
      expect(questionI).toBeEnabled();

      await userEvent.click(questionI);
      expect(
        await screen.findByText(
          "Actualmente disponemos de toda la colección de Marvel. Algunos ejemplares pueden contar con poca o nula disponibilidad por el momento. Para mas información puede acceder a https://marvel.com"
        )
      ).toBeVisible();
    });
  });
});
