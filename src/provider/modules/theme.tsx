import { TMode, ThemeContextValue } from "@/types/providerType/theme";
import { createContext, useContext, useMemo, useState } from "react";

const themeContext = createContext<ThemeContextValue>({
  currentMode: "Light",
  setMode: () => { },
});

export function ThemeProvider(props: { children: React.ReactNode }) {
  const { children } = props;

  const [currentMode, setCurrentMode] = useState<TMode>('Light');

  const setMode = (mode: TMode) => {
    setCurrentMode(mode);
  };

  const value = useMemo<ThemeContextValue>(
    () => ({
      currentMode,
      setMode,
    }),
    [currentMode, setMode]
  );

  return <themeContext.Provider value={value}>{children}</themeContext.Provider>;
}

export const useLayoutProvider = () => useContext(themeContext);