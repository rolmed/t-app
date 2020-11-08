import React, { useCallback, useState, useMemo } from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import { Error } from '../global-components/GlobalComponents';
import { ServersWrapper, ServerRow, Arrow, HeaderColumn } from './StyledComponents';
import { ServersState } from '../../store/servers';
import ServerList from './ServerList';

export const LoaderWrapper = styled.div`
  margin-top: 20px;
  text-align: center;
  width: 100%;
`;

interface Sorting {
  key: 'name' | 'distance';
  direction: 'asc' | 'desc';
}

const Main = ({ servers, fetchingServers, serversError }: ServersState) => {
  const [sorting, setSorting] = useState<Sorting>();

  const sortedServers = useMemo(() => {
    const newServers = [...servers];

    if (sorting != null) {
      newServers.sort((a, b) => {
        if (a[sorting.key] < b[sorting.key]) {
          return sorting.direction === 'asc' ? -1 : 1;
        }
        if (a[sorting.key] > b[sorting.key]) {
          return sorting.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return newServers;
  }, [servers, sorting]);

  const handleTableSort = useCallback(
    (column: 'name' | 'distance') => {
      const newDirection = sorting?.direction === 'asc' ? 'desc' : 'asc';
      setSorting({ key: column, direction: newDirection });
    },
    [sorting],
  );

  return (
    <>
      <ServersWrapper>
        <ServerRow>
          <HeaderColumn onClick={() => handleTableSort('name')}>
            Name
            {sorting?.key === 'name' && <Arrow direction={sorting.direction} />}
          </HeaderColumn>
          <HeaderColumn onClick={() => handleTableSort('distance')}>
            Distance
            {sorting?.key === 'distance' && <Arrow direction={sorting.direction} />}
          </HeaderColumn>
        </ServerRow>
        <ServerList servers={sortedServers} />
        {fetchingServers && (
          <LoaderWrapper>
            <Loader type='Oval' width={40} height={40} />
          </LoaderWrapper>
        )}
        <Error message={serversError} />
      </ServersWrapper>
    </>
  );
};

export default React.memo(Main);
