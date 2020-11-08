import { ActionType } from 'typesafe-actions';
import * as loginStateActionCreators from './actions';
import reducer from './reducer';

export default reducer;
export const actions = loginStateActionCreators;
export * from './types';
export type LoginActions = ActionType<typeof loginStateActionCreators>;
