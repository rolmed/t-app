import React from 'react';
import { act } from 'react-dom/test-utils';
import { ServerItem } from '../../store/servers';
import { mountWithStoreAndTheme } from '../../testHelpers';
import Main from './Main';
import ServerList from './ServerList';
import { HeaderColumn } from './StyledComponents';

describe('Main', () => {
  const servers: ServerItem[] = [
    {
      name: 'abc1',
      distance: 10.5,
    },
    {
      name: 'abc',
      distance: 11,
    },
    {
      name: 'bca',
      distance: 10,
    },
  ];

  describe('sort', () => {
    it('should sort servers correctly when name asc', () => {
      let { component } = mountWithStoreAndTheme(
        <Main servers={servers} fetchingServers={false} />,
      );

      act(() => {
        component.find(HeaderColumn).at(0).props().onClick();
      });
      component = component.update();

      expect(component.find(ServerList).props().servers).toEqual([
        servers[1],
        servers[0],
        servers[2],
      ]);
    });

    it('should sort servers correctly when name desc', () => {
      let { component } = mountWithStoreAndTheme(
        <Main servers={servers} fetchingServers={false} />,
      );

      act(() => {
        component.find(HeaderColumn).at(0).props().onClick();
      });
      component = component.update();

      act(() => {
        component.find(HeaderColumn).at(0).props().onClick();
      });
      component = component.update();

      expect(component.find(ServerList).props().servers).toEqual([
        servers[2],
        servers[0],
        servers[1],
      ]);
    });

    it('should sort servers correctly when distance asc', () => {
      let { component } = mountWithStoreAndTheme(
        <Main servers={servers} fetchingServers={false} />,
      );

      act(() => {
        component.find(HeaderColumn).at(0).props().onClick();
      });
      component = component.update();

      expect(component.find(ServerList).props().servers).toEqual([
        servers[1],
        servers[0],
        servers[2],
      ]);
    });

    it('should sort servers correctly when distance desc', () => {
      let { component } = mountWithStoreAndTheme(
        <Main servers={servers} fetchingServers={false} />,
      );

      act(() => {
        component.find(HeaderColumn).at(0).props().onClick();
      });
      component = component.update();

      act(() => {
        component.find(HeaderColumn).at(0).props().onClick();
      });
      component = component.update();

      expect(component.find(ServerList).props().servers).toEqual([
        servers[2],
        servers[0],
        servers[1],
      ]);
    });
  });
});
