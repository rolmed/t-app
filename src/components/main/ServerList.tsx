import React from 'react';
import { ServerItem } from '../../store/servers';
import { ServerRow, Column } from './StyledComponents';

const ServerList = ({ servers }: { servers: ServerItem[] }) => {
  return (
    <>
      {servers.map((server) => (
        <ServerRow key={server.distance}>
          <Column>{server.name}</Column>
          <Column>{server.distance}</Column>
        </ServerRow>
      ))}
    </>
  );
};

export default React.memo(ServerList);
