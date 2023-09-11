import { populateStateTable } from './populate-state-table';
import { populateCityTable } from './populate-city-table';

export const populateTables = async () => {
  await Promise.all([populateStateTable(), populateCityTable()]);
};
