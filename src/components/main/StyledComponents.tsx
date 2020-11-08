import React from 'react';
import styled from 'styled-components';

export const LogOutButton = styled.div`
  color: white;
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 13px;
  cursor: pointer;
`;

export const ServersWrapper = styled.div`
  width: 50%;
  min-width: 380px;
  margin: auto;
`;

export const ServerRow = styled.div`
  color: white;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

export const Column = styled.div`
  font-size: 13px;
  display: inline-block;
  width: 50%;
  padding: 5px 10px;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Arrow = styled(({ direction, ...props }) => <i {...props} />)<{
  direction: 'asc' | 'desc';
}>`
  margin-left: 10px;
  border: solid ${(props) => props.theme.colors.primary};
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(${(props) => (props.direction === 'desc' ? '-135deg' : '45deg')});
  ${(props) => props.direction === 'asc' && 'margin-bottom: 3px'};
`;

export const HeaderColumn = styled(Column)`
  cursor: pointer;
  font-weight: 500;
`;
