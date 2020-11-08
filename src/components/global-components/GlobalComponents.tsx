import React from 'react';
import { styled } from '../../styles';

// eslint-disable-next-line import/prefer-default-export
export const Error = styled(({ message, ...props }) => (
  <div {...props}>
    <span {...props}>{message}</span>
  </div>
))<{ message?: string }>`
  color: ${(props) => props.theme.colors.error};
  font-size: 13px;
  display: block;
  margin-bottom: 10px;
`;
