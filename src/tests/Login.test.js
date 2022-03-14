import React from "react";
import { Login } from "../components/Login/Login";
import "@testing-library/jest-dom";
import { render, screen, USERNAME } from "./utils";

describe("Login footer", () => {
  test("displays text and button", () => {
    render(<Login />);
    expect(screen.getByRole("button")).toBeDefined();
    expect(screen.getByRole("button")).toHaveTextContent("Útskrá");
    expect(screen.getByText("Innskráður sem:")).toHaveTextContent(
      `Innskráður sem: ${USERNAME}`
    );
  });
  test("logs out user, displaying new link and button", () => {
    render(<Login />);
    const button = screen.getByRole("button");
    button.click();
    expect(screen.getByRole("button")).toBeDefined();
    expect(screen.getByRole("button")).toHaveTextContent("Nýskráning");
    expect(screen.queryByText("Innskráður sem:")).not.toBeInTheDocument();
    expect(screen.getByText("Innskráning")).toBeDefined();
  });
  test("logs in user after logout, displaying correct buttons and text", () => {
    render(<Login />);
    const button = screen.getByRole("button");
    expect(button).toBeDefined();
    expect(button).toHaveTextContent("Útskrá");
    button.click();
    const button2 = screen.getByRole("button");
    expect(button2).toBeDefined();
    expect(button2).toHaveTextContent("Nýskráning");
    expect(screen.queryByText("Innskráður sem:")).not.toBeInTheDocument();
    expect(screen.getByText("Innskráning")).toBeDefined();
    button2.click();
    expect(screen.getByRole("button")).toBeDefined();
    expect(screen.getByRole("button")).toHaveTextContent("Útskrá");
    expect(screen.getByText("Innskráður sem:")).toHaveTextContent(
      `Innskráður sem: ${USERNAME}`
    );
  });
});
