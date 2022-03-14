import React, { useState } from "react";
import { render } from "@testing-library/react";
import { AuthContext } from "../App";
import { BrowserRouter } from "react-router-dom";
export const USERNAME = "test";
const AllTheProviders = ({ children }) => {
  const [user, setUser] = useState(USERNAME);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>{children}</BrowserRouter>
    </AuthContext.Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
