import { BreedEntity } from '../../entities/breed.entity';
import { BreedRepository } from '../../repositories/breed.repository';

export interface DeleteBreedUseCase {
  execute(id: number): Promise<BreedEntity>;
}

export class DeleteBreed implements DeleteBreedUseCase {
  constructor(private readonly repository: BreedRepository) {}

  public async execute(id: number): Promise<BreedEntity> {
    return this.repository.delete(id);
  }
}
