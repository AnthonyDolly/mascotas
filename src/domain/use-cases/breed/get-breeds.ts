import { BreedEntity } from '../../entities/breed.entity';
import { BreedRepository } from '../../repositories/breed.repository';

export interface GetBreedsUseCase {
  execute(): Promise<BreedEntity[]>;
}

export class GetBreeds implements GetBreedsUseCase {
  constructor(private readonly repository: BreedRepository) {}

  public async execute(): Promise<BreedEntity[]> {
    return this.repository.findAll();
  }
}
