import { State, StateRepository } from '../../repositories/state-repository';

export class GetAllStatesUseCase {
  constructor(private stateRepository: StateRepository) {}

  async execute(): Promise<State[]> {
    try {
      return await this.stateRepository.getAll();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
