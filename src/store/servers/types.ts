export interface ServerItem {
  name: string;
  distance: number;
}

export interface ServersState {
  readonly servers: ServerItem[];
  readonly fetchingServers: boolean;
  readonly serversError?: string;
}
