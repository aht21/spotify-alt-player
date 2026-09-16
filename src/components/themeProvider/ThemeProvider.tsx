import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

const DEFAULT_COLOR = "#1db954";
const DEFAULT_BLUR = 10;

interface ThemeContextType {
  primaryColor: string;
  blurStrength: number;
  setPrimaryColor: (color: string) => void;
  setBlurStrength: (blur: number) => void;
  revertColor: () => void;
  revertBlur: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [primaryColor, setPrimaryColor] = useState(() => {
    return localStorage.getItem("theme-color") || DEFAULT_COLOR;
  });

  const [blurStrength, setBlurStrength] = useState(() => {
    const saved = localStorage.getItem("theme-blur");
    return saved ? Number(saved) : DEFAULT_BLUR;
  });

  useEffect(() => {
    localStorage.setItem("theme-color", primaryColor);
    // Записываем глобальную CSS переменную, доступную везде
    document.documentElement.style.setProperty("--primary-color", primaryColor);
  }, [primaryColor]);

  useEffect(() => {
    localStorage.setItem("theme-blur", blurStrength.toString());
    document.documentElement.style.setProperty("--background-blur", `${blurStrength}px`);
  }, [blurStrength]);

  const revertColor = () => setPrimaryColor(DEFAULT_COLOR);
  const revertBlur = () => setBlurStrength(DEFAULT_BLUR);

  return (
    <ThemeContext.Provider
      value={{
        primaryColor,
        blurStrength,
        setPrimaryColor,
        setBlurStrength,
        revertColor,
        revertBlur,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeProvider;
