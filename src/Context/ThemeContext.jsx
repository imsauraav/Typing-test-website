// import { createContext, useContext, useState } from "react";
// import { themeOptions } from "../Utils/theme";

// const ThemeContext = createContext();

// export const ThemeContextProvider = ({children}) =>{

//     const defaultTheme = JSON.parse(localStorage.getItem('theme')) || themeOptions[2].value ;
//     const [theme, setTheme] = useState(defaultTheme);
//     const values = {
//         theme, 
//         setTheme,
//         defaultTheme
//     }


//     return (<ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>);
// }

// export const useTheme = ()=> useContext(ThemeContext);


import { createContext, useContext, useState, useEffect } from "react";
import { themeOptions } from "../Utils/theme";

// Create ThemeContext
const ThemeContext = createContext();

// ThemeContext Provider
export const ThemeContextProvider = ({ children }) => {
  // Get default theme from localStorage or fallback
  const storedTheme = localStorage.getItem("theme");
  const defaultTheme = storedTheme ? JSON.parse(storedTheme) : themeOptions[2].value;

  const [theme, setTheme] = useState(defaultTheme);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  // Context values
  const contextValues = {
    theme,
    setTheme,
    defaultTheme,
    themeOptions
  };

  return (
    <ThemeContext.Provider value={contextValues}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  return context;
};
