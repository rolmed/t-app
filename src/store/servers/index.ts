import { ActionType } from 'typesafe-actions';
import * as serversStateActionCreators from './actions';
import reducer from './reducer';

export default reducer;
export const actions = serversStateActionCreators;
export * from './types';
export type ServersActions = ActionType<typeof serversStateActionCreators>;
