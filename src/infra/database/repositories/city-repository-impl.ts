import { prisma } from '../prisma';
import {
  City,
  CityRepository,
} from '../../../application/repositories/city-repository';

export class CityRepositoryImpl implements CityRepository {
  async getAll(): Promise<City[]> {
    try {
      return (await prisma.city.findMany({
        orderBy: {
          city: 'asc',
        },
      })) as City[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAllFromState(stateId: string): Promise<City[]> {
    try {
      return (await prisma.city.findMany({
        where: {
          state_id: stateId,
        },
        orderBy: {
          city: 'asc',
        },
      })) as City[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
