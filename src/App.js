import { Layout } from "./components/Layout/Layout";
import { EventPage } from "./pages/EventPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFound } from "./pages/NotFound";
import { Index } from "./pages/Index";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import React, { createContext, useState, useEffect } from "react";
import { Footer } from "./components/Footer/Footer";
export const AuthContext = createContext({ user: null, setUser: null });
function App() {
  //Ákvað að geyma user líka í localStorage sem frekar shitty "persistance", user viðheldur sig við reload.
  const [user, setUser] = useState(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user);
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Layout title="Viðburðasíðan" footer={<Footer />} />}
          >
            <Route index element={<Index />} />
            <Route path="login" element={<LoginPage />} />
            <Route path=":id" element={<EventPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
