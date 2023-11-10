export type TMode = "Light" | "Dark";


export type ThemeContextValue = {
  // 当前的主题
  currentMode: TMode;
  // 设置主题
  setMode: (mode: TMode) => void;
};