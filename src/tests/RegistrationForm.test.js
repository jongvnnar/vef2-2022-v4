import React from "react";
import { RegistrationForm } from "../components/RegistrationForm/RegistrationForm";
import "@testing-library/jest-dom";
import { render, screen, USERNAME } from "./utils";
import { fireEvent } from "@testing-library/react";
describe("Registration Form", () => {
  let registrations = [];
  const setRegistrations = (arr) => {
    registrations = arr;
  };
  afterEach(() => setRegistrations([]));
  test("displays textarea, button, and label", () => {
    render(
      <RegistrationForm
        registrations={registrations}
        setRegistrations={setRegistrations}
      />
    );
    expect(screen.getByRole("button")).not.toBeDisabled();
    expect(screen.getByRole("button")).toHaveTextContent("Skrá mig");
    expect(screen.getByText("Athugasemd:")).toBeDefined();
    expect(screen.getByLabelText("Athugasemd:")).toBeDefined();
  });
  test("displays only text if already registered", () => {
    setRegistrations([{ name: USERNAME, comment: null }]);
    render(
      <RegistrationForm
        registrations={registrations}
        setRegistrations={setRegistrations}
      />
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByText("Athugasemd:")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Athugasemd:")).not.toBeInTheDocument();
    expect(
      screen.getByText("Þú hefur skráð þig á þennan viðburð")
    ).toBeDefined();
  });
  test("registers user", () => {
    render(
      <RegistrationForm
        registrations={registrations}
        setRegistrations={setRegistrations}
      />
    );
    const button = screen.getByRole("button");
    button.click();
    expect(registrations.length).toBe(1);
    expect(registrations[0].name).toBe(USERNAME);
    expect(registrations[0].comment).toBe("");
  });
  test("registers user with comment", () => {
    render(
      <RegistrationForm
        registrations={registrations}
        setRegistrations={setRegistrations}
      />
    );
    const textarea = screen.getByLabelText("Athugasemd:");
    fireEvent.change(textarea, { target: { value: "comment" } });
    const button = screen.getByRole("button");
    button.click();
    expect(registrations.length).toBe(1);
    expect(registrations[0].name).toBe(USERNAME);
    expect(registrations[0].comment).toBe("comment");
  });
});
