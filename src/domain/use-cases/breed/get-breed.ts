import { BreedEntity } from '../../entities/breed.entity';
import { BreedRepository } from '../../repositories/breed.repository';

export interface GetBreedUseCase {
  execute(id: number): Promise<BreedEntity>;
}

export class GetBreed implements GetBreedUseCase {
  constructor(private readonly repository: BreedRepository) {}

  public async execute(id: number): Promise<BreedEntity> {
    return this.repository.findOne(id);
  }
}
