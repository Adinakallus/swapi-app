import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { PersonDetails } from "./pages/PersonDetail/PersonDetails";

export const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.body.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage toggleTheme={toggleTheme} isDarkMode={isDarkMode} />}
      />
      <Route path="/character/:id" element={<PersonDetails />} />
    </Routes>
  );
};
