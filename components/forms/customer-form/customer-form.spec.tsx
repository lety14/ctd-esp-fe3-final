import { screen } from "@testing-library/react";
import { renderWithReactHookForm } from "dh-marvel/test/form-helper";
import userEvent from "@testing-library/user-event";
import CustomerDataForm from "./customer-data-form.component";

const defaultData = {
  name: "",
  lastname: "",
  email: "",
  address: {
    address1: "",
    address2: null,
    city: "",
    state: "",
    zipCode: "",
  },
};

describe("CustomerForm component", () => {
  describe("when rendering default", () => {
    it("should render all the inputs", () => {
      renderWithReactHookForm(
        <CustomerDataForm
          data={defaultData}
          activeStep={0}
          handleNext={() => {}}
        />
      );

      const textboxName = screen.getByRole("textbox", { name: "Nombre" });
      const textboxLastname = screen.getByRole("textbox", { name: "Apellido" });
      const textboxEmail = screen.getByRole("textbox", { name: "Email" });

      expect(textboxName).toBeInTheDocument();
      expect(textboxLastname).toBeInTheDocument();
      expect(textboxEmail).toBeInTheDocument();
    });
  });

  it("should have the input name focused by default", () => {
    renderWithReactHookForm(
      <CustomerDataForm
        data={defaultData}
        activeStep={0}
        handleNext={() => {}}
      />
    );
    const textboxName = screen.getByRole("textbox", { name: "Nombre" });
    expect(textboxName).toHaveFocus();
  });

  describe("when the user complete an input", () => {
    it("should render the data", async () => {
      renderWithReactHookForm(
        <CustomerDataForm
          data={defaultData}
          activeStep={0}
          handleNext={() => {}}
        />
      );

      const textboxName = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Nombre",
      });
      const textboxLastname = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Apellido",
      });
      const textboxEmail = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Email",
      });

      await userEvent.type(textboxName, "Test");
      await userEvent.type(textboxLastname, "User");
      await userEvent.type(textboxEmail, "Test@test.test");

      expect(textboxName.value).toBe("Test");
      expect(textboxLastname.value).toBe("User");
      expect(textboxEmail.value).toBe("Test@test.test");
    });
  });
});
