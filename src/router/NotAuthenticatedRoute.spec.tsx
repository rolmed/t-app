import React from 'react';
import { Redirect } from 'react-router-dom';
import { mountWithStoreAndTheme } from '../testHelpers';
import NotAuthenticatedRoute from './NotAuthenticatedRoute';

jest.mock('react-router-dom', () => ({
  Route: ({ render }: any) => <div>{render()}</div>,
  Redirect: () => <div>test2</div>,
}));

describe('NotAuthenticatedRoute', () => {
  it('should redirect to root if user is logged in', () => {
    const DemoComponent = () => <span>demo compoenent</span>;

    const { component } = mountWithStoreAndTheme(
      <NotAuthenticatedRoute component={DemoComponent} />,
      {
        login: {
          authToken: 'asd',
        },
      },
    );

    expect(component.exists(DemoComponent)).toBe(false);
    expect(component.exists(Redirect)).toBe(true);
  });

  it('should render component if user is not logged in', () => {
    const DemoComponent = () => <span>demo compoenent</span>;
    const authToken = undefined;

    const { component } = mountWithStoreAndTheme(
      <NotAuthenticatedRoute component={DemoComponent} />,
      {
        login: {
          authToken,
        },
      },
    );

    expect(component.exists(DemoComponent)).toBe(true);
    expect(component.exists(Redirect)).toBe(false);
  });
});
