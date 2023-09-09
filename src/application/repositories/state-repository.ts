export interface State {
  id: string;
  state: string;
  abbr: string;
}

export interface StateRepository {
  getAll(): Promise<State[]>;
}
