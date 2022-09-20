import { render, screen } from "@testing-library/react";
import { renderWithReactHookForm } from "dh-marvel/test/form-helper";
import ControlledTextInput from "./ControlledTextInput.component";
import userEvent from "@testing-library/user-event";

describe("ControlledTextInput component", () => {
  describe("when rendering default", () => {
    it("should render a textbox", () => {
      renderWithReactHookForm(<ControlledTextInput name="name" label="Name" />);

      const textbox = screen.getByRole("textbox", { name: "Name" });
      expect(textbox).toBeInTheDocument();
      expect(textbox).toHaveValue("");
    });
    it("should render the default value", () => {
      renderWithReactHookForm(
        <ControlledTextInput name="name" label="Name" />,
        { defaultValues: { name: "Test" } }
      );

      const textbox = screen.getByRole("textbox", { name: "Name" });
      expect(textbox).toHaveValue("Test");
    });
    it("should render the button show/hide password when the type is password", () => {
      renderWithReactHookForm(
        <ControlledTextInput name="name" label="Name" type="password" />
      );
      const buttonPassword = screen.getByLabelText(
        "toggle password visibility"
      );

      expect(buttonPassword).toBeInTheDocument();
    });
  });

  describe("when the user interacts with a password type input", () => {
    it("should hide/show the password when the user clicks on the button", async () => {
      renderWithReactHookForm(
        <ControlledTextInput name="password" label="Password" type="password" />
      );

      const buttonPassword = screen.getByLabelText(
        "toggle password visibility"
      );
      const input = screen.getByLabelText("Password");
      expect(input).toHaveAttribute("type", "password");

      await userEvent.click(buttonPassword);

      expect(await screen.findByLabelText("Password")).toHaveAttribute(
        "type",
        "text"
      );
    });
  });

  describe("when the user complete an input", () => {
    it("should render the data", async () => {
      renderWithReactHookForm(
        <ControlledTextInput name="name" label="Name" />,
        { defaultValues: { name: "" } }
      );

      const textbox = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Name",
      });

      await userEvent.type(textbox, "Test");
      expect(textbox.value).toBe("Test");
    });

    it("should not render the data if the input only allows numbers", async () => {
      const regexNumber = /^[0-9]*$/gm;

      renderWithReactHookForm(
        <ControlledTextInput
          name="number"
          label="Number"
          regex={regexNumber}
        />,
        { defaultValues: { number: "" } }
      );

      const textbox = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Number",
      });

      await userEvent.type(textbox, "Test");
      expect(textbox.value).toBe("");
    });
  });

  it("should render the data if the input only allows numbers", async () => {
    const regexNumber = /^[0-9]*$/gm;

    renderWithReactHookForm(
      <ControlledTextInput name="number" label="Number" regex={regexNumber} />,
      { defaultValues: { number: "" } }
    );

    const textbox = screen.getByRole<HTMLInputElement>("textbox", {
      name: "Number",
    });

    await userEvent.type(textbox, "123456");
    expect(textbox.value).toBe("123456");
  });
});
