export interface City {
  id: string;
  state_id: string;
  city: string;
}

export interface CityRepository {
  getAll(): Promise<City[]>;
  getAllFromState(stateId: string): Promise<City[]>;
}
