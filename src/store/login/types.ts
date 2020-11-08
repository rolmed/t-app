export interface LoginState {
  readonly authToken?: string;
  readonly loggingIn: boolean;
  readonly loginError?: string;
}
