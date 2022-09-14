import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Faqs, { getServerSideProps } from "dh-marvel/pages/faqs.page";
import { GetServerSidePropsContext } from "next";
import { createMocks } from "node-mocks-http";
import { ParsedUrlQuery } from "querystring";

import { faqsData } from "../constants/faqs/faqsData";

describe("FaqsPage", () => {
  describe("when rendering default page", () => {
    it("should render the title", () => {
      render(<Faqs faqs={faqsData} />);
      const title = screen.getByText("Preguntas Frecuentes");
      expect(title).toBeInTheDocument();
    });
    //
    it("should fetch the data", async () => {
      render(<Faqs faqs={faqsData} />);

      window.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(faqsData[0]),
        })
      ) as jest.Mock;

      const context = {
        params: { id: "1" } as ParsedUrlQuery,
      };

      const res = await getServerSideProps(
        context as GetServerSidePropsContext
      );
      expect(res).toEqual(
        expect.objectContaining({
          props: { faqs: faqsData[0] },
        })
      );
    });
  });
  // });

  //
  it("should render all the questions", () => {
    render(<Faqs faqs={faqsData} />);
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
    render(<Faqs faqs={faqsData} />);
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
