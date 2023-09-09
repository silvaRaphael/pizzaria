import { City, CityRepository } from '../../repositories/city-repository';

export class GetAllCitiesUseCase {
  constructor(private cityRepository: CityRepository) {}

  async execute(): Promise<City[]> {
    try {
      return await this.cityRepository.getAll();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
