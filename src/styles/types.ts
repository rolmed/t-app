export interface Theme {
  colors: ThemeColors;
  vars: ThemeVars;
}

export interface ThemeColors {
  primary: string;
  border: string;
  background: string;
  error: string;
}

export interface ThemeVars {
  border: string;
}
