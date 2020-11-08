import React from 'react';
import { mountWithStoreAndTheme } from '../testHelpers';
import AuthenticatedRoute from './AuthenticatedRoute';

jest.mock('react-router-dom', () => ({
  Route: ({ render }: any) => <div>{render()}</div>,
  Redirect: () => <div>test2</div>,
}));

describe('AuthenticatedRoute', () => {
  describe('render', () => {
    it('should render given component if authToken exists', () => {
      const DemoComponent = () => <span>demo compoenent</span>;
      const authToken = 'asd';

      const { component } = mountWithStoreAndTheme(
        <AuthenticatedRoute component={DemoComponent} />,
        {
          login: {
            authToken,
          },
        },
      );

      expect(component.exists(DemoComponent)).toBeTruthy();
    });

    it('should not render given component if user is not logged in', () => {
      const DemoComponent = () => <span>demo compoenent</span>;

      const { component } = mountWithStoreAndTheme(
        <AuthenticatedRoute component={DemoComponent} />,
        {
          login: {
            authToken: undefined,
          },
        },
      );

      expect(component.exists(DemoComponent)).toBeFalsy();
    });
  });
});
