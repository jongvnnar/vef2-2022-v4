import React from "react";
import { RegistrationForm } from "../components/RegistrationForm/RegistrationForm";
import "@testing-library/jest-dom";
import { render, screen, USERNAME, fireEvent } from "./utils";
import { string } from "prop-types";
import { Login } from "../components/Login/Login";
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
  test("registers user with comment at 400 chars", () => {
    render(
      <RegistrationForm
        registrations={registrations}
        setRegistrations={setRegistrations}
      />
    );
    const comment = "x".repeat(400);
    const textarea = screen.getByLabelText("Athugasemd:");
    fireEvent.change(textarea, { target: { value: comment } });
    const button = screen.getByRole("button");
    button.click();
    expect(registrations.length).toBe(1);
    expect(registrations[0].name).toBe(USERNAME);
    expect(registrations[0].comment).toBe(comment);
  });
  test("does not register user if comment > 400 chars and displays error", () => {
    render(
      <RegistrationForm
        registrations={registrations}
        setRegistrations={setRegistrations}
      />
    );
    const comment = "x".repeat(401);
    const textarea = screen.getByLabelText("Athugasemd:");
    fireEvent.change(textarea, { target: { value: comment } });
    const button = screen.getByRole("button");
    button.click();
    expect(registrations.length).toBe(0);
    expect(
      screen.getByText("Athugasemd má að hámarki vera 400 stafir")
    ).toBeDefined();
  });
  test("Displays nothing if user logged out", () => {
    render(
      <>
        <RegistrationForm
          registrations={registrations}
          setRegistrations={setRegistrations}
        />
        <Login />
      </>
    );
    const logoutButton = screen.getByText("Útskrá");
    logoutButton.click();
    expect(screen.queryByText("Skrá mig")).not.toBeInTheDocument();
    expect(screen.queryByText("Athugasemd:")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Athugasemd:")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Þú hefur skráð þig á þennan viðburð")
    ).not.toBeInTheDocument();
  });
});
