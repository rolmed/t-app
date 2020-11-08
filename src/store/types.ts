import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '.';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ThunkResult = ThunkAction<Promise<void> | void, ApplicationState, undefined, any>;
