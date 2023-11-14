import { DogEntity } from '../../entities/dog.entity';
import { DogRepository } from '../../repositories/dog.repository';

export interface GetDogsUseCase {
  execute(): Promise<DogEntity[]>;
}

export class GetDogs implements GetDogsUseCase {
  constructor(private readonly repository: DogRepository) {}

  public async execute(): Promise<DogEntity[]> {
    return this.repository.findAll();
  }
}
