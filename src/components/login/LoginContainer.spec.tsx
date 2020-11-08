import React from 'react';
import { act } from 'react-dom/test-utils';
import LoginContainer from '.';
import { mountWithStoreAndTheme } from '../../testHelpers';
import Login from './Login';
import { StyledInput, StyledLoader } from './StyledComponents';

describe('LoginContainer', () => {
  it('should render Login component', () => {
    const { component } = mountWithStoreAndTheme(<LoginContainer />, { login: {} });

    expect(component.find(Login).exists()).toBeTruthy();
  });
});

describe('Login', () => {
  it('should emit login on enter click', () => {
    const loginFn = jest.fn();
    let { component } = mountWithStoreAndTheme(<Login loggingIn={false} login={loginFn} />);

    act(() => {
      component.find(StyledInput).at(0).props().onKeyPress({ key: 'Enter' });
    });
    component = component.update();

    expect(loginFn).toHaveBeenCalled();
  });

  it('should update credentials', () => {
    let { component } = mountWithStoreAndTheme(<Login loggingIn={false} login={jest.fn()} />, {
      login: {},
    });
    const value = 'new value';

    act(() => {
      component.find(StyledInput).at(0).props().onChange({ target: { value } });
    });
    component = component.update();

    expect(component.find(StyledInput).at(0).props().value).toEqual(value);
  });

  it('should emit login on form submit', () => {
    const loginFn = jest.fn();
    let { component } = mountWithStoreAndTheme(<Login loggingIn={false} login={loginFn} />);

    act(() => {
      component
        .find('form')
        .props()
        .onSubmit?.(({ preventDefault: jest.fn } as unknown) as React.FormEvent);
    });
    component = component.update();

    expect(loginFn).toHaveBeenCalled();
  });

  it('should render StyledLoader when loggingIn is true', () => {
    const { component } = mountWithStoreAndTheme(<Login loggingIn login={jest.fn()} />);

    expect(component.find(StyledLoader).exists()).toBeTruthy();
  });
});
