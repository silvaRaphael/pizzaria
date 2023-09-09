import { City, CityRepository } from '../../repositories/city-repository';

export class GetAllStateCitiesUseCase {
  constructor(private cityRepository: CityRepository) {}

  async execute(stateId: string): Promise<City[]> {
    try {
      return await this.cityRepository.getAllFromState(stateId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
