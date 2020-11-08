import baseStyled, { ThemedStyledInterface } from 'styled-components';
import { Theme } from './types';

// eslint-disable-next-line import/prefer-default-export
export const styled = baseStyled as ThemedStyledInterface<Theme>;
