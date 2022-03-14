import React from "react";
import "@testing-library/jest-dom";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { fireEvent, render, screen } from "@testing-library/react";
import { AllTheProviders } from "./utils";
describe("Login Form", () => {
  const invalidPassMessage = "Lykilorðs er krafist, hámark 256 stafir";
  const invalidUserMessage = "Notendanafns er krafist, hámark 64 stafir";
  test("displays username field, password field, button, and labels", () => {
    render(<LoginForm />);
    const userField = screen.getByLabelText("Notendanafn");
    const passwordField = screen.getByLabelText("Lykilorð");
    const button = screen.getByRole("button");
    expect(userField).toBeDefined();
    expect(passwordField).toBeDefined();
    expect(userField).toHaveTextContent("");
    expect(passwordField).toHaveTextContent("");
    expect(button).toBeDefined();
    expect(button).toHaveTextContent("Innskrá");
  });
  test("displays error if username empty on submit", () => {
    render(<LoginForm />);
    const userField = screen.getByLabelText("Notendanafn");
    const passwordField = screen.getByLabelText("Lykilorð");
    fireEvent.change(passwordField, { target: { value: "pass" } });
    expect(userField).toHaveTextContent("");
    const button = screen.getByRole("button");
    button.click();
    expect(screen.getByText(invalidUserMessage)).toBeDefined();
  });
  test("displays error if password empty on submit", () => {
    render(<LoginForm />);
    const userField = screen.getByLabelText("Notendanafn");
    const passwordField = screen.getByLabelText("Lykilorð");
    fireEvent.change(userField, { target: { value: "user" } });
    expect(passwordField).toHaveTextContent("");
    const button = screen.getByRole("button");
    button.click();
    expect(screen.getByText(invalidPassMessage)).toBeDefined();
  });
  test("displays error if password too long on submit", () => {
    render(<LoginForm />);
    const userField = screen.getByLabelText("Notendanafn");
    const passwordField = screen.getByLabelText("Lykilorð");
    const pass = "x".repeat(257);
    fireEvent.change(passwordField, { target: { value: pass } });
    expect(userField).toHaveTextContent("");
    const button = screen.getByRole("button");
    button.click();
    expect(screen.getByText(invalidPassMessage)).toBeDefined();
  });
  test("displays error if username too long on submit", () => {
    render(<LoginForm />);
    const userField = screen.getByLabelText("Notendanafn");
    const username = "x".repeat(65);
    const passwordField = screen.getByLabelText("Lykilorð");
    fireEvent.change(userField, { target: { value: username } });
    expect(passwordField).toHaveTextContent("");
    const button = screen.getByRole("button");
    button.click();
    expect(screen.getByText(invalidUserMessage)).toBeDefined();
  });
  test("no error if password 256 chars long on submit", () => {
    render(<LoginForm />);
    const userField = screen.getByLabelText("Notendanafn");
    const passwordField = screen.getByLabelText("Lykilorð");
    const pass = "x".repeat(256);
    fireEvent.change(passwordField, { target: { value: pass } });
    expect(userField).toHaveTextContent("");
    const button = screen.getByRole("button");
    button.click();
    expect(screen.queryByText(invalidPassMessage)).not.toBeInTheDocument();
  });
  test("no error if username 64 chars long on submit", () => {
    render(<LoginForm />);
    const userField = screen.getByLabelText("Notendanafn");
    const username = "x".repeat(64);
    const passwordField = screen.getByLabelText("Lykilorð");
    fireEvent.change(userField, { target: { value: username } });
    expect(passwordField).toHaveTextContent("");
    const button = screen.getByRole("button");
    button.click();
    expect(screen.queryByText(invalidUserMessage)).not.toBeInTheDocument();
  });
  test("no error if password 1 char long on submit", () => {
    render(<LoginForm />);
    const userField = screen.getByLabelText("Notendanafn");
    const passwordField = screen.getByLabelText("Lykilorð");
    const pass = "x";
    fireEvent.change(passwordField, { target: { value: pass } });
    expect(userField).toHaveTextContent("");
    const button = screen.getByRole("button");
    button.click();
    expect(screen.queryByText(invalidPassMessage)).not.toBeInTheDocument();
  });
  test("no error if username 1 char long on submit", () => {
    render(<LoginForm />);
    const userField = screen.getByLabelText("Notendanafn");
    const username = "x";
    const passwordField = screen.getByLabelText("Lykilorð");
    fireEvent.change(userField, { target: { value: username } });
    expect(passwordField).toHaveTextContent("");
    const button = screen.getByRole("button");
    button.click();
    expect(screen.queryByText(invalidUserMessage)).not.toBeInTheDocument();
  });
});
