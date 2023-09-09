import { prisma } from '../prisma';
import {
  State,
  StateRepository,
} from '../../../application/repositories/state-repository';

export class StateRepositoryImpl implements StateRepository {
  async getAll(): Promise<State[]> {
    try {
      return (await prisma.state.findMany({
        orderBy: {
          state: 'asc',
        },
      })) as State[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
