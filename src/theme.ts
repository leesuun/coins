// my-theme.ts
import { DefaultTheme } from "styled-components";

const LightMode: DefaultTheme = {
  bgColor: "whitesmoke",
  textColor: "black",
  accentColor: "#9c88ff",
};

const DarkMode: DefaultTheme = {
  bgColor: "#2f3640",
  textColor: "#C7CAF7",
  accentColor: "#9c88ff",
};

export { LightMode, DarkMode };
