import { render, screen } from "@testing-library/react";
import AccordionCollapsible from "./accordion-collapsible.component";
import userEvent from "@testing-library/user-event";

const mockedData = {
  title: "Accordion title",
  children: <div>Children data</div>,
};

describe("AccordionCollapsible component", () => {
  describe("when rendering default component", () => {
    it("should render the accordion title", () => {
      render(
        <AccordionCollapsible title={mockedData.title}>
          {mockedData.children}
        </AccordionCollapsible>
      );

      const title = screen.getByText("Accordion title");
      expect(title).toBeInTheDocument();
    });

    it("should not show the accordion content by default", () => {
      render(
        <AccordionCollapsible title={mockedData.title}>
          {mockedData.children}
        </AccordionCollapsible>
      );

      const content = screen.getByText("Children data");
      expect(content).not.toBeVisible();
    });
  });

  describe("when the user clicks on the component title", () => {
    it("should show the accordion content", async () => {
      render(
        <AccordionCollapsible title={mockedData.title}>
          {mockedData.children}
        </AccordionCollapsible>
      );
      const title = screen.getByText("Accordion title");
      await userEvent.click(title);

      const content = await screen.findByText("Children data");
      expect(content).toBeVisible();
    });
  });
});
