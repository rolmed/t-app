import Loader from 'react-loader-spinner';
import styled from 'styled-components';

export const LoginWrapper = styled.div`
  padding: 20px;
  border: ${(props) => props.theme.vars.border};
  width: 50%;
  min-width: 380px;
  max-width: 500px;
  margin: auto;
  background: white;
`;

export const LoginText = styled.div`
  padding-bottom: 5px;
`;

export const StyledInput = styled.input<{ error: boolean }>`
  display: block;
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border: none;
  border: ${(props) => props.theme.vars.border};
  :focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
  ${(props) => props.error && `border-color: ${props.theme.colors.error};`}
`;

export const StyledButton = styled.button`
  border: none;
  padding: 10px 15px;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  cursor: pointer;
  line-height: 1;
  :focus {
    outline: none;
  }
  svg {
    margin-right: 5px;
  }
`;

export const StyledLoader = styled(Loader)`
  float: left;
`;
