import { Theme, ThemeColors, ThemeVars } from './types';

const theme = (): Theme => {
  const colors: ThemeColors = {
    primary: '#0dbf8d',
    border: '#dcdde6',
    background: '#000000',
    error: '#ff3400',
  };

  const vars: ThemeVars = {
    border: `1px solid ${colors.border}`,
  };

  return {
    colors,
    vars,
  };
};

export default theme;
