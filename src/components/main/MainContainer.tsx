import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchServers as fetchServersAction } from '../../store/servers/actions';
import { logOutUser as logOutUserAction } from '../../store/login/actions';
import { ApplicationState, useActions } from '../../store';
import Main from './Main';
import { LogOutButton } from './StyledComponents';

const MainContainer = () => {
  const serversState = useSelector((state: ApplicationState) => ({
    ...state.servers,
  }));

  const { logOutUser, fetchServers } = useActions({
    fetchServers: fetchServersAction,
    logOutUser: logOutUserAction,
  });

  useEffect(() => {
    fetchServers();
  }, [fetchServers]);

  return (
    <>
      <LogOutButton onClick={logOutUser}>Log out</LogOutButton>
      <Main {...serversState} />
    </>
  );
};

export default MainContainer;
